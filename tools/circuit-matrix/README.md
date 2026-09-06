# Circuit Matrix

Live **animated + interactive** generative tool — a self-routing circuit
board on an emulated LED dot panel, after polyhop's TouchDesigner-to-LED-
matrix research reels: colored rectilinear traces crawl across the matrix,
turn in right angles, terminate in solder pads, and share the board with
pad pairs joined by thick links, stacked bar banks, and pin-dot grids —
yellow / coral / mint / purple / blue on black, with LED bloom and the
unlit dots faintly visible.

Eighth sibling in the tools family — same shell, same rack UX. Open
`index.html` in a browser. No build step, no dependencies — single
self-contained file styled with the digidelic design system.

## How it works

Routing walkers spawn on a cell grid and advance two cells per clock tick,
continuing straight with slider-set probability and cornering 90°
otherwise. They claim cells in an occupancy grid so traces never cross;
blocked heads try one turn, then terminate — usually in a solder pad.
Module templates (pad-links, bar banks, dot grids, blocks) are stamped
into free areas. When the board fills past a threshold, the oldest
elements dissolve (`turnover`) so the panel re-routes forever. Fresh
elements flash in hot; routing heads burn white. **Click the board to
solder new traces** at that spot.

## Parameter rack

| Section | Control | Effect |
|---|---|---|
| Seed | Hex readout + `⟳ Reseed` | Wipes the board and re-routes deterministically |
| Routing | Trace rate | Walker spawn frequency and concurrency |
| | Straightness | Straight-run probability vs 90° corners |
| | Pads | Chance and size of solder pads at trace ends |
| | Modules | Placement rate of pad-links, bar banks, dot grids, blocks |
| | Turnover | How aggressively old elements dissolve to make room |
| Panel | Grid | LED matrix resolution (48–128 columns) |
| | Glow | LED bloom |
| | Dot size | LED diameter within its cell |
| | Clock | Board ticks per second |
| Style | Palette | `Breadboard` (reference colors) · `Copper` (gold/copper/tin on dark olive) · `Digidelic` (brand neon) |
| | Format | 2:1 panel (like the reference hardware) or 1:1 square |

`space` = reseed, `p` = play/pause, `e` = export PNG.

## Export

- `▶ Export PNG` — current panel at 2160px wide
- `⏺ Rec 6s` — 6-second WebM clip of the live routing via `MediaRecorder`

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

## External control

**External** hands the rack to hardware. `MIDI CC` listens on every MIDI
input and maps continuous-controller *n* to the *n*th slider; `Gamepad`
maps stick axis *n* the same way. Values are written through each
slider's own input event, so everything already wired to that slider
still runs — this needs no per-tool knowledge of what the controls mean.
