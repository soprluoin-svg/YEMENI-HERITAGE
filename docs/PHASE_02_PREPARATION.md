# Phase 02 preparation

The owner authorized preparation and named the Yemeni Ibex as the first 3D asset. The supplied copper image is the visual reference. Original source files, modeling views and publication rights remain to be confirmed. Phase 01's master plan and route layout remain the baseline.

## Phase 01 visual review

Reviewed the production site in Chromium at 1440 and 390 CSS pixels in both directions and at 320 pixels in English. The opening hierarchy and dark-to-sandstone-to-olive sequence hold up. The layouts fit these widths without horizontal scrolling. On a 320 × 700 viewport the scroll cue sits below the first fold and the ibex fills less of the composition than on desktop. The same 2D ibex in the first two scenes reduces the reveal's impact. The generic Bab Al-Yemen and Dar Al-Hajar frames look nearly identical. A verified exhibit-specific poster or approved 3D scene can address the latter two findings. Keep the present fallback until that artwork is available.

## Reference intake and rights

| Asset          | Available direction                                                                                                        | Required before final modeling                                                                                                                                                                                                    |
| -------------- | -------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Yemeni Ibex    | Profile of aged copper study, ridged curling horn, elevated head, elongated muzzle, beard, compact body and raised foreleg | Original highest-resolution file and creator or source. Matching front, rear and opposite-side views or owner-approved turntable. Confirm whether the plinth is in scope, overall scale and which unseen details can be inferred. |
| Coffee A and B | Concept shows a dragon's blood tree relief and a rock-palace relief                                                        | Original concept and owner approval of each independent profile, seam and relief. Verify the rock-palace motif if it depicts Dar Al-Hajar.                                                                                        |
| Bab Al-Yemen   | Stylized studio diorama                                                                                                    | Dated frontal and oblique documentary photos. Verify gateway opening, towers, windows, ornament and proportions against measurements or surveyed plans where available.                                                           |
| Dar Al-Hajar   | Atmospheric architectural concept                                                                                          | Dated photos of multiple elevations, palace-to-rock transition and scale. Verify tiers, windows, gypsum decoration and masonry with documentary sources.                                                                          |

For every photo, concept, scan, mesh, material, HDRI or texture, record creator, source URL or original file identifier, rights holder, license version, commercial web use, alteration and redistribution conditions, attribution text and proof of permission. Commissioned geometry needs an explicit right to publish and distribute the optimized GLB to browser clients. Resolve source uncertainty with the owner before distribution. Public availability alone does not grant that right.

## Production asset pipeline

1. Archive original reference files and rights evidence in the approved asset store. Maintain a side-by-side reference sheet and a dated review identifying verified versus inferred elements.
2. Model the ibex first. Review grayscale silhouettes from front, rear and both profiles, then copper material and neutral/warm lighting. Preserve reference features and record owner sign-off before export.
3. For each building, establish real-world proportions before reconstruction. Review elevations and ornaments against verifiable photos. Record gaps instead of inventing construction or decoration.
4. Bake detail where practical. Export Y-up, meters, centered around an agreed pivot. Use glTF PBR materials and a single self-contained GLB, including embedded textures. Export the two beans as separate GLBs with individual pivots. Keep source scenes and documentary files outside public delivery.
5. Run `node scripts/check-model.mjs <ibex|architecture|coffee> <file.glb>` and a glTF conformance validator. Inspect silhouettes, materials, fallback imagery and credits, then measure the actual exported assets on devices. Add an approved path to the scene registry only after those checks.

## Runtime and budgets

Keep all Phase 01 transfer and Web Vitals targets. No 3D transfers until a visitor explicitly enables an approved model. Limit concurrent canvases to one, cap DPR at 1.5, and render on demand. Scroll determines bounded camera position and target. Reduced motion uses a static frame and disables each bean's float. Keep the poster accessible and visible during loading, on errors and when the visitor exits.

| Gate                            | Preparation target                                                                                                                           |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Deferred runtime JS             | At most 350 KiB compressed, measured separately from initial route code                                                                      |
| Ibex / architecture / beans GLB | At most 2 MiB for the ibex, 3 MiB per building, 512 KiB per bean                                                                             |
| Mesh triangles                  | 60k ibex, 100k per building, 15k per bean                                                                                                    |
| Textures                        | At most 2048 pixels on either axis for each texture, and 32 MiB total decoded texture memory per active scene                                |
| Active scene                    | Target at least 30 fps on a representative midrange Android phone while scrolling. Measure GPU memory and context recovery on actual phones. |

Risks include slow parse and shader warmup, mobile GPU pressure, tight sculptural framing, texture decode peaks and multiple contexts surviving navigation. Limit light/shader complexity and texture dimensions. Profile on real phones before enabling public assets. A passing file-size check verifies only encoded size and packaging. Geometry, texture memory, GPU frame rate and rights need separate review.

## Delivery order

P02-02 reviews the Phase 01 rendering. P02-03 prepares progressive rendering, loading and cinematic camera. P02-04 prepares independent bean components. P02-05 defines the landmark pipeline. P02-01 closes reference and licensing intake. P02-06 produces and validates the verified ibex. Only the first four preparation tasks are independent of the missing production materials.

## Coffee scope added by the owner

P02-07 implements two geometrically displaced coffee review GLBs and preserves the original references for approval. It can be reviewed locally before production-model sign-off. P02-08 through P02-10 track the standalone architecture and Socotra assets. P02-11 tracks physical-device and field validation. The prototype control surface is limited to the existing coffee scene.
