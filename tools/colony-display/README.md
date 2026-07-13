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

Beneath the dots runs a **pond wave field** (height/velocity ripple
simulation with reflecting edges). Every touch plunges a gaussian into it:
big round wavefronts expand across the screen, bounce off the walls, lift
the brightness and swell the size of the dots they roll through, and stir
the colony — cells on a passing crest sputter to life. Dragging pulls a
wake. The wave field steps every frame regardless of the life tempo, so
the surface always answers immediately, even paused.

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
| | Ripple power | Plunge depth, wave brightness gain, and colony stirring of the pond field |
| Style | Palette | `Phosphor` (green on teal glass) · `Amber` · `Digidelic` (electric yellow on void) |
| | Sound | Tiny colony synth — births trigger pentatonic blips, density drives the filter |

`space` = reseed, `p` = play/pause, `e` = export PNG. Pointer down/drag on
the canvas stamps colonies with ripples.

## Export

- `▶ Export PNG` — current frame at 2160×2160
- `⏺ Rec 6s` — 6-second WebM clip of the live animation via `MediaRecorder`
