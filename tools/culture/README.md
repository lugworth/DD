# Culture

Live **interactive** growth studio — paint seeds into a dish and they keep
living. Cells inflate, shove each other apart, and divide wherever there is
room, packing into foam that holds the shape you drew. Filaments and rings
grow by **differential growth**: their nodes repel, spring to their
neighbours, and gain new nodes as the line lengthens, so a circle buckles
into a labyrinth.

Twelfth sibling in the tools family — same shell, same rack UX. Open
`index.html` in a browser. No build step, no dependencies — single
self-contained file styled with the digidelic design system.

## How it works

**Cells** are discs on a uniform spatial hash. Each step they inflate toward
the blob size, push apart anything they overlap, and — if a grown cell can
find an unoccupied spot beside it — divide into two. That free-space check is
what makes a colony fill the stroke it was painted into and then hold,
instead of flooding the dish.

**Filaments** are polylines. Every node repels its neighbours within a radius,
springs to the two nodes it is chained to at the target spacing, and pulls
toward the midpoint of that pair for smoothing. New nodes appear wherever a
segment stretches, plus at an excitability-driven rate — so the line keeps
gaining length in a space that cannot hold it, and folds.

## Tool rail

| | Tool | |
|---|---|---|
| ✺ | Cell brush | Seeds that divide and pack |
| 〰 | Filament brush | A painted line that grows and folds |
| ◯ | Ring | A closed loop that buckles into a labyrinth |
| ⁙ | Spray | Scattered seeds |
| ⌫ | Erase | Remove cells and nodes under the brush |
| ❄ | Freeze | Stop growth, keep painting |
| ◉ | Seed | Drop a starter colony in the middle |
| 🗑 | Clear | Empty the dish |

## Parameter rack

| Section | Control | Effect |
|---|---|---|
| Growth | Blob size | Cell radius / node spacing |
| | Excitability | Division and node-insertion rate |
| | Inflation | Outward pressure on colonies and loops |
| | Stiffness | How strongly neighbours hold together |
| | Chaos | Jitter on everything |
| | Speed | Simulation steps per frame |
| Brush | Brush size · Line weight | Painting radius · stroke width |
| Style | Palette | `Cobalt` · `Digidelic` · `Spore` · `Bone` |
| | Format | 1:1 · 4:5 · 16:9 |
| | Bloom · Solid cells · Cursor ring | Additive glow · filled instead of ringed cells · pointer readout |

`e` = export PNG, `f` = freeze, `c` = clear.

## Export

- `▶ Export PNG` — the dish at its full format size
- `⏺ Rec 6s` — 6-second WebM of the colony growing via `MediaRecorder`

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

## Saving a dish

A painted dish cannot be reproduced from a seed the way a seeded
generator can, so **⤓ Dish** writes the culture itself — every cell and
filament, plus the studio settings — to a small JSON file, and **⤒ Open**
reads one back. A `.json` dish dropped straight onto the canvas loads
too. This is the tool's equivalent of a permalink.

## Timelapse

**◷ Lapse** samples one frame every 700ms for 48 frames — roughly 34
seconds of growth packed into a ~4 second loop. Growth in this tool
unfolds over a much longer arc than the 3s GIF capture assumes, so the
slow sample is what actually shows a colony developing.
