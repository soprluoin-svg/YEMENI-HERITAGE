# Progress

Phase 01 started from the existing main history. Governance and the task backlog were established before implementation. Use TASKS.md for acceptance and verification status.

## Phase 01 implementation and validation

- Delivered five pre-rendered scenes in English and Arabic with correct document direction. The opening shows an optimized highlands illustration and a labeled 2D ibex reference. The architecture galleries have labeled model slots. Two separate CSS coffee objects use independent placement, scale, z-depth and rotation.
- Verified Node.js 24 with `npm ci`, zero-warning ESLint, strict TypeScript, Prettier, production build and production startup. Production dependencies reported zero npm audit advisories at the time of testing.
- Checked production Chromium at 1440, 1024, 768, 412, 390 and 320 CSS pixels in English, and 1440, 390 and 320 in Arabic. Checked section navigation and sticky offsets, mobile keyboard disclosure and Escape, skip-link focus, document direction, viewport overflow, image loading, exactly two coffee objects, zero canvases and the browser error log. Fixed the compact header at 320 pixels and reran the matrix.
- Ran axe WCAG 2.0/2.1 A and AA rules in Chromium at 1440 and 390 CSS pixels for each locale. The automated checks reported no violations. Inspected both localized renderings at desktop and mobile sizes.
- Confirmed the GSAP chunk was absent on the initial desktop load, arrived after scrolling and initialized reveals. Coffee motion respected a live reduced-motion preference change. Checked the locale switch and a 404 for an unsupported locale.
- Cold local production transfer at 1440 CSS pixels was 143 KiB of initial JavaScript plus 146 KiB across both opening images, within the Phase 01 budgets. Field Web Vitals and physical devices remain unmeasured.
- Pushed the dedicated review branch to GitHub. Pull request creation is blocked in this environment because the GitHub GraphQL request returned Forbidden. The GitHub review link is in HANDOFF.md.

## Phase 02 preparation and coffee review

- Reviewed Phase 01 production renders and recorded the visual findings, reference gaps, licensing rules and delivery sequence in PHASE_02_PREPARATION.md. The default Phase 02 build matched all five baseline Chromium screenshots byte-for-byte.
- Built the opt-in R3F and Drei viewer, responsive keyed camera, warm lighting, bounded GLB loading, resource cleanup, reduced-motion support and static fallback. Prepared the model file validator and architectural reference pipeline.
- Produced two independent, geometrically displaced coffee GLBs with PBR materials, separate transforms and visitor controls. Saved height and detail inputs, fallback renders and raking-light renders. The tree has 708 displaced vertices above the recorded threshold and peaks at 0.08306 model units. The palace study has 1,101 and peaks at 0.09250. Each has 14,152 triangles. Encoded sizes are 336,056 and 335,152 bytes. Both are marked REVIEW.
- Passed ESLint, strict TypeScript, formatting and production builds with review mode enabled and disabled. Khronos glTF Validator reported zero errors and warnings for both files. The local asset validator accepted both files and rejected malformed and oversized samples.
- Passed desktop English and 390-pixel Arabic coffee preview checks in Chromium, including keyboard activation, independent float controls, rotation under reduced motion, both GLB responses, DPR cap, loading failure, absent WebGL, simulated context loss, fallback visibility and axe scans. The default build passed the nine-case Phase 01 browser regression matrix and refused a direct review GLB request.
- Measured 144 KiB of initial JavaScript in the default desktop production route and approximately 259 to 302 KiB in deferred preview JavaScript in local Chromium. Physical Android or iPhone GPU performance and field Web Vitals remain unmeasured.
- Standalone Ibex, Bab Al-Yemen, Dar Al-Hajar and Socotra tree are blocked on reference material and rights. Next, review the two coffee studies against the original references, confirm the Dar Al-Hajar relief's verified features and obtain the ibex turntable and usage approval. After that, build the ibex silhouette review before material and device validation.
