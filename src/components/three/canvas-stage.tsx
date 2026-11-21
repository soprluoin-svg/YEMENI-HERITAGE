"use client";

import { PerspectiveCamera } from "@react-three/drei/core/PerspectiveCamera";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  useEffect,
  useEffectEvent,
  useRef,
  useState,
  useSyncExternalStore,
  type RefObject,
} from "react";
import type { GLTF } from "three/addons/loaders/GLTFLoader.js";
import {
  sampleCamera,
  type BeanControlPair,
  type PreviewScene,
} from "@/lib/model-preview";
import { CoffeeBean } from "./coffee-bean";
import { loadModel, releaseModel } from "./model-loader";

type StatusCallbacks = { onReady: () => void; onFailure: () => void };

const motionQuery = "(prefers-reduced-motion: reduce)";

function subscribeMotion(notify: () => void) {
  const media = window.matchMedia(motionQuery);
  media.addEventListener("change", notify);
  return () => media.removeEventListener("change", notify);
}

function getReducedMotion() {
  return window.matchMedia(motionQuery).matches;
}

function useModels(scene: PreviewScene, onFailure: () => void) {
  const [models, setModels] = useState<GLTF[]>([]);
  const fail = useEffectEvent(onFailure);

  useEffect(() => {
    const controller = new AbortController();
    let loaded: GLTF[] = [];
    let disposed = false;
    const paths =
      scene.kind === "coffee"
        ? scene.beans.map((bean) => bean.path)
        : [scene.path];

    void Promise.allSettled(
      paths.map((path) =>
        loadModel(path, scene.kind, controller.signal).catch(
          (error: unknown) => {
            controller.abort();
            throw error;
          },
        ),
      ),
    ).then((results) => {
      loaded = results.flatMap((result) =>
        result.status === "fulfilled" ? [result.value] : [],
      );
      if (disposed || loaded.length !== paths.length) {
        loaded.forEach(releaseModel);
        loaded = [];
        if (!disposed) fail();
        return;
      }

      setModels(loaded);
    });

    return () => {
      disposed = true;
      controller.abort();
      loaded.forEach(releaseModel);
      loaded = [];
    };
  }, [scene]);

  return models;
}

function SceneContent({
  scene,
  stage,
  controls,
  onReady,
  onFailure,
}: {
  scene: PreviewScene;
  stage: RefObject<HTMLDivElement | null>;
  controls: BeanControlPair;
} & StatusCallbacks) {
  const invalidate = useThree((state) => state.invalidate);
  const width = useThree((state) => state.size.width);
  const canvas = useThree((state) => state.gl.domElement);
  const reducedMotion = useSyncExternalStore(
    subscribeMotion,
    getReducedMotion,
    () => true,
  );
  const compact = width < 560;
  const progress = useRef(0);
  const signaled = useRef(false);
  const models = useModels(scene, onFailure);
  const fail = useEffectEvent(onFailure);

  useEffect(() => {
    const onLost = () => fail();
    canvas.addEventListener("webglcontextlost", onLost);
    return () => canvas.removeEventListener("webglcontextlost", onLost);
  }, [canvas]);

  useEffect(() => {
    const anchor = stage.current;
    if (reducedMotion || !anchor) {
      invalidate();
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    function update(trigger: ScrollTrigger) {
      progress.current = trigger.progress;
      invalidate();
    }

    const track = ScrollTrigger.create({
      trigger: anchor,
      start: "top bottom",
      end: "bottom top",
      onUpdate: update,
      onRefresh: update,
    });
    update(track);
    return () => track.kill();
  }, [stage, reducedMotion, invalidate]);

  useFrame(({ camera }) => {
    const frame = sampleCamera(
      scene.camera,
      compact,
      progress.current,
      reducedMotion,
    );
    camera.position.set(...frame.position);
    camera.lookAt(...frame.target);

    if (models.length && !signaled.current) {
      signaled.current = true;
      queueMicrotask(onReady);
    }
  });

  const { ambient, key, fill } = scene.lights;
  return (
    <>
      <PerspectiveCamera makeDefault fov={36} near={0.1} far={50} />
      <ambientLight intensity={ambient} />
      <directionalLight
        position={[...key.position]}
        intensity={key.intensity}
        color={key.color}
      />
      <directionalLight
        position={[...fill.position]}
        intensity={fill.intensity}
        color={fill.color}
      />
      {scene.kind === "coffee"
        ? scene.beans.map((bean, index) => {
            const model = models[index];
            return (
              model && (
                <CoffeeBean
                  key={bean.transform.id}
                  bean={bean}
                  controls={controls[index === 0 ? 0 : 1]}
                  model={model.scene}
                  progress={progress}
                  compact={compact}
                  reducedMotion={reducedMotion}
                />
              )
            );
          })
        : models[0] && <primitive object={models[0].scene} />}
    </>
  );
}

export default function CanvasStage({
  scene,
  controls,
  onReady,
  onFailure,
}: { scene: PreviewScene; controls: BeanControlPair } & StatusCallbacks) {
  const stage = useRef<HTMLDivElement>(null);
  return (
    <div ref={stage} className="model-canvas-host">
      <Canvas
        frameloop="demand"
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
      >
        <SceneContent
          scene={scene}
          stage={stage}
          controls={controls}
          onReady={onReady}
          onFailure={onFailure}
        />
      </Canvas>
    </div>
  );
}
