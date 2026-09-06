# Surface Tension

Live **interactive** type tool — set a line of copy, then **press and hold**
the canvas. Water pools under your finger as a metaball mass, and every
character it touches gives way and sinks beneath it. Let go and the copy
springs back.

Eleventh sibling in the tools family — same shell, same rack UX. Open
`index.html` in a browser. No build step, no dependencies — single
self-contained file styled with the digidelic design system.

## How it works

Holding spawns droplets at the pointer. They fall under gravity, damp with
viscosity, and push each other apart so a held pour spreads into a mass
rather than stacking into a thread. Each frame their **scalar field** is
summed onto a 4px grid (classic metaball falloff); a threshold — the
**surface tension** slider — turns that field into the water body.

The body is consumed two ways: as an alpha mask upscaled for the filled
styles, and through **marching squares** for the isoline styles, which trace
the real boundary at several levels the way the reference does.

The copy is laid out as **individual characters**, each its own body. A
character whose centre reads above threshold accelerates downward; once the
water lets go it springs home with damping. Sag depth and spring rate are
both on sliders, and ghosts mark where each sunk letter started.

## Parameter rack

| Section | Control | Effect |
|---|---|---|
| Copy | Text area | The headline; wraps into centred lines |
| | Type size · Tracking · Column | Scale, letter spacing, measure width |
| | Uppercase · Ghost origins | Case fold · faint marks at the original positions |
| Water style | `Flood` | Solid mass, letters inside knocked out in the accent |
| | `Contour` | Computed isolines only |
| | `X-ray` | Isolines plus letters tinted inside the body |
| | `Bleed` | Soft translucent wash |
| | `Sink` | No water drawn at all — the copy just gives way |
| Physics | Flow · Droplet · Gravity | Pour rate, droplet scale, fall speed |
| | Viscosity · Surface tension · Dwell | Damping, how tightly the mass holds together, how long water lingers |
| Give way | Sag · Recovery | How far letters sink · how fast they spring back |
| | Isolines | Number of contour levels |
| Style | Palette | `Crimson` · `Cobalt` · `Digidelic` · `Noir` |
| | Format | 4:5 · 1:1 · 9:16 |
| | Auto hold · Cursor ring | Idle demo pour · pointer readout |

`e` = export PNG, `r` = reset.

## Export

- `▶ Export PNG` — the poster at its full format size
- `⏺ Rec 6s` — 6-second WebM of a live pour via `MediaRecorder`

## Sharing & history

**⧉ Copy Link** copies a permalink encoding every rack setting, so a
look can be shared as a URL. Note that this tool's canvas depends on
input the URL can't carry — a dropped image, or a sheet you painted by
hand — so a link restores the *settings*, not that content.
`Ctrl+Z` / `Ctrl+Shift+Z` step through parameter **undo/redo**, and a
**Share** button appears on devices with the Web Share API.

## GIF capture

**◉ GIF 3s** grabs 36 frames off the live canvas at 12.5fps and packs a
looping GIF89a — useful where a WebM won't play inline (chat, forums,
older clients). The encoder is written into the file rather than pulled
from a CDN, so the tool stays dependency-free: colour is quantised to a
6·6·6 cube plus a 40-step grey ramp with an ordered dither, then LZW
packed. Capture is downscaled to 480px on the long edge; the pack step
takes a second or two at the end.
