import "server-only";

export const coffeeReviewFiles = {
  "dragon-blood-tree.glb": "model/gltf-binary",
  "dar-al-hajar.glb": "model/gltf-binary",
  "dragon-blood-tree.webp": "image/webp",
  "dar-al-hajar.webp": "image/webp",
} as const;

export const coffeeReviewEnabled = () =>
  process.env.YEMENI_REVIEW_ASSETS === "1";

export const coffeeReview = {
  "bean-a": {
    model: "/models/review/dragon-blood-tree.glb",
    poster: "/models/review/dragon-blood-tree.webp",
  },
  "bean-b": {
    model: "/models/review/dar-al-hajar.glb",
    poster: "/models/review/dar-al-hajar.webp",
  },
} as const;
