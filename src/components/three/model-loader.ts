import { Material, Mesh, SkinnedMesh, Texture, LoadingManager } from "three";
import { GLTFLoader, type GLTF } from "three/addons/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";
import budgets from "@/lib/model-budgets.json";
import type { AssetKind, ModelPath } from "@/lib/model-preview";

// GLB textures use blob URLs internally. Exported models must not reference external resources.
export async function loadModel(
  path: ModelPath,
  kind: AssetKind,
  signal: AbortSignal,
) {
  const response = await fetch(path, { signal, redirect: "error" });
  if (!response.ok || !response.body) throw new Error("Missing model");

  const budget = budgets[kind];
  const reader = response.body.getReader();
  const chunks: Uint8Array<ArrayBuffer>[] = [];
  let bytes = 0;
  try {
    for (
      let next = await reader.read();
      !next.done;
      next = await reader.read()
    ) {
      bytes += next.value.byteLength;
      if (bytes > budget) throw new Error("Model exceeds its transfer budget");
      chunks.push(next.value);
    }
  } finally {
    await reader.cancel();
    reader.releaseLock();
  }

  const buffer = new Uint8Array(bytes);
  let offset = 0;
  for (const chunk of chunks) {
    buffer.set(chunk, offset);
    offset += chunk.byteLength;
  }

  const header = new DataView(buffer.buffer);
  if (
    bytes < 20 ||
    header.getUint32(0, true) !== 0x46546c67 ||
    header.getUint32(4, true) !== 2 ||
    header.getUint32(8, true) !== bytes
  ) {
    throw new Error("Expected a glTF 2.0 binary model");
  }

  const manager = new LoadingManager();
  manager.setURLModifier((url) => {
    if (!url.startsWith("blob:"))
      throw new Error("Expected embedded resources");
    return url;
  });

  const loader = new GLTFLoader(manager).setMeshoptDecoder(MeshoptDecoder);
  signal.throwIfAborted();
  return loader.parseAsync(buffer.buffer, "");
}

export function releaseModel(model: GLTF) {
  const meshes = new Set<Mesh>();
  const materials = new Set<Material>();
  const textures = new Set<Texture>();
  for (const scene of model.scenes) {
    scene.traverse((node) => {
      if (!(node instanceof Mesh)) return;
      meshes.add(node);
      for (const material of Array.isArray(node.material)
        ? node.material
        : [node.material])
        materials.add(material);
    });
  }
  for (const mesh of meshes) {
    mesh.geometry.dispose();
    if (mesh instanceof SkinnedMesh) mesh.skeleton.dispose();
  }
  for (const material of materials) {
    for (const value of Object.values(material)) {
      if (value instanceof Texture) textures.add(value);
    }
    material.dispose();
  }
  const bitmaps = new Set<ImageBitmap>();
  for (const texture of textures) {
    const image: unknown = texture.source.data;
    if (image instanceof ImageBitmap) bitmaps.add(image);
    texture.dispose();
  }
  for (const bitmap of bitmaps) bitmap.close();
}
