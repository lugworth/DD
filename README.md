# digidelic Design System

> A saturated neon-on-void brand and UI system. Zero border radius, pure-black canvas, mono-first typography, and solid-block color. vocabulary rooted in Marathon-style mission-control interfaces, WILLB/Clov color blocking, and ASCII glitch texture.

Machine-readable tokens: [tokens.json](tokens.json) (W3C DTCG format — colors, type, spacing, motion, elevation, focus, target sizes, each with contrast notes).

## Non-negotiable laws

- Background is pure black (`#000` / `#0a0a0a`).
- Border radius is `0`. Universal, no exceptions.
- Color arrives in solid blocks. No soft fills, no glassmorphism.
- Default border is 1px white @ 12% alpha. There is no other resting border treatment.
- No emoji. No exclamation points. Punctuation is structure: `// >> :: — ▶ ×`.
- ALL CAPS for structural text (headings, labels, nav, CTAs); lowercase for body and system output.

## Foundations

- [Accessibility](preview/foundations-accessibility.html): every computed contrast pairing with its ratio and verdict, the muted-text floor, focus ring spec, target sizes, motion policy, keyboard contract. **`--blue #2d6cff` is a fill color, not a text color (3.59:1).** Informational text never goes below `rgba(255,255,255,.55)` (6.25:1).
- [Component States](preview/foundations-states.html): the single global reference for rest / hover / focus / active / disabled / loading / error across button, input, nav item, and card. Read a column to learn a state, a row to learn a component.
- [Anatomy](preview/foundations-anatomy.html): labeled subpart breakdowns for button, data card, input, and nav item.
- [Colors](preview/colors-palette.html), [Surfaces](preview/colors-surfaces.html), [Display type](preview/type-display.html), [Mono type](preview/type-mono.html), [Spacing & radius](preview/spacing-radius.html).

## Components

Importable React components live in `components/<Name>/`, each a `.jsx` + `.d.ts` pair compiled onto `window.DigidelicDesignSystem_da5439`. Every one takes the same prop vocabulary: `id`/`accent` (hue), `surface`, `signal`, `geometry`, `glitch`, and where meaningful `texture` and `animation`.

| Component | Also exports | Notes |
| --- | --- | --- |
| **Button** | `ButtonRow` | Four variants, three sizes, flat texture grounds, stepped motion |
| **Badge** | `BadgeCount`, `BadgeRow` | `status` is fixed-meaning; labels are seeded |
| **Card** | `CardSection`, `CardGrid` | Five grounds, checker trim, texture |
| **NodeCard** | `SectorCard`, `StatCard`, `NodeMeter` | The signature form — code header, tabular rows, status line |
| **Field** | `Input`, `Select`, `Checkbox` | Seeded focus ring, validation override |
| **Progress** | `ProgressSegments`, `ProgressStack`, `ProgressAscii`, `Spinner` | Bars, discrete segments, stacks, block-ramp meters |

### Seeded hue

A component derives its stop from `hash(id ?? label)`, so the same node is the same colour on every screen. `accent` pins a stop instead. Status colours are the exception — `ok` is always green, `critical` always danger — because an operator reads hue as meaning.

### Surfaces

Three grounds: `black`, `night` `#150a1c`, `cream` `#e8e3d0`. The ramp rotates toward warm neighbours on night so magenta/indigo/violet don't sink into the violet ground, and darkens on cream until white ink clears 4.6:1 on all ten stops.

### Spec cards

The older documentation cards — navigation, overlays, disclosure, menus, log rows, and the remaining data displays — live under `preview/components-*.html` and are not yet extracted into components.

## Color tokens

| Token | Hex | Role | On black |
| --- | --- | --- | --- |
| `--cobalt` | `#2d6cff` | Primary action, hero fill, focus ring | 4.70:1 |
| `--green` | `#39ff6a` | Success, live | 15.69:1 |
| `--cyan` | `#00d9ff` | Data readout, links | 12.37:1 |
| `--teal` | `#12b39b` | Duotone third | 7.95:1 |
| `--coral` / `--red` | `#ff6050` | Checkerboard, dividers | 7.04:1 |
| `--pink` | `#ff2d87` | Alerts, notifications | 5.98:1 |
| `--pink-hot` | `#ff0066` | Critical errors | 5.44:1 |
| `--sky` | `#0a84e0` | Zine ground, tickers | 5.39:1 |
| `--magenta` | `#c800ff` | Glitch overlay | 4.90:1 |
| `--orange` | `#ff5a00` | Warning, hazard | 6.71:1 |

`--blue` is an alias of `--cobalt`. The former `#2d4cff` was visually indistinguishable from cobalt and failed AA for body text (3.59:1), so the two merged — the system has one blue.

Surfaces: `--black #000` · `--black-soft #0a0a0a` · `--black-panel #111110` · `--black-raised #1a1a18`. Night Garden layer: `--night #150a1c` · `--violet #8a3fb0` · `--indigo #4653e8` · `--blood #e02020`. Cream layer: `--cream #e8e3d0` · `--cream-panel #f2efe4` · `--cream-fg #0a0a0a`.

### The second set

Six deep, muted hues sampled from the reference plates — `--blush #d798a7` · `--oxblood #962c38` · `--botanical #3f6b45` · `--teal #03888c` · `--red-true #ff0026` · `--electric #0008ff`. Parallel to the rainbow, never seeded: a node is never “oxblood”. For plates, editorial and full-bleed grounds only. See [Textures & Overlays](preview/brand-textures.html).

## Typography

| Font | Role |
| --- | --- |
| **Geist Mono** (variable 100–900) | PRIMARY — UI, labels, terminal, coordinates, data. `fonts/GeistMono-VariableFont_wght.ttf` |
| **Space Grotesk** (700/900) | Display — uppercase tracked headlines |
| **Red Hat Mono** | Alt / fallback mono |

Numeric readouts always use `font-variant-numeric: tabular-nums` so ticking values don't jitter.

## Spacing

4px base. Scale: `4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 · 80 · 96`.

## Motion

`--dur-fast 100ms` (hover/press) · `--dur-base 160ms` (entrances) · `--ease-flow cubic-bezier(.16,1,.3,1)`.

The glitch (`gl-*`) and psychedelia (`psy-*`) layers loop by design and **must** collapse under `prefers-reduced-motion: reduce`. Never ship a looping decorative layer without that guard.

## Motifs & texture

Stripes · checkerboard · dither · scanlines · RGB glitch split · spirograph · ticker · tribal divider · marble. Plus sampled texture overlays (`.tex-crossgrid`, `.tex-flower`, `.tex-halftone`, `.tex-ascii-blue`) that drop into any `.tex-host` and tune with `--tex-op`.

`textures.css` adds the flat primitive layer: eight hard-stop, tileable `.t-*` fills driven by `--t-a` (mark) and `--t-b` (ground), six named colourways (`.t-knit`, `.t-oxblood`, `.t-blush`, `.t-electric`, `.t-paper`, `.t-bone`), and the same set in JS via `textureFill(kind, a, b, size)`. **Overlay law:** replace, never veil — no fade to transparent, no alpha ramp, one texture per composition, and never behind body copy.

The shared glitch layer (`glitch.css` + `glitch.js`) drops a degraded-signal treatment over any surface via `class="gl-stage"`.

## Logo

Canonical mark is the **monogram lockup**: a solid cobalt tile with a lowercase Space Grotesk 900 `d`, paired with a stacked mono caption (`DIGIDELIC` / `lugworth.design`). Variants in [logo-variations.html](ui_kits/digidelic/logo-variations.html).

## Iconography

No icon library. Unicode geometry only: `▶ ◀ ■ □ ◈ ▣ × + ✕ ▓ ░ ╋ ┼ ≡ ▸`.

## UI kits

- `ui_kits/digidelic/` — full React app prototype (node-grid mission control)
- `ui_kits/digidelic-tailwind/` — Tailwind CDN build + usage docs; `tailwind.config.js` at root
- `ui_kits/shadcn/` — shadcn/ui variable theme (`globals.css`)
- `ui_kits/daisyui/` — drop-in daisyUI theme (`daisyui-digidelic.css`)

## Files

```
styles.css              — root entry; @imports the three below
colors_and_type.css     — tokens + base elements + motifs
textures.css            — second set, cream surface, flat .t-* primitives
glitch.css / glitch.js  — glitch layer, texture overlays, psychedelia engine
tokens.json             — W3C DTCG machine-readable tokens
tailwind.config.js      — Tailwind drop-in config
thumbnail.html          — project tile
components/             — importable React components (.jsx + .d.ts + card)
preview/                — design system cards
ui_kits/                — four consumable kits
fonts/ assets/ research/
```

---

*v2.5 — 08-2026. Contrast-audited, states-documented, anatomy-labeled. Six importable components, three surfaces, flat texture layer.*
