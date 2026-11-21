import type {
  CameraTimeline,
  CoffeeObject,
  LightRig,
  Vector3,
} from "./scene-assets";

export type ModelPath = `/models/${string}.glb`;
export type AssetKind = "ibex" | "architecture" | "coffee";
type LandmarkId = "ibex" | "bab-al-yemen" | "dar-al-hajar";

export type BeanControls = { floating: boolean; rotation: number };
export type BeanControlPair = readonly [BeanControls, BeanControls];

export type BeanPreview = {
  path: ModelPath;
  transform: CoffeeObject;
  motionEnabled: boolean;
};

export type PreviewScene = {
  camera: CameraTimeline;
  lights: LightRig;
} & (
  | { kind: "ibex" | "architecture"; path: ModelPath }
  | { kind: "coffee"; beans: readonly [BeanPreview, BeanPreview] }
);

type ApprovedAssets = {
  [Id in LandmarkId]?: ModelPath;
} & { coffee?: { "bean-a": ModelPath; "bean-b": ModelPath } };

// Only list paths that passed reference, rights, export and device review.
export const approvedAssets: ApprovedAssets = {};

const landmarkCamera = {
  wide: [
    {
      label: "Profile",
      progress: 0,
      position: [0, 1.2, 5.4],
      target: [0, 0.95, 0],
    },
    {
      label: "Detail",
      progress: 0.55,
      position: [0.85, 1.32, 4.8],
      target: [0, 1.05, 0],
    },
    {
      label: "Settle",
      progress: 1,
      position: [0.25, 1.2, 5.4],
      target: [0, 0.95, 0],
    },
  ],
  compact: [
    {
      label: "Profile",
      progress: 0,
      position: [0, 1.15, 6.2],
      target: [0, 0.95, 0],
    },
    {
      label: "Detail",
      progress: 1,
      position: [0.55, 1.24, 5.8],
      target: [0, 1, 0],
    },
  ],
  reducedMotionFrame: {
    label: "Still",
    progress: 0,
    position: [0, 1.2, 6.2],
    target: [0, 0.95, 0],
  },
} satisfies CameraTimeline;

export const previewCameras: Record<LandmarkId | "coffee", CameraTimeline> = {
  ibex: landmarkCamera,
  "bab-al-yemen": landmarkCamera,
  "dar-al-hajar": landmarkCamera,
  coffee: {
    wide: [
      {
        label: "Pair",
        progress: 0,
        position: [0, 0.25, 4.6],
        target: [0, 0.1, 0],
      },
      {
        label: "Settle",
        progress: 1,
        position: [0.5, 0.4, 4.7],
        target: [0, 0.1, 0],
      },
    ],
    compact: [
      {
        label: "Pair",
        progress: 0,
        position: [0, 0.2, 5.2],
        target: [0, 0.1, 0],
      },
      {
        label: "Settle",
        progress: 1,
        position: [0.35, 0.33, 5.25],
        target: [0, 0.1, 0],
      },
    ],
    reducedMotionFrame: {
      label: "Still",
      progress: 0,
      position: [0, 0.25, 5.2],
      target: [0, 0.1, 0],
    },
  },
};

export const coffeeLights: LightRig = {
  ambient: 0.7,
  key: { color: "#E8DED0", position: [-3, 4, 5], intensity: 3 },
  fill: { color: "#DFAD85", position: [3, 1, 4], intensity: 1.15 },
};

function mixVector(a: Vector3, b: Vector3, amount: number): Vector3 {
  return [
    a[0] + (b[0] - a[0]) * amount,
    a[1] + (b[1] - a[1]) * amount,
    a[2] + (b[2] - a[2]) * amount,
  ];
}

export function sampleCamera(
  timeline: CameraTimeline,
  compact: boolean,
  progress: number,
  reduced: boolean,
) {
  if (reduced) return timeline.reducedMotionFrame;

  const track = compact ? timeline.compact : timeline.wide;
  const first = track[0] ?? timeline.reducedMotionFrame;
  const last = track.at(-1) ?? first;
  if (progress <= first.progress) return first;
  if (progress >= last.progress) return last;

  const nextIndex = track.findIndex((stop) => stop.progress >= progress);
  const previous = track[nextIndex - 1] ?? first;
  const next = track[nextIndex] ?? last;
  const fraction =
    (progress - previous.progress) / (next.progress - previous.progress);
  const eased = fraction * fraction * (3 - 2 * fraction);

  return {
    position: mixVector(previous.position, next.position, eased),
    target: mixVector(previous.target, next.target, eased),
  };
}
