# digidelic — Design System v2.0

> Rewritten from reference imagery. Saturated neon-on-black brand language rooted in Marathon (Bungie 2025, Michael Rigley) + WILLB/Clov brutalist UI references + ASCII glitch textures.

---

## Reference Sources

Built from these uploaded references:

| Source | Contribution |
|---|---|
| **Marathon trailer stills** (Rigley/Antibody) | Saturated electric blue, hot magenta, pixel dithering, equipment labels, coordinate markers (A1.2, X.06), chromatic aberration |
| **WILLB corporate brand** (Behance) | Hot pink + yellow + cyan blocks on black, checkerboard fills, vertical stripe patterns |
| **Clov fitness UI** | Electric yellow + neon green + hot pink color blocks, rounded pill stripes repurposed as sharp rectangles |
| **Brutalism web design** | Chunky display type, hazard stripes, ticket-stub compositions |
| **ASCII glitch blob** | Organic black/white noise as supporting texture |
| **Bioluminescent green (Marathon)** | Vivid-green-on-void lighting language |
| **Psychedelic portraiture** (`research/ref-psychedelic-*.jpg`) | Hikari-Shimoda-adjacent: black-clad figures dissolving into chromatic rainbow auras over vivid wildflower fields. Emotional neon — bleed/glow/oversaturation. Hero imagery. |
| **DIY zine collage** (`research/ref-zine-collage.png`) | Red/blue checker headers, neon-green spirograph loops, tribal/gothic display type, ticker footers, torn-photo collage. The loud lo-fi voice. |
| **Motion ref** (`research/ref-motion.mp4`) | Animated treatment cues — flicker, light-leak, glitch timing |

See the **Style References** card in the Design System tab for the moodboard.

---

## Voice & Copy

- **ALL CAPS for everything structural** — headings, labels, badges, nav, CTAs
- **lowercase for body + system output** — `session authenticated · awaiting input`
- **Coordinate markers as decoration** — `A1.2`, `B6`, `X.06`, `4R`, `273`, `0x4F3A`
- **Equipment labels read like stencil on metal** — `FRONT CONNECT`, `PULL 3`, `HO₂E`, `CARGO`
- **No exclamation points. No emoji.** 
- **Punctuation as structure** — `// >> :: — ▶ ×`
- **Truncation is design** — `signal lost_`, `no carrier`, `ERR_NULL`

---

## Visual Law

1. **Background is pure black.** `#000` / `#0a0a0a`. Never gradient.
2. **Color arrives in solid blocks.** Full-bleed rectangles of yellow/pink/green/blue on black. No soft fills.
3. **Zero border radius.** Hard corners universal.
4. **Hairlines are 1px white @ 12% alpha.** No other border treatment for default state.
5. **Active = solid color fill.** Yellow panel, pink panel, etc. Text on color flips to black.
6. **Multiple type weights + sizes in one composition is intentional.** Fontslop.
7. **Hazard stripes, checkerboards, and dithered pixel fills** are the texture toolkit — not gradients, not shadows.

---

## Color Palette

| Token | Hex | Role |
|---|---|---|
| `--black` | `#000000` | Universal canvas |
| `--black-soft` | `#0a0a0a` | Page background |
| `--black-panel` | `#111110` | Surface / card |
| `--white` | `#ffffff` | Text on black |
| `--yellow` | `#eaff00` | Primary action, hazard, WILLB/Clov hero |
| `--pink` | `#ff2d87` | Alerts, live notifications, glitch |
| `--pink-hot` | `#ff0066` | Critical errors |
| `--green` | `#39ff6a` | Success, live, bioluminescent |
| `--blue` | `#2d4cff` | Marathon fill, immersive panels |
| `--magenta` | `#c800ff` | Glitch overlay, rare accent |
| `--cyan` | `#00d9ff` | Data readout, links |
| `--white` | `#ffffff` | Text, ink on color blocks |

> **v2.3 — Night Garden.** Latest refs (07-2026): infrared night-garden photography (deep violet skies, blood-red foliage, indigo leaves) + colorful ASCII dot-matrix grids. These are now the canonical backdrop layer: `--night/--violet/--indigo/--blood` tokens, `.tex-ascii-1…5` tiled data-textures, `.bg-night-*` photo backdrops with `.night-scrim`. See the **Night Garden** card.

### Duotone layer (from flower / halftone / cross-grid refs)

| Token | Hex | Role |
|---|---|---|
| `--sky` | `#0a84e0` | Clean electric-blue surfaces, ticker strips, checker squares (was periwinkle) |
| `--coral` | `#ff6050` | Checkerboard, tribal/barbed dividers, warm alert (was signal-red) |
| `--teal` | `#12b39b` | Duotone third — flower texture, secondary accent |
| `--lime` | `#c6ff3a` | Spirograph / lissajous line overlays |

> **v2.1 recolor:** the harsh red×periwinkle pairing was retuned to the **coral × sky** duotone sampled from the flower/halftone uploads, with **teal** added as a third. Cross-grid stays yellow-dominant with cyan/magenta/orange pops.

These unify the loud DIY-zine side of the brand with the FUI core. Use them for expressive surfaces (mastheads, tickers, collage frames) while the neon heroes drive functional UI.

## Typography

| Font | Role | Source |
|---|---|---|
| **Space Grotesk** | Display + body — uppercase tracked headlines, stacked | Google Fonts |
| **Geist Mono** | UI / labels / terminal / coordinates / data — PRIMARY mono | Local — `fonts/GeistMono-VariableFont_wght.ttf` (variable, 100–900) |
| **Red Hat Mono** | Alt / fallback mono | Local — `fonts/RedHatMono-VariableFont_wght.ttf` (variable, 300–700) |

Real display font TBD. Supply proprietary files to replace Space Grotesk if needed.

## Spacing

4px base unit. Scale: `4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 · 80 · 96`.

## Border Radius

`0` — universal. No exceptions.

## Iconography

No icon library assumed. Unicode + geometric shapes only: `▶ ◀ ■ □ × + ▓ ░ ╋ ┼`. For additional needs use **Phosphor Icons** (thin weight) via CDN — closest technical match.

## Motifs

Reusable texture utilities live in `colors_and_type.css`:

| Class | Motif | Source |
|---|---|---|
| `.stripes-yellow/-pink/-cyan` | Diagonal hazard stripes | Clov / WILLB |
| `.scanlines` | CRT scanline overlay | Marathon / glitch layer |
| `.dither` | Pixel dot grid | ASCII / Marathon |
| `.glitch` (+ `data-text`) | RGB channel split | glitch layer |
| `.checker` (+ `--chk`) | Coral×sky checkerboard masthead | flower duotone |
| `.spiro` | Acid-lime spirograph loop overlay | zine collage |
| `.ticker .run` | Scrolling sky-blue date/text strip | zine collage |
| `.arch` | Cathedral-arched photo frame (round top only) | zine collage |
| `.tribal` | Red barbed/spiky divider rule | zine collage |
| `.marble` | Red-on-white liquify swirl frame | zine collage |

The shared **glitch layer** (`glitch.css` + `glitch.js`) drops a fine degraded-signal treatment over any surface via `class="gl-stage"` — scanlines, rolling band, sub-pixel RGB jitter, intermittent micro-tears.

### Texture overlays (image refs)

Three sampled uploads live as ambient overlay layers (real positioned `<div>` children for robust rendering). Drop into any `.tex-host` container and tune with `--tex-op`:

| Class | Source | Blend |
|---|---|---|
| `.tex .tex-crossgrid` | `assets/tex-crossgrid.png` | screen (yellow/cyan/magenta plus-marks) |
| `.tex .tex-flower` | `assets/tex-flower-duotone.png` | overlay (coral/sky/teal) |
| `.tex .tex-halftone` | `assets/tex-halftone-portrait.png` | screen (warm dotted) |
| `.tex .tex-grid-fine` | cross-grid, 140px | screen (sharp data-texture) |

See the **Texture Overlays** card.

### Tailwind

A full Tailwind build ships alongside the CSS system:
- `tailwind.config.js` — drop-in config: all tokens as utilities (`bg-coral`, `text-sky`, `border-teal`, `font-display`), radius reset to 0, motif gradients + texture `backgroundImage`.
- `ui_kits/digidelic-tailwind/index.html` — CDN showcase + usage docs. See the preview cards and `Zine System` / `Style References` cards in the Design System tab.

---

## File Index

```
README.md                         — this file
SKILL.md                          — agent skill
colors_and_type.css               — design tokens

assets/
  glitch-blob.gif                 — animated ASCII glitch

preview/                          — design system cards
  colors-palette.html             — full 7-hero palette
  colors-surfaces.html            — blacks, greys, borders
  type-display.html               — Space Grotesk headlines
  type-mono.html                  — Geist Mono system text
  spacing-radius.html             — spacing scale + 0-radius rule
  components-buttons.html         — buttons, all variants
  components-inputs.html          — inputs, selects, toggles
  components-cards.html           — data panels, ticket stubs
  components-badges.html          — status, tags, coords
  brand-motifs.html               — stripes, checker, dither
  brand-logo.html                 — digidelic wordmark variants
  brand-glitch.html               — RGB-split + glitch blob

ui_kits/
  digidelic/
    README.md
    index.html                    — full app prototype
```

---

*v2.0 — 2026. Will refine as more source assets arrive.*
