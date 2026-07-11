# digidelic UI Kit — Tailwind

Tailwind build of the digidelic system.

## Files
- `index.html` — CDN showcase + usage docs (palette, buttons, cards w/ texture overlays, badges)
- `../../tailwind.config.js` — the real config to drop into a project

## Usage
1. Copy `tailwind.config.js` into your project (or paste its `theme.extend`).
2. Tokens map to standard utilities: `bg-coral`, `text-sky`, `border-teal`, `font-display`, `font-mono`.
3. Radius is globally reset to `0`.
4. Motif/texture/glitch classes live in an `@layer utilities` block — see `index.html` and `glitch.css`.

## Palette v2.1
Neon heroes (yellow/pink/green/cyan/blue/magenta/orange/lime) + duotone layer (coral `#ff6050`, sky `#0a84e0`, teal `#12b39b`) sampled from the flower/halftone refs.
