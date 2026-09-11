# Implementation Plan: DD Tools Revamp

## Overview
Revamp all 13 digidelic generative tools with deeper functionality while preserving the neon-on-black brand identity and zero-dependency promise. Research findings provide a concrete matrix of 1-2 nontrivial features per tool plus shared shell recommendations.

## Architecture Decisions
- **Worktree isolation:** Each tool group gets its own worktree; integration owner merges.
- **Shared shell layer:** Extract common parameter-rack, state-serialization, export, and accessibility patterns into `tools/shared/` to deduplicate at authoring time, inline during standalone build.
- **State schema versioning:** Define `tools/shared/state-schema.json` (v1) containing: toolId, engineVersion, seed, settings, content, simulationState, assets. All import/export validates against this.
- **No runtime deps:** Keep playwright-core only for build step; browsers get fully inlined single files.
- **Brand compliance:** Pure black backgrounds, 0-radius, uppercase structure, lowercase system copy, no emoji/exclamation points in UI.

## Task List

### Phase 1: Foundation (Shared Shell)
- [x] Task 1.1: Create `tools/shared/` with `state-schema.json`, `parameter-rack.js`, `export-manager.js`, `accessibility.js`, `project-store.js` (IndexedDB optional local recovery), `history-manager.js` (undo/redo with content restore).
- [x] Task 1.2: Refactor one pilot tool (circuit-matrix) to use shared shell; verify standalone build still works.
- [x] Task 1.3: Update `build-standalone.mjs` to inline shared modules without duplication.
- [x] Checkpoint: Foundation — pilot tool builds, exports, imports, undoes, accessible.

### Phase 2: Simulation Tools (circuit-matrix, colony-display, reaction-field, signal-scope)
- [x] Task 2.1: circuit-matrix — add terminal routing mode with keep-out zones + SVG export of traces/pads/modules.
- [ ] Task 2.2: colony-display — add validated B/S rule editor with presets + RLE import/export with rotatable stamp placement.
- [ ] Task 2.3: reaction-field — add interactive regime atlas with named regimes + paint/erase chemical B with style-map brushes.
- [ ] Task 2.4: signal-scope — add dropped-audio stereo X/Y visualization + triggered time-domain/spectrum views with freeze.
- [ ] Checkpoint: Simulation Tools — all four build, new features work, no regressions.

### Phase 3: Composition Tools (patchwork-generator, cosmogram-generator, glyph-foundry, overprint)
- [ ] Task 3.1: patchwork-generator — add select/lock/regenerate individual patches/subtrees + interactive repeat proof with scale/offset/mirror vs translational modes.
- [ ] Task 3.2: cosmogram-generator — add component locking/selective regeneration + editable orb labels with aspect-connection layer.
- [ ] Task 3.3: glyph-foundry — add alphabet curation (lock/reroll/assign to characters) + editable specimen text with advance-width/spacing controls.
- [ ] Task 3.4: overprint — add per-plate engine selection/locking/solo/mute/ink opacity/angle/registration + monochrome plate separations with registration marks and manifest.
- [ ] Checkpoint: Composition Tools — all four build, new features work, no regressions.

### Phase 4: Media/Interaction Tools (pixel-echo, pixel-knit, readout, surface-tension, culture)
- [ ] Task 4.1: pixel-echo — add select/drag/delete/lock shapes + deterministic loop mode with timeline scrubbing.
- [ ] Task 4.2: pixel-knit — add printable stitch chart with coordinates/counts + alpha-mask mode with small-feature cleanup and temporal hysteresis.
- [ ] Task 4.3: readout — add true luminance-mapped character ramps + cell-aspect correction with draggable crop/focal-point.
- [ ] Task 4.4: surface-tension — add gesture record/replay with scrubber + pressure-sensitive pouring and keyboard-operable pour point.
- [ ] Task 4.5: culture — add nutrient attractors/exclusion masks with vein-growth mode + undoable painting/erasing with named dish checkpoints.
- [ ] Checkpoint: Media Tools — all five build, new features work, no regressions.

### Phase 5: Integration & Release
- [ ] Task 5.1: Merge all worktrees to `feat/tools-studio-revamp`; resolve conflicts in shared shell.
- [ ] Task 5.2: Run `node tools/build-standalone.mjs` for full dist rebuild.
- [ ] Task 5.3: Accessibility audit (axe-core via playwright) and performance profile each tool.
- [ ] Task 5.4: Update root README tools index and version badge.
- [ ] Checkpoint: Complete — all tools verified, dist ready, docs current.

## Risks and Mitigations
| Risk | Impact | Mitigation |
|------|--------|------------|
| Shared shell introduces subtle behavior changes | High | Pilot on one tool first; diff render output pixel-by-pixel. |
| GPU code paths (reaction-field, colony-display) diverge on different hardware | Medium | Keep CPU as reference; document WebGL2/GPU feature detection. |
| MediaRecorder/VideoEncoder not universally available | Medium | Already gated; ensure fallback messaging is clear, no broken UI. |
| IndexedDB storage quota / eviction | Low | Portable file download remains primary recovery; IndexedDB is optional cache. |
| SVG export limitations for blend modes | Low | Raster fallback documented; most tools already do both. |
| Floating-point determinism across engines | Low | Seed/settings permalink is best-effort; document that exact frame replay needs simulation state. |

## Open Questions
- Should culture's vein growth use space colonization (Runions et al.) or a simpler attraction-field?
- For glyph-foundry, should the curated alphabet be exportable as a JSON spec separate from the font binary?
- Do we want Web Share Target API so tools can receive files directly from OS share sheets?

## Verification Commands
- Build: `node tools/build-standalone.mjs`
- Accessibility: `npx playwright test tools/a11y.spec.js` (to be created)
- Performance: `npx playwright test tools/perf.spec.js` (to be created)
- Visual regression: `npx playwright test tools/visual.spec.js` (to be created)