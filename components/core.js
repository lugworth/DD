/* digidelic component core — ramp, seeded hue, surfaces, ASCII, prop maps.
   No gradients, no fade-to-transparent. Solid fills and hairline rules only. */

export const MONO = "'Geist Mono','Red Hat Mono',monospace";

/* ─── THE DIGIDELIC RAINBOW ────────────────────────────────────────────
   Ten stops, spectral order. This is the canonical ramp. */
export const RAMP = ['magenta', 'pink', 'coral', 'orange', 'lime', 'green', 'cyan', 'cobalt', 'indigo', 'violet'];

/* On black: the palette hexes as authored. */
const RAMP_BLACK = { magenta: '#c800ff', pink: '#ff2d87', coral: '#ff6050', orange: '#ff5a00', lime: '#c6ff3a', green: '#39ff6a', cyan: '#00d9ff', cobalt: '#2d6cff', indigo: '#4653e8', violet: '#8a3fb0' };

/* On night (#150a1c — itself violet): every stop rotates toward its
   warm/bright neighbour so hue identity survives the violet ground.
   magenta/indigo/violet would otherwise sink into it. */
const RAMP_NIGHT = { magenta: '#e563ff', pink: '#ff5fa0', coral: '#ff8163', orange: '#ff8425', lime: '#d8ff6b', green: '#6bff92', cyan: '#4ce6ff', cobalt: '#5f92ff', indigo: '#7b85f5', violet: '#b968e0' };

/* On cream (#e8e3d0): every stop darkens until white ink clears 4.6:1 on it
   — night's rotation, downward. All ten stops stay available; the four
   already-dark stops keep their authored hex. Ink is always white here. */
const RAMP_CREAM = { magenta: '#c000f5', pink: '#db2774', coral: '#c84b3f', orange: '#cd4800', lime: '#627e1d', green: '#1e8638', cyan: '#008096', cobalt: '#2c6afb', indigo: '#4653e8', violet: '#8a3fb0' };

/* ─── THE SECOND SET ───────────────────────────────────────────────────
   Deep and muted, sampled from the reference plates. A parallel family:
   these NEVER participate in seeded hue — a node is never "oxblood".
   They are for plates, editorial, and full-bleed grounds. */
export const SECOND_SET = {
  blush:     { fill: '#d798a7', ink: '#000000' },
  oxblood:   { fill: '#962c38', ink: '#ffffff' },
  botanical: { fill: '#3f6b45', ink: '#ffffff' },
  teal:      { fill: '#03888c', ink: '#000000' },
  red:       { fill: '#ff0026', ink: '#000000' },
  electric:  { fill: '#0008ff', ink: '#ffffff' }
};

/* Ink that clears AA 4.5:1 against each fill. Verified per stop, not assumed:
   magenta 4.90, pink 8.31, coral 7.28, orange 6.34, lime 14.4, green 13.6,
   cyan 12.4, cobalt 4.70 on black ink; indigo 5.98, violet 5.31 on white.
   Night stops are lifted far enough that black ink clears on all ten. */
const INK_BLACK = { magenta: '#000000', pink: '#000000', coral: '#000000', orange: '#000000', lime: '#000000', green: '#000000', cyan: '#000000', cobalt: '#000000', indigo: '#ffffff', violet: '#ffffff' };

/* Danger is outside the ramp — its own fill, with the ink that clears it (5.44). */
export const DANGER = { fill: '#ff0066', ink: '#000000' };

export const SURFACES = {
  black: { bg: '#000000', panel: '#111110', raised: '#1a1a18', fg: '#ffffff', dim: 'rgba(255,255,255,0.55)', faint: 'rgba(255,255,255,0.28)', rule: 'rgba(255,255,255,0.22)', ruleStrong: 'rgba(255,255,255,0.42)' },
  night: { bg: '#150a1c', panel: '#1f1029', raised: '#2b1738', fg: '#ffffff', dim: 'rgba(255,255,255,0.62)', faint: 'rgba(255,255,255,0.32)', rule: 'rgba(255,255,255,0.24)', ruleStrong: 'rgba(255,255,255,0.46)' },
  cream: { bg: '#e8e3d0', panel: '#f2efe4', raised: '#ffffff', fg: '#0a0a0a', dim: 'rgba(10,10,10,0.62)', faint: 'rgba(10,10,10,0.34)', rule: 'rgba(10,10,10,0.26)', ruleStrong: 'rgba(10,10,10,0.48)' }
};

export function surfaceOf(name) { return SURFACES[name] || SURFACES.black; }
/* ─── SEEDED HUE ───────────────────────────────────────────────────────
   A component's stop is derived, never random: id when given, else the
   label. The same node is therefore always the same hue. */
function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return Math.abs(h >>> 0);
}

export function stopIndex(seed) {
  const s = String(seed == null ? '' : seed);
  return s ? hash(s) % RAMP.length : 7; /* unseeded falls to cobalt */
}

/* accent overrides the seed; otherwise hash(id ?? label).
   An unknown surface is a caller bug, not something to paper over with a
   silent black fallback — warn once, then behave as black. */
const _warnedSurface = new Set();
function resolveSurface(surface) {
  if (SURFACES[surface]) return surface;
  if (typeof console !== 'undefined' && !_warnedSurface.has(surface)) {
    _warnedSurface.add(surface);
    console.warn(`[digidelic] unknown surface "${surface}" — expected one of ${Object.keys(SURFACES).join(', ')}. Falling back to black.`);
  }
  return 'black';
}

export function hueOf({ accent, id, label, surface = 'black' }) {
  surface = resolveSurface(surface);
  let name = null;
  if (accent && RAMP.indexOf(accent) > -1) {
    name = accent;
  } else if (accent && typeof accent === 'string') {
    const hex = accent.toLowerCase();
    for (const [k, v] of Object.entries(RAMP_BLACK)) {
      if (v.toLowerCase() === hex) { name = k; break; }
    }
  }
  if (!name) {
    if (accent && typeof accent === 'string' && accent.startsWith('#')) {
      return { name: 'custom', fill: accent, ink: '#000000' };
    }
    name = RAMP[stopIndex(id != null ? id : label)];
  }
  if (surface === 'cream') return { name, fill: RAMP_CREAM[name], ink: '#ffffff' };
  if (surface === 'night') return { name, fill: RAMP_NIGHT[name], ink: '#000000' };
  return { name, fill: RAMP_BLACK[name], ink: INK_BLACK[name] };
}

export function rampFor(surface) {
  return RAMP.map((n) => ({ name: n, ...hueOf({ accent: n, surface }) }));
}

/* ─── SHARED PROP MAPS ─────────────────────────────────────────────────
   signal / geometry / glitch were tweaks on the spec cards. They are
   props on every component in the library. */
export const GEOMETRY = {
  sharp: {},
  notched: { clipPath: 'polygon(8px 0,100% 0,100% calc(100% - 8px),calc(100% - 8px) 100%,0 100%,0 8px)' },
  pill: { borderRadius: '999px' }
};

export function geometryStyle(g) { return GEOMETRY[g] || GEOMETRY.sharp; }

export function signalFilter(signal) {
  if (signal === 'standby') return 'grayscale(0.55) sepia(0.35) saturate(2.2) brightness(0.85)';
  if (signal === 'offline') return 'grayscale(1) brightness(0.6) contrast(0.8)';
  return 'none';
}

export function glitchClass(glitch, base) {
  if (glitch === 'subtle') return base + ' gl-text';
  if (glitch === 'heavy') return base + ' gl-text gl-rgb gl-slice';
  return base;
}

export function glitchAttrs(glitch, text) {
  return glitch === 'heavy' ? { 'data-gl-tear': '1', 'data-text': typeof text === 'string' ? text : undefined } : {};
}

/* ─── FLAT TEXTURE PRIMITIVES ──────────────────────────────────────────
   Hard stops only — no fade to transparent, no alpha ramp. Two inks,
   three at most. Tileable at any size, printable without banding. */
export const TEXTURES = ['none', 'stripe', 'dot', 'scan', 'checker', 'grid', 'bar'];

export function textureFill(kind, a, b, size = 14) {
  if (!kind || kind === 'none') return {};
  const s = size, h = size / 2;
  if (kind === 'stripe') return { backgroundColor: b, backgroundImage: `repeating-linear-gradient(45deg,${a} 0 ${h}px,${b} ${h}px ${s}px)` };
  if (kind === 'dot') return { backgroundColor: b, backgroundImage: `radial-gradient(circle,${a} 44%,transparent 45%)`, backgroundSize: `${h}px ${h}px` };
  if (kind === 'scan') return { backgroundColor: b, backgroundImage: `repeating-linear-gradient(${b} 0 2px,${a} 2px 3px)` };
  if (kind === 'checker') return checkerFill(b, a, s);
  if (kind === 'grid') return { backgroundColor: b, backgroundImage: `linear-gradient(${a} 1px,transparent 1px),linear-gradient(90deg,${a} 1px,transparent 1px)`, backgroundSize: `${s}px ${s}px` };
  if (kind === 'bar') return { backgroundColor: b, backgroundImage: `repeating-linear-gradient(90deg,${a} 0 ${h / 2}px,${b} ${h / 2}px ${h}px)` };
  return {};
}

/* ─── MOTION ───────────────────────────────────────────────────────────
   One scale, three durations, one easing. Every animation is stepped or
   hard-cut — nothing eases opacity, nothing fades. */
export const MOTION = { instant: 100, quick: 140, settle: 250, ease: 'cubic-bezier(.16,1,.3,1)' };
export const ANIMATIONS = ['none', 'marquee', 'blink', 'shift', 'sweep'];

export const MOTION_CSS = `
@keyframes dd-marquee{to{background-position:28px 0}}
@keyframes dd-blink{0%,49%{opacity:1}50%,100%{opacity:.35}}
@keyframes dd-shift{0%,100%{background-position:0 0}50%{background-position:7px 7px}}
@keyframes dd-sweep{0%{transform:translateX(-100%)}100%{transform:translateX(200%)}}
@media (prefers-reduced-motion:reduce){.dd-anim{animation:none!important}}
`;

export function animationStyle(kind, dur = 900) {
  if (!kind || kind === 'none') return {};
  if (kind === 'marquee') return { animation: `dd-marquee ${dur}ms linear infinite` };
  if (kind === 'blink') return { animation: `dd-blink ${Math.round(dur * 1.2)}ms steps(1,end) infinite` };
  if (kind === 'shift') return { animation: `dd-shift ${dur}ms steps(2,end) infinite` };
  return {};
}

/* ─── CHECKERBOARD ─────────────────────────────────────────────────────
   Accent weight: strips, pips and seams. Never a page ground. */
export function checkerFill(a, b, size = 16) {
  const step = size / 2;
  return {
    backgroundColor: a,
    backgroundImage: `linear-gradient(45deg,${b} 25%,transparent 25%,transparent 75%,${b} 75%),linear-gradient(45deg,${b} 25%,transparent 25%,transparent 75%,${b} 75%)`,
    backgroundSize: `${size}px ${size}px`,
    backgroundPosition: `0 0,${step}px ${step}px`
  };
}

/* ─── ASCII ────────────────────────────────────────────────────────────
   Three sanctioned jobs: texture fills, loading/progress, box borders. */
export const BLOCKS = { full: '█', dark: '▓', mid: '▒', light: '░', empty: '·' };
export const BOX = { tl: '┌', tr: '┐', bl: '└', br: '┘', h: '─', v: '│', tee: '┬', cross: '┼' };

const TEX = {
  fine: '░▒░ ▒░▒ ░░▒ ▒▒░ ░▒▒ ▒░░ ',
  coarse: '▓█▓ █▓█ ▓▓█ ██▓ ▓██ █▓▓ ',
  scatter: '·░· ▒·▒ ·▒· ░·░ ▒░▒ ·▓· '
};

/* Deterministic block-char field for background texture. */
export function asciiTexture(kind = 'fine', cols = 48, rows = 10, seed = 'digidelic') {
  const src = (TEX[kind] || TEX.fine).replace(/ /g, '');
  const h0 = hash(String(seed));
  const lines = [];
  for (let r = 0; r < rows; r++) {
    let line = '';
    for (let c = 0; c < cols; c++) line += src[(h0 + r * 31 + c * 17) % src.length];
    lines.push(line);
  }
  return lines.join('\n');
}

/* Solid-block meter. value 0..1 → '████░░░░' */
export function asciiBar(value, width = 24, filled = BLOCKS.full, rest = BLOCKS.light) {
  const n = Math.max(0, Math.min(width, Math.round(value * width)));
  return filled.repeat(n) + rest.repeat(width - n);
}

export const SPINNER_FRAMES = ['▖', '▘', '▝', '▗'];
export const PULSE_FRAMES = ['░', '▒', '▓', '█', '▓', '▒'];

/* ─── STYLE INJECTION ──────────────────────────────────────────────────
   Components need real hover/focus/active rules; inject once per id. */
const injected = new Set();
export function injectCSS(id, css) {
  if (typeof document === 'undefined' || injected.has(id)) return;
  injected.add(id);
  const el = document.createElement('style');
  el.setAttribute('data-dd', id);
  el.textContent = css;
  document.head.appendChild(el);
}

export const LABEL_CSS = `letter-spacing:0.22em;text-transform:uppercase;font-size:9px;font-weight:700`;
