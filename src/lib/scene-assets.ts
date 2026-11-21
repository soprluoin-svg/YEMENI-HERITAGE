export type Vector3 = readonly [x: number, y: number, z: number];

export type LightRig = {
  ambient: number;
  key: { color: string; position: Vector3; intensity: number };
  fill: { color: string; position: Vector3; intensity: number };
};

type LandmarkSlot = {
  lights: LightRig;
};

export const landmarkSlots = {
  ibex: {
    lights: {
      ambient: 0.35,
      key: { color: "#E8DED0", position: [3, 4, 2], intensity: 2.4 },
      fill: { color: "#B87345", position: [-3, 1, -2], intensity: 0.8 },
    },
  },
  "bab-al-yemen": {
    lights: {
      ambient: 0.5,
      key: { color: "#E8DED0", position: [4, 6, 3], intensity: 2 },
      fill: { color: "#C6B49E", position: [-4, 2, 1], intensity: 0.6 },
    },
  },
  "dar-al-hajar": {
    lights: {
      ambient: 0.55,
      key: { color: "#E8DED0", position: [-4, 6, 3], intensity: 2.2 },
      fill: { color: "#858D78", position: [4, 2, -2], intensity: 0.7 },
    },
  },
} satisfies Record<string, LandmarkSlot>;

export type CoffeeObject = {
  id: "bean-a" | "bean-b";
  position: Vector3;
  rotation: Vector3;
  float: { amplitude: number; period: number; phase: number };
  material: { baseColor: string; roughness: number };
  scale: number;
  responsivePlacement: { compact: Vector3; wide: Vector3 };
};

export const coffeeObjects: readonly [CoffeeObject, CoffeeObject] = [
  {
    id: "bean-a",
    position: [-0.7, 0.3, 0.4],
    rotation: [0.2, 0.35, -0.4],
    float: { amplitude: 0.1, period: 4.8, phase: 0 },
    material: { baseColor: "#513B30", roughness: 0.56 },
    scale: 1,
    responsivePlacement: { compact: [-0.5, 0.25, 0.4], wide: [-0.7, 0.3, 0.4] },
  },
  {
    id: "bean-b",
    position: [0.65, -0.15, -0.3],
    rotation: [-0.15, -0.3, 0.6],
    float: { amplitude: 0.15, period: 5.6, phase: 1.8 },
    material: { baseColor: "#3B241B", roughness: 0.64 },
    scale: 0.72,
    responsivePlacement: {
      compact: [0.48, -0.2, -0.3],
      wide: [0.65, -0.15, -0.3],
    },
  },
];

export type CameraStop = {
  label: string;
  progress: number;
  position: Vector3;
  target: Vector3;
};

export type CameraTimeline = {
  wide: readonly [CameraStop, ...CameraStop[]];
  compact: readonly [CameraStop, ...CameraStop[]];
  reducedMotionFrame: CameraStop;
};
