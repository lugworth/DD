# digidelic × shadcn/ui

A complete shadcn/ui theme mapped onto the digidelic v2.1 design system.

shadcn/ui isn't a dependency you `import` — it's a generator that copies component source into your repo, themed entirely through CSS variables. This kit supplies that theme layer plus a no-build showcase of every primitive re-skinned to digidelic.

## Files

| File | What it is |
|---|---|
| `globals.css` | The theme. shadcn's full CSS-variable contract (`--primary`, `--card`, `--destructive`, `--ring`, `--chart-1..5`, `--sidebar-*`) mapped to digidelic tokens, in oklch, Tailwind-v4 `@theme inline` format. **This is the artifact you copy into a real project.** |
| `index.html` | No-build showcase — Button (all variants/sizes), Card, Form (input/select/textarea/switch/checkbox/radio), Tabs, Dialog, Alert, Badge, Table, Avatar, Slider, Progress, Skeleton — all themed. |

## Use in a real shadcn project (Tailwind v4 / shadcn 2025)

```bash
npx shadcn@latest init        # Base color: Neutral · CSS variables: Yes
```

1. Replace the `:root` block in `app/globals.css` with the one from `globals.css` here (digidelic is dark-only, so `:root` already carries the dark values; `.dark` just sets `color-scheme`).
2. Keep the `@theme inline` and `@layer base` blocks — they wire the tokens to Tailwind utilities and enforce the zero-radius + uppercase-display rules.
3. Load fonts **Geist Mono** (UI/mono) and **Space Grotesk** (display).
4. Add components as normal: `npx shadcn@latest add button card input tabs dialog badge …` — they inherit the theme with no per-component edits.

## Theme decisions

- **Zero radius.** `--radius: 0` and a base rule force every `rounded-*` to `0` — digidelic has no soft corners.
- **Primary = acid yellow `#eaff00` with black ink.** Matches the system's primary-action rule (text on color always flips to black).
- **Destructive = hot pink `#ff0066`.**
- **Surfaces** climb near-black → `#0a0a0a` bg → `#111110` card → `#1a1a18` popover/secondary.
- **Focus ring** is yellow, 2px, offset — no glow.
- **Charts** use the neon set (yellow / cyan / pink / sky / teal).
- **Extensions** beyond stock shadcn: `--dd-coral`, `--dd-sky`, `--dd-teal`, `--dd-lime`, `--dd-orange`, `--dd-green`, exposed as `bg-coral` / `text-teal` etc. via `@theme inline`.
- **Motifs** the showcase demonstrates: coral×sky checker (button + masthead), flower-duotone texture overlay on cards, cross-grid header texture.

## Note

The showcase is hand-rolled HTML/CSS mirroring shadcn's exact class structure and variable contract so it renders with no build step. In a real project the same tokens drive the actual Radix-based shadcn components.
