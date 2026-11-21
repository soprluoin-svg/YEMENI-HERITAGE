import { readFile, stat } from "node:fs/promises";

const budgets = JSON.parse(
  await readFile(
    new URL("../src/lib/model-budgets.json", import.meta.url),
    "utf8",
  ),
);
const [kind, file] = process.argv.slice(2);

async function check() {
  if (!Object.hasOwn(budgets, kind) || !file?.endsWith(".glb")) {
    throw new Error(
      "Usage: node scripts/check-model.mjs <ibex|architecture|coffee> <file.glb>",
    );
  }

  const { size } = await stat(file);
  if (size > budgets[kind])
    throw new Error(`Encoded file exceeds ${budgets[kind]} bytes`);

  const bytes = await readFile(file);
  if (
    bytes.length < 20 ||
    bytes.readUInt32LE(0) !== 0x46546c67 ||
    bytes.readUInt32LE(4) !== 2 ||
    bytes.readUInt32LE(8) !== bytes.length
  ) {
    throw new Error("Expected a glTF 2.0 binary model");
  }

  const endOfJson = 20 + bytes.readUInt32LE(12);
  if (bytes.readUInt32LE(16) !== 0x4e4f534a || endOfJson > bytes.length) {
    throw new Error("Missing or truncated GLB metadata");
  }

  const document = JSON.parse(bytes.toString("utf8", 20, endOfJson));
  const resources = [...(document.buffers ?? []), ...(document.images ?? [])];
  if (resources.some((resource) => Object.hasOwn(resource, "uri"))) {
    throw new Error("Buffers and images must be embedded in the GLB");
  }

  if (
    document.extensionsRequired?.some((name) =>
      ["KHR_draco_mesh_compression", "KHR_texture_basisu"].includes(name),
    )
  ) {
    throw new Error(
      "Required Draco and KTX2 decoders are not part of the preview runtime",
    );
  }

  const triangleBudget = { ibex: 60000, architecture: 100000, coffee: 15000 }[
    kind
  ];
  const primitives = (document.meshes ?? []).flatMap((mesh) => mesh.primitives);
  const triangles = primitives.reduce((sum, primitive) => {
    if (primitive.mode !== undefined && primitive.mode !== 4) {
      throw new Error("Export triangle primitives");
    }
    const accessor =
      document.accessors?.[primitive.indices ?? primitive.attributes.POSITION];
    if (
      !Number.isSafeInteger(accessor?.count) ||
      accessor.count < 3 ||
      accessor.count % 3 !== 0
    ) {
      throw new Error("Invalid triangle accessor");
    }
    return sum + accessor.count / 3;
  }, 0);
  if (triangles === 0 || triangles > triangleBudget) {
    throw new Error(`Expected 1 to ${triangleBudget} mesh triangles`);
  }

  console.log(
    `${kind}: ${bytes.length} of ${budgets[kind]} encoded bytes, ${triangles} of ${triangleBudget} mesh triangles. Artifact and rights review still required.`,
  );
}

try {
  await check();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
