# Signal Scope

Live **animated + audible** generative tool — a phosphor vector display
plotting a dual-beam harmonograph. Two signals (X and Y oscillators with
harmonic partials, detune, and FM wobble) drive a pair of beams across a
scope graticule; the detune makes the Lissajous figure precess forever, so
the phosphor weaves layered ribbons and webs that never repeat exactly.

Sixth sibling in the tools family — same shell, same rack UX. Open
`index.html` in a browser. No build step, no dependencies — single
self-contained file styled with the digidelic design system.

## How it works

`x = sin(fx·θ+φ₁)+h·sin(m₂ₓfx·θ/2)`, `y = sin((fy+detune)·θ+φ₂)+…`, with
slow sinusoidal FM on the phases. The seed fixes the phase constellation
and the harmonic partial multipliers. Two beams draw the same figure a
quarter-cycle apart in two colors. Trails accumulate on a persistent
phosphor surface faded by `destination-out` each frame — the persistence
slider sets the memory — with an additive blurred pass for bloom and hot
beam-head dots. With **sound on**, the actual signal pair plays as two
sine tones panned left/right (X at 55·fx Hz, Y at 55·fy Hz — you hear the
same ratio you see).

## Parameter rack

| Section | Control | Effect |
|---|---|---|
| Seed | Hex readout + `⟳ Reseed` | Phase constellation + harmonic partial multipliers |
| Signal | Freq X / Freq Y | The Lissajous ratio (1–12 each) |
| | Detune | Precession rate — how fast the figure rotates through itself |
| | Harmonics | Blend of the seeded higher partials — knots and lobes |
| | FM wobble | Slow frequency modulation — organic drift |
| Beam | Persistence | Phosphor memory (trail length) |
| | Beam width | Stroke width of the beams |
| | Glow | Additive bloom, breathing slowly |
| | Sweep speed | How fast the beams travel |
| Style | Palette | `Scope` (green phosphor) · `Plotter` (ink + vermillion on paper) · `Digidelic` (cyan × pink dual beam on void) |
| | Sound | The plotted pair as audible sine tones, panned L/R |

`space` = reseed, `p` = play/pause, `e` = export PNG.

## Export

- `▶ Export PNG` — current phosphor state at 2160×2160. This upscales the
  live trail canvas rather than re-rendering the beam history at target
  resolution, so sharpness tracks whatever size the canvas was actually
  drawn at (larger browser window = crisper export) — not a fixed 2160px
  render.
- `⏺ Rec 6s` — 6-second WebM clip of the live sweep via `MediaRecorder`,
  including audio when Sound is on

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

## External control

**External** hands the rack to hardware. `MIDI CC` listens on every MIDI
input and maps continuous-controller *n* to the *n*th slider; `Gamepad`
maps stick axis *n* the same way. Values are written through each
slider's own input event, so everything already wired to that slider
still runs — this needs no per-tool knowledge of what the controls mean.
