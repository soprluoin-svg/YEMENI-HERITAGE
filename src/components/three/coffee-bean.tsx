import { useFrame } from "@react-three/fiber";
import { useRef, type RefObject } from "react";
import type { Group, Object3D } from "three";
import type { BeanControls, BeanPreview } from "@/lib/model-preview";

export function CoffeeBean({
  bean,
  model,
  controls,
  compact,
  reducedMotion,
  progress,
}: {
  bean: BeanPreview;
  model: Object3D;
  controls: BeanControls;
  compact: boolean;
  reducedMotion: boolean;
  progress: RefObject<number>;
}) {
  const group = useRef<Group>(null);
  const offset = useRef(0);
  const { transform, motionEnabled } = bean;
  const position = compact
    ? transform.responsivePlacement.compact
    : transform.responsivePlacement.wide;

  useFrame(() => {
    if (!group.current) return;
    const { amplitude, period, phase } = transform.float;
    if (reducedMotion) {
      offset.current = 0;
    } else if (motionEnabled && controls.floating) {
      offset.current =
        amplitude *
        Math.sin(((progress.current * 6 + phase) / period) * 2 * Math.PI);
    }
    group.current.position.y = position[1] + offset.current;
  });

  return (
    <group
      ref={group}
      name={transform.id}
      position={[...position]}
      rotation={[
        transform.rotation[0],
        transform.rotation[1] + controls.rotation,
        transform.rotation[2],
      ]}
      scale={transform.scale}
    >
      <primitive object={model} />
    </group>
  );
}
