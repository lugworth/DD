# Pixel Knit

Live **animated + interactive** generative tool — a two-plate pattern sheet
compositor. Drop a **texture photo** (the colour and material source) and a
**subject clip** (video or still); the clip is binarised into a knit grid and
becomes the shape the texture shows through. The upper half is the motif on
paper, the lower half is the texture full-bleed with the motif knocked out of
it, and a justified caption band runs between them.

Tenth sibling in the tools family — same shell, same rack UX. Open
`index.html` in a browser. No build step, no dependencies — single
self-contained file styled with the digidelic design system.

## How it works

Each frame the subject is centre-cropped "cover" into an N×N buffer and
thresholded on luminance, giving a boolean stitch grid. That grid can be
folded (mirror, four-way, or a true 8-fold polar kaleidoscope around the
centre), reduced to its **contour** (cells that touch a background
neighbour), or inverted. The texture is painted once per frame into a
sheet-sized plate with the current pan and zoom; lit stitches then window
straight through to it. Both halves read colour from the **same footprint**
on the plate, so the paper motif previews exactly what the lower knockout
reveals.

Until you drop files in, the tool runs on a procedural flower-bed plate and a
flapping procedural subject, so the sheet is never blank.

## Parameter rack

| Section | Control | Effect |
|---|---|---|
| Texture plate | Drop / click / paste | Colour + material source; shown full-bleed in the lower half |
| Subject mask | Drop / click / paste | mp4 · webm · mov · or a still image |
| Matrix | Grid density | Stitch resolution, 9×9 → 64×64 |
| | Threshold | Luminance cut that separates subject from ground |
| | Stitch gap | Space between stitches |
| | Stitch round | Square stitches → round dots |
| | Invert fg/bg · Contour only | Flip the mask · keep only the outline ring |
| Symmetry | none · ↔ · ↕ · ⊞ · ◈ | Mirror L/R, U/D, four-way, or 8-fold kaleidoscope |
| Sheet | Motif scale | Size of the motif inside each half |
| | Texture zoom | Plate scale under the sheet |
| | Clip speed | Playback rate of the subject clip |
| | Layout | `Split · 24px` gutter or `Edge bleed` |
| | Paper | `Bone` · `Void` · `Acid` |
| Caption | Two lines | Justified edge-to-edge between the halves |

**Canvas gestures:** scroll over the upper half to scale the motif; drag —
or scroll — the lower half to reposition and zoom the texture plate.
`p` = play/pause, `e` = export PNG.

## Export

- `▶ Export PNG` — the sheet at 1800 × 2400
- `⏺ Rec 6s` — 6-second WebM of the live sheet via `MediaRecorder`
