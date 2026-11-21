# YEMENI HERITAGE — COPPER & COFFEE EDITION

A cinematic digital exhibition celebrating Yemen’s architectural heritage, ancient civilization and cultural identity. Phase 01 establishes five bilingual exhibition scenes, a responsive design system and the foundation for future interactive 3D.

## Development

Use Node.js 24 and npm. The lockfile keeps installations reproducible.

```sh
npm ci
npm run dev
```

Open the development server printed by Next.js. English is available at `/` and Arabic at `/ar`. No environment variables or external services are required.

```sh
npm run lint
npm run typecheck
npm run format:check
npm run build
npm run start
```

## Project structure

- `src/app/[locale]/` renders the localized exhibition and sets document direction.
- `src/app/globals.css` defines tokens, typography, scene surfaces and responsive composition.
- `src/components/` contains the navigation, scenes and progressive motion entry point.
- `src/lib/` contains bilingual copy, asset and camera contracts, and scoped GSAP behavior.
- `public/media/` contains the optimized opening plate and ibex reference cutout.
- `docs/` is the source of truth for plans, tasks, decisions, progress and handoff.

Start with [AGENTS.md](AGENTS.md) and the [master plan](docs/MASTER_PLAN.md). Read the [asset manifest](docs/ASSET_MANIFEST.md) before using references for production geometry. The foundation renders without WebGL. Final cultural assets and advanced choreography require a separate phase.
