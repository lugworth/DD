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
