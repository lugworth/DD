# Patchwork Post Generator

Live generative-art tool for producing Instagram-ready graphics in the style of
recursive patch-grid compositions (ref: "Patched Paradise" carousel posts) —
irregular column/row patchwork, fine scanline stripe fills, dashed hairlines,
nested outline rectangles, and scanline "tear" debris on a warm cream ground.

Open `index.html` in a browser. No build step, no dependencies — a single
self-contained file styled with the digidelic design system (black void UI,
Geist Mono rack labels, electric-yellow sliders, zero border radius).

## Parameter rack

| Section | Control | Effect |
|---|---|---|
| Seed | Hex readout + `⟳ Random` | Deterministic seed — same seed + params always reproduces the same graphic |
| Structure | Columns / Rows | Base irregular grid resolution |
| | Fragmentation | Probability a cell recursively splits into smaller patches |
| | Seam strips | Number of very narrow full-height columns rendered as dense block stacks |
| Ink | Fill density | Fraction of cells that receive ink vs stay cream |
| | Stripe rate | Weight of fine horizontal/vertical scanline fills |
| | Line detail | Hairline borders, dashed rules, nested outline rectangles |
| | Tear noise | Horizontal scanline-debris rows |
| Style | Palette | `Paradise` (ref primaries on cream) · `Mono` (black on cream) · `Digidelic` (brand neon on void) |
| | Format | 1:1 square (1080×1080) or 4:5 portrait (1080×1350) |
| | Stroke weight / Margin | Hairline thickness, outer frame inset |

All sliders re-render the canvas live. `space` = new seed, `e` = export.

## Export

`▶ Export PNG` renders at 2× (2160px wide) and downloads
`digidelic-patch-<seed>.png` — crisp for Instagram's 1080px pipeline.
