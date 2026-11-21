# Motion system

GSAP owns cinematic timelines and ScrollTrigger. Load it after hydration as the first chapter approaches the viewport. Scope animations with GSAP context and use media matching so a reduced-motion change reverts active animation. Keep the base server-rendered page visible and all controls usable before enhancement. CSS handles hover, focus and independent, scroll-linked coffee bean motion where view timelines are supported. Motion is installed for future interface state transitions where CSS is insufficient.

The scene transition contract describes in-page reveals. The camera timeline contract models labeled, normalized progress stops with camera and target tuples. Later renderers own interpolation, input reconciliation and reduced-motion fallback framing. Phase 01 initializes no camera or WebGL scene.

## Phase 02 preview choreography

The optional model stage uses its own ScrollTrigger to map scene visibility to camera and target keyframes. Narrow canvases use a separate camera track. An active reduced-motion preference selects a fixed frame and removes the scroll trigger. Each bean receives separate position, rotation, scale and timing values. The visitor can rotate either bean or pause its scroll-linked float independently. Rendering resumes on input or scroll and stays on demand between updates. The model canvas stays outside the accessibility tree. Controls, asset captions and status messages remain available as localized HTML.
