# Motion system

GSAP owns cinematic timelines and ScrollTrigger. Load it after hydration and during idle time when possible. Scope animations with GSAP context and use media matching so a reduced-motion change reverts active animation. Keep the base server-rendered page visible and all controls usable before enhancement. CSS handles hover, focus and lightweight decoration. Motion is installed for future interface state transitions where CSS is insufficient.

The scene transition contract describes in-page reveals. The camera timeline contract models labeled, normalized progress stops with camera and target tuples. Later renderers own interpolation, input reconciliation and reduced-motion fallback framing. Phase 01 initializes no camera or WebGL scene.
