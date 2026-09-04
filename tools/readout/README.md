# Readout

Drop in an image and it comes back as a **character mosaic** — every cell one
measured glyph on ultramarine. Luminance alone decides how a cell is drawn, so
the picture emerges as a field of numerals with the darks simply falling out of
the sheet.

Thirteenth sibling in the tools family — same shell, same rack UX. Open
`index.html` in a browser. No build step, no dependencies — single
self-contained file styled with the digidelic design system.

## How it works

The source is drawn into an off-screen canvas the size of the grid — one pixel
per cell — then read back. Each pixel's luminance is levelled (contrast around
mid-grey, then brightness, then optional invert) and sorted into one of four
tiers:

| Tier | Luminance | Drawn as |
|---|---|---|
| 0 | below **Ink floor** | nothing — the background shows through |
| 1 | **Ink floor** → **Box level** | a bare glyph |
| 2 | **Box level** → **Fill level** | a glyph inside a hairline box |
| 3 | above **Fill level** | a solid tile with the glyph knocked out of it |

That drop-out at the bottom is what gives the sheet its ragged silhouette: the
figure is defined by where the characters stop, not by an outline.

Each cell's character comes from a hash of its coordinates and the sheet seed,
so a re-render of the same image reproduces the same sheet — `⟳ Reroll` picks a
new seed. A small share of cells is tinted from the palette's accent trio, and
**Flicker** re-rolls a handful of characters every 70ms so the readout stays
alive without the image moving.

## Source

Drop a file on the slot, click it to browse, or paste with ⌘/Ctrl+V. Until
something is loaded, a procedurally drawn bust stands in so the sheet is never
blank. The image is cover-cropped into the chosen format.

## Parameter rack

| Section | Control | Effect |
|---|---|---|
| Grid | Columns | Cell count across — rows follow the aspect |
| | Cell gap | Space around each box and tile |
| | Glyph size | Character size relative to the cell |
| | Character set | `Metrics` · `Numeric` · `Hex` · `ASCII ramp` |
| Levels | Ink floor · Box level · Fill level | The three tier thresholds |
| | Contrast · Brightness | Levelling before the thresholds |
| | Invert · Box outlines | Flip light and dark · hide the tier-2 box |
| Signal | Accents | Share of cells tinted from the accent trio |
| | Flicker | Characters re-rolled per tick |
| | Palette | `Ultramarine` · `Digidelic` · `Terminal` · `Mono` |
| | Format | Source · 1:1 · 4:5 |

`e` = export PNG, `r` = reroll.

## Export

- `▶ Export PNG` — the sheet at 2× its format size
- `⧉ Copy text` — the same sheet as plain characters, blanks where cells dropped
  out, ready to paste anywhere monospaced
