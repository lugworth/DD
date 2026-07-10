# Glyph Foundry

Live generative tool producing specimen sheets of invented glyphs — an asemic
"alien alphabet" laid out on an annotated type-specimen grid with index
letters, row numbers, registration rules, and spot-color accent cells.

Third sibling of `tools/patchwork-generator/` and `tools/cosmogram-generator/`
— same shell, same rack UX, new engine. Open `index.html` in a browser.
No build step, no dependencies — single self-contained file styled with the
digidelic design system.

## Research references

The three glyph grammars were synthesised from web research:

- **Asemic construction** — glyphs built from 2–5 strokes walked over a node
  lattice; strokes may share nodes but never re-use an edge, and dot
  diacritics land near untouched nodes. Rules after
  [inconvergent's asemic writing studies](https://inconvergent.net/2020/asemic-writing/)
  and the [asemic writing](https://en.wikipedia.org/wiki/Asemic_writing)
  tradition of script-like marks without semantic content.
- **Planetary stack grammar** — every classical planetary/alchemical symbol
  is a vertical combination of just three primitives: circle, crescent, and
  cross ([alchemical symbols](https://en.wikipedia.org/wiki/Alchemical_symbol),
  [planetary glyphs](https://www.greatastromatcher.com/Learn/Glyphs)).
- **Bauhaus shape sheets** — solid geometric primitives (quarter wedges,
  semicircles, discs, stars, petal rings) in the grid-composition tradition
  of generators like [fffuel's qqquad](https://www.fffuel.co/qqquad/) and the
  [abstract-geometry trend](https://www.shutterstock.com/blog/abstract-geometry-design-trend-explained)
  in current web graphics.

## Parameter rack

| Section | Control | Effect |
|---|---|---|
| Seed | Hex readout + `⟳ Random` | Deterministic seed — every glyph derives from a per-cell sub-seed |
| Glyph | Complexity | Strokes per asemic walk (2–5+), elements per planetary stack |
| | Curvature | Probability a stroke bends into an arc instead of a straight segment |
| | Diacritics | Dot/tick marks placed near unused lattice nodes |
| | Solid shapes | Mix-in rate of Bauhaus primitives and planetary stacks vs pure asemic strokes |
| Sheet | Columns | Specimen grid resolution (rows derive from square cells); wide sheets earn 2×2 ringed display-glyph feature cells |
| | Annotations | Hairline cell grid → margin index labels → header rule → per-cell hex codes |
| | Accents | Spot-color glyphs and inverted color-chip cells |
| | Jitter | Hand-wobble applied to lattice node positions |
| Style | Palette | `Foundry` (ink + vermillion/slate/ochre spots on paper) · `Mono` (ink on paper) · `Digidelic` (brand neon on void) |
| | Format | 1:1 square (1080×1080) or 4:5 portrait (1080×1350) |
| | Ink weight / Margin | Stroke width, sheet inset |

All sliders re-render the canvas live. `space` = new seed, `e` = export.

## Export

`▶ Export PNG` renders at 2× (2160px wide) and downloads
`digidelic-glyphs-<seed>.png`.
