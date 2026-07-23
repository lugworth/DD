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

- `▶ Export PNG` — current phosphor state at 2160×2160
- `⏺ Rec 6s` — 6-second WebM clip of the live sweep via `MediaRecorder`
