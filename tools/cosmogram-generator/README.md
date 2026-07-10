# Cosmogram Generator

Live generative-art tool producing esoteric diagram plates — stacked celestial
orbs on a central axis, dashed orbit rings, bilaterally mirrored circuit-comb
line fields with dot terminals, faint red registration grids, bead strings,
and an ornamental border of glyph panels (eye-burst, moon phases, square/sine
waves, dot matrices, hex stars, colored triangle rows) on aged codex paper.

Sibling of `tools/patchwork-generator/` — same shell, same rack UX, different
engine. Open `index.html` in a browser. No build step, no dependencies —
single self-contained file styled with the digidelic design system.

## Parameter rack

| Section | Control | Effect |
|---|---|---|
| Seed | Hex readout + `⟳ Random` | Deterministic seed — same seed + params always reproduces the same plate |
| Cosmos | Orbs | Number of celestial bodies stacked on the axis (bullseye, disc, half-disc, arch) |
| | Orbit rings | Density of concentric dashed/solid rings, node dots, grand ellipses |
| | Circuit combs | Density of the mirrored comb line fields flanking the axis |
| Ornament | Border glyphs | Panel count and cell density of the ornamental frame |
| | Bead scatter | Colored bead strings and loose plus-marks in the field |
| | Register grid | Faint red registration rules and crosses |
| | Paper age | Soft staining blotches under the ink |
| Style | Palette | `Codex` (ink/vermillion/slate/ochre on tan) · `Mono` (ink on tan) · `Digidelic` (brand neon on void) |
| | Format | 1:1 square (1080×1080) or 4:5 portrait (1080×1350) |
| | Stroke weight / Margin | Line weight, outer frame inset |

All sliders re-render the canvas live. `space` = new seed, `e` = export.
Left/right sides are true mirrors — comb specs and side-cell glyphs are
generated once and drawn twice.

## Export

`▶ Export PNG` renders at 2× (2160px wide) and downloads
`digidelic-cosmogram-<seed>.png`.
