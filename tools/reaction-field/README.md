# Reaction Field

Live **animated** generative tool — a Gray-Scott reaction-diffusion
simulation shaded as glossy 3D relief, after the ferrofluid-like "growing
coral" Reels reference: labyrinthine ridge fields in the core dissolving
into dot colonies at the rim, embossed silver on black.

Fourth sibling of the patchwork / cosmogram / glyph-foundry tools — same
shell, same rack UX, but the canvas runs a continuous simulation instead of
a static render. Open `index.html` in a browser. No build step, no
dependencies — single self-contained file styled with the digidelic design
system.

## How it works

Two virtual chemicals diffuse and react on a grid
(`A' = A + dA·∇²A − AB² + F(1−A)`, `B' = B + dB·∇²B + AB² − (F+k)B`).
The feed (F) and kill (k) coefficients **drift radially** with seeded noise
wobble — labyrinth-regime values at the core blending into dot-colony
values at the rim — which is what gives the reference its stripes-center /
dots-edge anatomy. The concentration field is then lit as an embossed
surface: normals from the height gradient, Lambert diffuse plus a
Blinn-style specular bloom on ridge tops.

## Parameter rack

| Section | Control | Effect |
|---|---|---|
| Seed | Hex readout + `⟳ Reseed` | Deterministic starting culture and noise field |
| Reaction | Feed rate / Kill rate | Core-regime Gray-Scott coefficients — stripes, worms, dots, mitosis |
| | Diffusion | dB/dA diffusion ratio — low = sharp thin filaments, high = soft fat blobs |
| | Anisotropy | Skews the Laplacian horizontally/vertically — the pattern grows a directional grain |
| | Morph drift | How far the coefficients drift toward the dot regime at the rim |
| | Rim size | Where the labyrinth-to-dots regime boundary sits |
| | Agitation | Droplets of chemical B raining onto the field, keeping the culture churning |
| | Speed | Simulation steps per animation frame |
| Surface | Relief depth | Height exaggeration of the embossed shading |
| | Gloss | Specular strength and tightness |
| | Light angle | Direction of the key light |
| | Detail | Simulation grid resolution (re-seeds the culture) |
| Style | Palette | `Ferro` (silver on black) · `Porcelain` (dark relief on paper) · `Digidelic` (phosphor green + yellow specular on void) |
| | Format | 1:1 square or 4:5 portrait |

`space` = reseed, `p` = play/pause, `e` = export PNG.

## Export

- `▶ Export PNG` — current frame at 2160px wide
- `⏺ Rec 6s` — captures a 6-second WebM clip of the live animation
  (30 fps via `MediaRecorder`), named `digidelic-reaction-<seed>.webm`
