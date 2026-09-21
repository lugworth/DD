# Diffusion Field (Reaction Field)

Live **animated** generative tool — a Gray-Scott reaction-diffusion
WebGL2 float simulation with dynamic chemical diffusion, organic morphing regimes,
custom text matrix seeding, interactive reactant injection, and high-resolution export.

Sibling of the patchwork / cosmogram / glyph-foundry / colony-display tools — same
cybernetic shell, same rack UX, running a GPU-accelerated WebGL2 simulation. Open `index.html` in a browser. No build step, no
dependencies — single self-contained file styled with the digidelic design system.

## How it works

Two virtual chemicals diffuse and react on a float render-target texture
(`A' = A + (dA·∇²A − AB² + F(1−A))·dt`, `B' = B + (dB·∇²B + AB² − (F+K)B)·dt`).
Feed (F) and kill (K) rates determine the morphological regime:
- **Fingerprint**: Tight concentric ridge loops
- **Labyrinth**: Dense serpentine maze corridors
- **Coral**: Branching cellular reefs
- **Mitosis**: Active dividing spots
- **Worms**: Traveling filament strands
- **Voids**: Spongiform negative cavity holes
- **Flow**: Dynamic directional drift
- **Mixed field**: Spatially varying gradient with Perlin/fbm turbulence

## Parameter rack

| Section | Control | Effect |
|---|---|---|
| Regimes | 8 Regime Buttons | Mitosis, Coral, Labyrinth, Fingerprint, Worms, Voids, Flow, Mixed |
| Reaction | Feed / Kill | Kinetic coefficients F & K deciding growth morphology |
| | Diffusion A & B | Chemical diffusion rates (dA, dB) |
| | Time step / Steps per frame | Simulation step scale (dt) and iteration count per frame |
| Variation | Gradients / Turbulence | Spatial F/K variations (↔ / ↕) and fbm turbulence |
| | Evolve drift | Temporal oscillation evolving patterns over time |
| Rendering | Line weight / Edge softness | Visual line thickness and crispness / thresholding |
| | Ink & Paper / Palettes | Custom colors + Digidelic presets (Phosphor, UV Laser, Cobalt, Hot Coral, Acid) |
| Geometry | Aspect Ratio / Detail | Phone (9:16), Portrait (3:4, 4:5), Square (1:1), Wide (16:9) + Grid detail |
| Seeding | Starting pattern | Dots, Organic patches, Single center, Ring, Bands, Static noise, Text Matrix |
| | Text Seeding | Render typography directly into the chemical reaction field |
| | Paint Mode | Drag/touch on canvas to directly inject chemical reactant |
| Execution | Pause / Restart / Settle | Toggle animation, restart from seed, or rapidly settle 1000 generations |
| | Export | High-resolution PNG export (1080p, 2K, 4K) + 6-second live WebM capture |

`space` = play/pause, `r` = reseed, `e` = export PNG.

## Export

- `▶ Export PNG` — current frame at 2160px wide
- `⏺ Rec 6s` — captures a 6-second WebM clip of the live animation
  (30 fps via `MediaRecorder`), named `digidelic-reaction-<seed>.webm`
