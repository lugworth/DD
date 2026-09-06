# Patchwork Generator

Live generative-art tool for producing graphics in the style of recursive
patch-grid compositions (ref: "Patched Paradise") — irregular column/row
patchwork, fine scanline stripe fills, dashed hairlines, nested outline
rectangles, and scanline "tear" debris on a warm cream ground.

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
`digidelic-patch-<seed>.png`.

## Sharing & history

The seed readout is a button — click it to copy a **permalink** that
encodes the seed and every rack setting, so a specific result is a URL.
Opening a link restores that exact state. `Ctrl+Z` / `Ctrl+Shift+Z`
(or `Ctrl+Y`) step through parameter **undo/redo**. On devices that
support the Web Share API a **Share** button appears next to Export and
hands the rendered PNG straight to the system share sheet.

## SVG export

**⬡ SVG** writes the plate as true vector art rather than pixels —
infinitely scalable, and editable in Illustrator, Inkscape or Figma,
which suits the print-oriented output of this tool far better than a
raster export.

It works by replaying the same `render()` through a context object shaped
like `CanvasRenderingContext2D` that records SVG instead of drawing, so
the vector file and the on-screen canvas come from one code path and
cannot drift apart. Alpha is split out of `rgba()` into `fill-opacity` /
`stroke-opacity`, since browsers tolerate `rgba()` in SVG but Illustrator
and Inkscape do not.

Two caveats: canvas blend modes have no SVG equivalent and are dropped,
and text is emitted as `<text>` with a font reference rather than
outlines, so a machine without Space Grotesk will substitute a fallback.

## Seamless tile

**⧉ Tile** exports a 2×2 block with the plate mirrored across both axes,
which repeats seamlessly because every edge meets its own reflection —
the way textile and wallpaper repeats are usually built. It is a
*mirrored* repeat, not a translational one: the patch grid is not
generated on a torus, so it cannot wrap by translation without
regenerating the composition.
