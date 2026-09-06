# Colony Display

Live **animated + interactive** generative tool — an emulation of a handheld
A/V device screen: a phosphor dot-matrix running Game-of-Life colonies that
flicker, grow, and dissolve on dark teal glass, with CRT-style bloom.
**Touch/click the screen** to splash a new colony into the simulation — the
splash flashes yellow and radiates ripple rings, just like poking the real
device (ref: kindofdevice_ A/V app reel).

Fifth sibling in the tools family — same shell, same rack UX. Open
`index.html` in a browser. No build step, no dependencies — single
self-contained file styled with the digidelic design system.

## How it works

Classic Conway Life (B3/S23, toroidal) drives the colonies at a slider-set
tempo. Each cell carries a **phosphor energy** value — lit cells snap to
full brightness, dead cells decay along a trail, which is what gives the
display its glowing-ember flicker. A **vitality** term sparks small random
colonies so the screen never goes dark. Rendering is two-pass: a crisp dot
layer plus an additive blurred layer for bloom; the **diffusion** slider
crossfades toward the fully blurred pass for the soft metaball-glow mode
seen in the reference. Touched cells carry a heat value that tints them
toward the splash color while it fades.

The ripple quality lives **in the colonies themselves**. Two crossing
slow water waves undulate the brightness and size of every lit dot, so
colony bodies shimmer like liquid. Beneath them runs a height/velocity
wave field excited by the life of the colonies — every cell birth drops a
small pulse, every death a dip — so soft ripples radiate through the blobs
as they grow and churn. Where the water is moving, the phosphor refracts
toward a **spectral second hue** (icy blue in the green palette). Now and
then a colony **transmits**: a spontaneous hot pulse flares and ripples
outward on its own. A dim palette-colored **abyss** drifts slowly beneath
the matrix, and the bloom breathes on a ~7-second heartbeat. Touch/click
still splashes a new colony straight into the simulation.

## Parameter rack

| Section | Control | Effect |
|---|---|---|
| Seed | Hex readout + `⟳ Reseed` | Deterministic starting colonies |
| Colony | Soup density | Fill rate of the seeded colony blobs |
| | Vitality | Rate of spontaneous colony sparks |
| | Phosphor decay | Trail length of dying cells |
| | Tempo | Simulation steps per second |
| Screen | Grid | Dot-matrix resolution (48²–160²) |
| | Diffusion | Crisp dots ↔ soft blurred glow |
| | Glow | Bloom intensity |
| | Dot size | Dot diameter within its cell |
| | Undulation | Watery shimmer of the colonies: wave amplitude, ripple gain, spectral refraction |
| Style | Palette | `Phosphor` (green on teal glass) · `Amber` · `Digidelic` (electric yellow on void) |
| | Sound | Tiny colony synth — births trigger pentatonic blips, density drives the filter |

`space` = reseed, `p` = play/pause, `e` = export PNG. Pointer down/drag on
the canvas stamps colonies with ripples.

## Export

- `▶ Export PNG` — current frame at 2160×2160
- `⏺ Rec 6s` — 6-second WebM clip of the live animation via `MediaRecorder`,
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
