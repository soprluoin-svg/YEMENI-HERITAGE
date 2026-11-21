# Tasks

Status values: BACKLOG, READY, IN_PROGRESS, BLOCKED, REVIEW, DONE.

| ID | Phase | Description | Priority | Dependencies | Acceptance criteria | Status | Related files | Validation |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| P01-01 | 01 | Establish governance and baseline | P0 | — | All continuity, change and handoff documents exist | IN_PROGRESS | AGENTS.md, README.md, docs/ | Inspect files and cross-references |
| P01-02 | 01 | Establish strict stack and bilingual routing | P0 | P01-01 | Compatible locked packages, valid routes and document direction | READY | package.json, src/app/, next.config.ts | npm ci, typecheck, build and HTTP |
| P01-03 | 01 | Implement tokens, atmospheric hero and navigation | P0 | P01-02 | Approved palette, responsive composition and accessible navigation | READY | src/app/globals.css, src/components/ | Visual inspection and keyboard checks |
| P01-04 | 01 | Implement scenes and 3D asset contracts | P0 | P01-02 | Five scenes and two independent coffee props, zero runtime WebGL | READY | src/components/, src/lib/ | Inspect types and verify DOM |
| P01-05 | 01 | Implement restrained motion infrastructure | P1 | P01-03 | Scoped GSAP, ScrollTrigger, cleanup and reduced-motion fallback | READY | src/components/scene-motion.tsx, src/lib/ | Browser with reduced motion and normal settings |
| P01-06 | 01 | Validate and hand off for review | P0 | P01-03, P01-04, P01-05 | Quality checks recorded and PR prepared | READY | docs/PROGRESS.md, docs/HANDOFF.md | Validation log, branch and pull request |
| P02-01 | 02 | Acquire approved cultural references before production 3D | P0 | P01-06 | Owner approves references and asset rights | BACKLOG | docs/ASSET_MANIFEST.md | Owner review |
