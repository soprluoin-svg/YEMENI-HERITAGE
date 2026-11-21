# Architecture

The App Router uses a validated language segment and a locale-specific root layout so the server emits the correct HTML language and direction. An internal rewrite serves the English entry at /, and /ar serves Arabic. The exhibition layout and copy render on the server. Client islands manage navigation and opt-in scroll reveals.

Tailwind CSS handles shared utility primitives and the global stylesheet owns tokens and scene composition. Hero media uses the Next.js image pipeline. Typed data defines asset slots, lighting presets and independent coffee transforms. A future R3F renderer can consume those contracts from a dynamically imported scene-specific module after readiness and capability checks. Phase 01 uses zero canvases and no Three.js imports.

Node.js 24 is the development baseline. The lockfile is authoritative and npm ci is the reproducible install entry point.

## Phase 02 preview path

The server scene registry only supplies a viewer for eligible GLB paths. The visitor keeps the existing static composition until activating a preview. The viewer then loads R3F and Drei in an asynchronous chunk, mounts one demand-rendered canvas, and streams bounded same-origin GLBs with embedded textures. A new preview closes the preceding one. Fetch cancellation, GPU resource disposal and trigger cleanup run when the preview closes. Unsupported WebGL, context loss, invalid models and failed loads return to the static view.

The coffee review requires `YEMENI_REVIEW_ASSETS=1` at build and startup. Candidate artifacts live outside `public/`. The server only serves a fixed list of review assets when the flag is enabled. This flag is for local review. Keep it disabled in deployed environments.
