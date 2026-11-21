# Session handoff

## Phase and branch

Phase 02 preparation and coffee asset review. Work on `codex/phase-02-3d-preparation`, which descends from the Phase 01 review branch. No merge or site deployment was requested.

Latest validated implementation commit at handoff is `e741b4e2f3e3ef6e75e3ef2f9ed4f818118b7e4a`. Run `git rev-parse HEAD` for the current tip, including this handoff record.

## Completed

- Reviewed the existing bilingual presentation. Five matching screenshot pairs confirm the default visual composition was preserved.
- Added the opt-in three-dimensional viewer, conditional model path registry, bounded loader, responsive scroll camera, light presets, reduced-motion path and static recovery states.
- Sculpted two distinct coffee review meshes with genuine geometric displacement. Added separate rotation and float controls, PBR material, fallback images, angled renders and geometry measurements.
- Defined the reference intake, historical verification, license and model-size pipeline for the remaining assets.

## Files and assets

- `src/components/three/` contains the viewer, camera and lighting runtime, bean component and scoped loader.
- `src/lib/model-preview.ts`, `src/lib/scene-assets.ts` and `src/lib/model-budgets.json` define approval gating, transforms, camera tracks and byte limits.
- `src/lib/coffee-review.ts`, `src/app/models/review/[file]/route.ts`, and `src/components/scenes.tsx` integrate local review and keep unapproved items out of the default experience.
- `assets/coffee-review/` contains two GLBs, two WebP fallbacks, two angled WebPs, source maps and geometry evidence.
- `scripts/sculpt-coffee.py` and `scripts/check-model.mjs` generate and validate review geometry.
- `docs/PHASE_02_PREPARATION.md`, `docs/PROGRESS.md`, `docs/TASKS.md` and `docs/DECISIONS.md` record scope, QA, status and decisions.

## Validation and blockers

Lint, strict typecheck, formatting and both production builds passed. Khronos reported zero warnings and errors for both GLBs. Chromium confirmed the nine default route cases, and tested the English desktop and Arabic mobile-sized coffee preview with WebGL and fallback paths. See PROGRESS.md for the full evidence.

Both candidates are still in review. The Dar Al-Hajar motif requires verification against documentary photos. Obtain original ibex source views or an approved turntable and usage rights before modeling it. The freestanding buildings and Socotra tree also need source packages and rights. Real-device Android and iOS GPU testing is pending. No historical asset or production performance sign-off has been recorded.

## Resume

Read AGENTS.md and follow the continuity sequence. Use Node.js 24. From the repository root:

```sh
git switch codex/phase-02-3d-preparation
git status --short --branch
git rev-parse HEAD
npm ci
npm run lint
npm run typecheck
npm run build
YEMENI_REVIEW_ASSETS=1 npm run dev -- --hostname 127.0.0.1
```

In the local review server, navigate to the coffee section at `/#coffee` or `/ar#coffee` and activate the 3D view. For a production-mode local review, run `YEMENI_REVIEW_ASSETS=1 npm run build` followed by `YEMENI_REVIEW_ASSETS=1 npm run start -- --hostname 127.0.0.1`. Keep the flag disabled for deployed builds.

Review the front and raking views for both coffee candidates against the approved source pictures. Record the owner's visual decision, verify the palace silhouette and windows, and obtain original ibex views and publication rights. The next modeling task is P02-06, beginning with a grayscale silhouette turntable.
