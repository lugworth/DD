# Pixel Echo

Live **animated + interactive** generative tool — a chromatic echo
compositor after the referenced glitch reel: chunky pixel shapes (squares,
hollow frames, L-brackets, bars) each trailed by a stack of offset copies
climbing a color ramp, a central vertical **spine** of color-cycling
blocks scrolling like a conveyor, and twinkling pixel debris, all snapped
hard to a pixel grid on black.

Ninth sibling in the tools family — same shell, same rack UX. Open
`index.html` in a browser. No build step, no dependencies — single
self-contained file styled with the digidelic design system.

## How it works

Every shape carries an echo direction (one of the four diagonals), a ramp
shift, and a phase. Echoes render back-to-front along the palette ramp —
deepest layer coolest, front layer hottest — with the offset distance
**breathing** on a slow sine per shape. Shapes **glitch-jump** to new
snapped positions at a slider-set rate, spines scroll their block
sequences continuously, and debris pixels expire and respawn. Everything
is quantized to the grid-snap size, so motion reads as hard pixel steps,
never smooth drift. **Click the field to drop a new echo shape** where
you point.

## Parameter rack

| Section | Control | Effect |
|---|---|---|
| Seed | Hex readout + `⟳ Reseed` | Deterministic composition |
| Shapes | Shapes | Number of echo shapes (5–60) |
| | Echo depth | Copies in each stack (1–8) |
| | Echo offset | Distance between copies |
| | Debris | Twinkling pixel dust count |
| | Spines | Vertical conveyor columns (0–3) |
| Motion | Breathe | Echo offset oscillation |
| | Glitch rate | Teleport frequency of shapes |
| | Spine scroll | Conveyor speed |
| | Grid snap | Quantization cell (6–24px) — the chunkiness |
| Style | Palette | `Digidelic` (gray→blue→cyan→green→yellow→pink) · `Arcade` (reference rainbow) · `Ghost` (grayscale) |
| | Format | 1:1 square or 4:5 portrait |

`space` = reseed, `p` = play/pause, `e` = export PNG.

## Export

- `▶ Export PNG` — current frame at 2160px wide
- `⏺ Rec 6s` — 6-second WebM clip of the live motion via `MediaRecorder`

## Sharing & history

The seed readout is a button — click it to copy a **permalink** that
encodes the seed and every rack setting, so a specific result is a URL.
Opening a link restores that exact state. `Ctrl+Z` / `Ctrl+Shift+Z`
(or `Ctrl+Y`) step through parameter **undo/redo**. On devices that
support the Web Share API a **Share** button appears next to Export and
hands the rendered PNG straight to the system share sheet.

## GIF capture

**◉ GIF 3s** grabs 36 frames off the live canvas at 12.5fps and packs a
looping GIF89a — useful where a WebM won't play inline (chat, forums,
older clients). The encoder is written into the file rather than pulled
from a CDN, so the tool stays dependency-free: colour is quantised to a
6·6·6 cube plus a 40-step grey ramp with an ordered dither, then LZW
packed. Capture is downscaled to 480px on the long edge; the pack step
takes a second or two at the end.

## Listening

**Listen** turns on microphone input, reduced to one smoothed 0–1 energy
value that is folded into a single parameter (shown on the button) on top
of whatever the slider is set to — so the rack still governs the floor and
the room only ever pushes upward. It is off until asked for, needs a
permission grant, and any failure quietly falls back to no mic.
