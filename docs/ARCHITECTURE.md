# Architecture

The App Router uses a validated language segment and a locale-specific root layout so the server emits the correct HTML language and direction. An internal rewrite serves the English entry at /, and /ar serves Arabic. The exhibition layout and copy render on the server. Client islands manage navigation and opt-in scroll reveals.

Tailwind CSS handles shared utility primitives and the global stylesheet owns tokens and scene composition. Hero media uses the Next.js image pipeline. Typed data defines asset slots, lighting presets and independent coffee transforms. A future R3F renderer can consume those contracts from a dynamically imported scene-specific module after readiness and capability checks. Phase 01 uses zero canvases and no Three.js imports.

Node.js 24 is the development baseline. The lockfile is authoritative and npm ci is the reproducible install entry point.
