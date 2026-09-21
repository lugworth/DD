/* @ds-bundle: {"format":4,"namespace":"DigidelicDesignSystem_da5439","components":[{"name":"Badge","sourcePath":"components/Badge/Badge.jsx"},{"name":"BadgeCount","sourcePath":"components/Badge/Badge.jsx"},{"name":"BadgeRow","sourcePath":"components/Badge/Badge.jsx"},{"name":"Button","sourcePath":"components/Button/Button.jsx"},{"name":"ButtonRow","sourcePath":"components/Button/Button.jsx"},{"name":"Card","sourcePath":"components/Card/Card.jsx"},{"name":"CardSection","sourcePath":"components/Card/Card.jsx"},{"name":"CardGrid","sourcePath":"components/Card/Card.jsx"},{"name":"Field","sourcePath":"components/Field/Field.jsx"},{"name":"Input","sourcePath":"components/Field/Field.jsx"},{"name":"Select","sourcePath":"components/Field/Field.jsx"},{"name":"Checkbox","sourcePath":"components/Field/Field.jsx"},{"name":"NodeCard","sourcePath":"components/NodeCard/NodeCard.jsx"},{"name":"SectorCard","sourcePath":"components/NodeCard/NodeCard.jsx"},{"name":"StatCard","sourcePath":"components/NodeCard/NodeCard.jsx"},{"name":"NodeMeter","sourcePath":"components/NodeCard/NodeCard.jsx"},{"name":"Progress","sourcePath":"components/Progress/Progress.jsx"},{"name":"ProgressSegments","sourcePath":"components/Progress/Progress.jsx"},{"name":"ProgressStack","sourcePath":"components/Progress/Progress.jsx"},{"name":"ProgressAscii","sourcePath":"components/Progress/Progress.jsx"},{"name":"Spinner","sourcePath":"components/Progress/Progress.jsx"},{"name":"MONO","sourcePath":"components/core.js"},{"name":"RAMP","sourcePath":"components/core.js"},{"name":"SECOND_SET","sourcePath":"components/core.js"},{"name":"DANGER","sourcePath":"components/core.js"},{"name":"SURFACES","sourcePath":"components/core.js"},{"name":"GEOMETRY","sourcePath":"components/core.js"},{"name":"TEXTURES","sourcePath":"components/core.js"},{"name":"MOTION","sourcePath":"components/core.js"},{"name":"ANIMATIONS","sourcePath":"components/core.js"},{"name":"MOTION_CSS","sourcePath":"components/core.js"},{"name":"BLOCKS","sourcePath":"components/core.js"},{"name":"BOX","sourcePath":"components/core.js"},{"name":"SPINNER_FRAMES","sourcePath":"components/core.js"},{"name":"PULSE_FRAMES","sourcePath":"components/core.js"},{"name":"LABEL_CSS","sourcePath":"components/core.js"}],"sourceHashes":{"components/Badge/Badge.jsx":"eb82d18bd174","components/Button/Button.jsx":"edc904e4c6fa","components/Card/Card.jsx":"612f273ccc6d","components/Field/Field.jsx":"86f8467417c5","components/NodeCard/NodeCard.jsx":"ce2a26aca7e3","components/Progress/Progress.jsx":"b76baea2ac8e","components/core.js":"dfffff862d94","glitch.js":"6808173b5415","tailwind.config.js":"9fe3bdfa79f1","tweaks-panel.jsx":"d259e3a86f73","ui_kits/pantry/data.js":"07ead0798fde","ui_kits/pantry/ui.jsx":"0b0ce058fc0b","ui_kits/pantry/views-a.jsx":"1b226f594cb0","ui_kits/pantry/views-b.jsx":"a75a066a8393"},"inlinedExternals":[],"unexposedExports":[{"name":"animationStyle","sourcePath":"components/core.js"},{"name":"asciiBar","sourcePath":"components/core.js"},{"name":"asciiTexture","sourcePath":"components/core.js"},{"name":"checkerFill","sourcePath":"components/core.js"},{"name":"geometryStyle","sourcePath":"components/core.js"},{"name":"glitchAttrs","sourcePath":"components/core.js"},{"name":"glitchClass","sourcePath":"components/core.js"},{"name":"hueOf","sourcePath":"components/core.js"},{"name":"injectCSS","sourcePath":"components/core.js"},{"name":"rampFor","sourcePath":"components/core.js"},{"name":"signalFilter","sourcePath":"components/core.js"},{"name":"stopIndex","sourcePath":"components/core.js"},{"name":"surfaceOf","sourcePath":"components/core.js"},{"name":"textureFill","sourcePath":"components/core.js"}]} */

(() => {

const __ds_ns = (window.DigidelicDesignSystem_da5439 = window.DigidelicDesignSystem_da5439 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core.js
try { (() => {
/* digidelic component core — ramp, seeded hue, surfaces, ASCII, prop maps.
   No gradients, no fade-to-transparent. Solid fills and hairline rules only. */

const MONO = "'Geist Mono','Red Hat Mono',monospace";

/* ─── THE DIGIDELIC RAINBOW ────────────────────────────────────────────
   Ten stops, spectral order. This is the canonical ramp. */
const RAMP = ['magenta', 'pink', 'coral', 'orange', 'lime', 'green', 'cyan', 'cobalt', 'indigo', 'violet'];

/* On black: the palette hexes as authored. */
const RAMP_BLACK = {
  magenta: '#c800ff',
  pink: '#ff2d87',
  coral: '#ff6050',
  orange: '#ff5a00',
  lime: '#c6ff3a',
  green: '#39ff6a',
  cyan: '#00d9ff',
  cobalt: '#2d6cff',
  indigo: '#4653e8',
  violet: '#8a3fb0'
};

/* On night (#150a1c — itself violet): every stop rotates toward its
   warm/bright neighbour so hue identity survives the violet ground.
   magenta/indigo/violet would otherwise sink into it. */
const RAMP_NIGHT = {
  magenta: '#e563ff',
  pink: '#ff5fa0',
  coral: '#ff8163',
  orange: '#ff8425',
  lime: '#d8ff6b',
  green: '#6bff92',
  cyan: '#4ce6ff',
  cobalt: '#5f92ff',
  indigo: '#7b85f5',
  violet: '#b968e0'
};

/* On cream (#e8e3d0): every stop darkens until white ink clears 4.6:1 on it
   — night's rotation, downward. All ten stops stay available; the four
   already-dark stops keep their authored hex. Ink is always white here. */
const RAMP_CREAM = {
  magenta: '#c000f5',
  pink: '#db2774',
  coral: '#c84b3f',
  orange: '#cd4800',
  lime: '#627e1d',
  green: '#1e8638',
  cyan: '#008096',
  cobalt: '#2c6afb',
  indigo: '#4653e8',
  violet: '#8a3fb0'
};

/* ─── THE SECOND SET ───────────────────────────────────────────────────
   Deep and muted, sampled from the reference plates. A parallel family:
   these NEVER participate in seeded hue — a node is never "oxblood".
   They are for plates, editorial, and full-bleed grounds. */
const SECOND_SET = {
  blush: {
    fill: '#d798a7',
    ink: '#000000'
  },
  oxblood: {
    fill: '#962c38',
    ink: '#ffffff'
  },
  botanical: {
    fill: '#3f6b45',
    ink: '#ffffff'
  },
  teal: {
    fill: '#03888c',
    ink: '#000000'
  },
  red: {
    fill: '#ff0026',
    ink: '#000000'
  },
  electric: {
    fill: '#0008ff',
    ink: '#ffffff'
  }
};

/* Ink that clears AA 4.5:1 against each fill. Verified per stop, not assumed:
   magenta 4.90, pink 8.31, coral 7.28, orange 6.34, lime 14.4, green 13.6,
   cyan 12.4, cobalt 4.70 on black ink; indigo 5.98, violet 5.31 on white.
   Night stops are lifted far enough that black ink clears on all ten. */
const INK_BLACK = {
  magenta: '#000000',
  pink: '#000000',
  coral: '#000000',
  orange: '#000000',
  lime: '#000000',
  green: '#000000',
  cyan: '#000000',
  cobalt: '#000000',
  indigo: '#ffffff',
  violet: '#ffffff'
};

/* Danger is outside the ramp — its own fill, with the ink that clears it (5.44). */
const DANGER = {
  fill: '#ff0066',
  ink: '#000000'
};
const SURFACES = {
  black: {
    bg: '#000000',
    panel: '#111110',
    raised: '#1a1a18',
    fg: '#ffffff',
    dim: 'rgba(255,255,255,0.55)',
    faint: 'rgba(255,255,255,0.28)',
    rule: 'rgba(255,255,255,0.22)',
    ruleStrong: 'rgba(255,255,255,0.42)'
  },
  night: {
    bg: '#150a1c',
    panel: '#1f1029',
    raised: '#2b1738',
    fg: '#ffffff',
    dim: 'rgba(255,255,255,0.62)',
    faint: 'rgba(255,255,255,0.32)',
    rule: 'rgba(255,255,255,0.24)',
    ruleStrong: 'rgba(255,255,255,0.46)'
  },
  cream: {
    bg: '#e8e3d0',
    panel: '#f2efe4',
    raised: '#ffffff',
    fg: '#0a0a0a',
    dim: 'rgba(10,10,10,0.62)',
    faint: 'rgba(10,10,10,0.34)',
    rule: 'rgba(10,10,10,0.26)',
    ruleStrong: 'rgba(10,10,10,0.48)'
  }
};
function surfaceOf(name) {
  return SURFACES[name] || SURFACES.black;
}
/* ─── SEEDED HUE ───────────────────────────────────────────────────────
   A component's stop is derived, never random: id when given, else the
   label. The same node is therefore always the same hue. */
function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h >>> 0);
}
function stopIndex(seed) {
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
function hueOf({
  accent,
  id,
  label,
  surface = 'black'
}) {
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
  if (surface === 'cream') return {
    name,
    fill: RAMP_CREAM[name],
    ink: '#ffffff'
  };
  if (surface === 'night') return {
    name,
    fill: RAMP_NIGHT[name],
    ink: '#000000'
  };
  return {
    name,
    fill: RAMP_BLACK[name],
    ink: INK_BLACK[name]
  };
}
function rampFor(surface) {
  return RAMP.map(n => ({
    name: n,
    ...hueOf({
      accent: n,
      surface
    })
  }));
}

/* ─── SHARED PROP MAPS ─────────────────────────────────────────────────
   signal / geometry / glitch were tweaks on the spec cards. They are
   props on every component in the library. */
const GEOMETRY = {
  sharp: {},
  notched: {
    clipPath: 'polygon(8px 0,100% 0,100% calc(100% - 8px),calc(100% - 8px) 100%,0 100%,0 8px)'
  },
  pill: {
    borderRadius: '999px'
  }
};
function geometryStyle(g) {
  return GEOMETRY[g] || GEOMETRY.sharp;
}
function signalFilter(signal) {
  if (signal === 'standby') return 'grayscale(0.55) sepia(0.35) saturate(2.2) brightness(0.85)';
  if (signal === 'offline') return 'grayscale(1) brightness(0.6) contrast(0.8)';
  return 'none';
}
function glitchClass(glitch, base) {
  if (glitch === 'subtle') return base + ' gl-text';
  if (glitch === 'heavy') return base + ' gl-text gl-rgb gl-slice';
  return base;
}
function glitchAttrs(glitch, text) {
  return glitch === 'heavy' ? {
    'data-gl-tear': '1',
    'data-text': typeof text === 'string' ? text : undefined
  } : {};
}

/* ─── FLAT TEXTURE PRIMITIVES ──────────────────────────────────────────
   Hard stops only — no fade to transparent, no alpha ramp. Two inks,
   three at most. Tileable at any size, printable without banding. */
const TEXTURES = ['none', 'stripe', 'dot', 'scan', 'checker', 'grid', 'bar'];
function textureFill(kind, a, b, size = 14) {
  if (!kind || kind === 'none') return {};
  const s = size,
    h = size / 2;
  if (kind === 'stripe') return {
    backgroundColor: b,
    backgroundImage: `repeating-linear-gradient(45deg,${a} 0 ${h}px,${b} ${h}px ${s}px)`
  };
  if (kind === 'dot') return {
    backgroundColor: b,
    backgroundImage: `radial-gradient(circle,${a} 44%,transparent 45%)`,
    backgroundSize: `${h}px ${h}px`
  };
  if (kind === 'scan') return {
    backgroundColor: b,
    backgroundImage: `repeating-linear-gradient(${b} 0 2px,${a} 2px 3px)`
  };
  if (kind === 'checker') return checkerFill(b, a, s);
  if (kind === 'grid') return {
    backgroundColor: b,
    backgroundImage: `linear-gradient(${a} 1px,transparent 1px),linear-gradient(90deg,${a} 1px,transparent 1px)`,
    backgroundSize: `${s}px ${s}px`
  };
  if (kind === 'bar') return {
    backgroundColor: b,
    backgroundImage: `repeating-linear-gradient(90deg,${a} 0 ${h / 2}px,${b} ${h / 2}px ${h}px)`
  };
  return {};
}

/* ─── MOTION ───────────────────────────────────────────────────────────
   One scale, three durations, one easing. Every animation is stepped or
   hard-cut — nothing eases opacity, nothing fades. */
const MOTION = {
  instant: 100,
  quick: 140,
  settle: 250,
  ease: 'cubic-bezier(.16,1,.3,1)'
};
const ANIMATIONS = ['none', 'marquee', 'blink', 'shift', 'sweep'];
const MOTION_CSS = `
@keyframes dd-marquee{to{background-position:28px 0}}
@keyframes dd-blink{0%,49%{opacity:1}50%,100%{opacity:.35}}
@keyframes dd-shift{0%,100%{background-position:0 0}50%{background-position:7px 7px}}
@keyframes dd-sweep{0%{transform:translateX(-100%)}100%{transform:translateX(200%)}}
@media (prefers-reduced-motion:reduce){.dd-anim{animation:none!important}}
`;
function animationStyle(kind, dur = 900) {
  if (!kind || kind === 'none') return {};
  if (kind === 'marquee') return {
    animation: `dd-marquee ${dur}ms linear infinite`
  };
  if (kind === 'blink') return {
    animation: `dd-blink ${Math.round(dur * 1.2)}ms steps(1,end) infinite`
  };
  if (kind === 'shift') return {
    animation: `dd-shift ${dur}ms steps(2,end) infinite`
  };
  return {};
}

/* ─── CHECKERBOARD ─────────────────────────────────────────────────────
   Accent weight: strips, pips and seams. Never a page ground. */
function checkerFill(a, b, size = 16) {
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
const BLOCKS = {
  full: '█',
  dark: '▓',
  mid: '▒',
  light: '░',
  empty: '·'
};
const BOX = {
  tl: '┌',
  tr: '┐',
  bl: '└',
  br: '┘',
  h: '─',
  v: '│',
  tee: '┬',
  cross: '┼'
};
const TEX = {
  fine: '░▒░ ▒░▒ ░░▒ ▒▒░ ░▒▒ ▒░░ ',
  coarse: '▓█▓ █▓█ ▓▓█ ██▓ ▓██ █▓▓ ',
  scatter: '·░· ▒·▒ ·▒· ░·░ ▒░▒ ·▓· '
};

/* Deterministic block-char field for background texture. */
function asciiTexture(kind = 'fine', cols = 48, rows = 10, seed = 'digidelic') {
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
function asciiBar(value, width = 24, filled = BLOCKS.full, rest = BLOCKS.light) {
  const n = Math.max(0, Math.min(width, Math.round(value * width)));
  return filled.repeat(n) + rest.repeat(width - n);
}
const SPINNER_FRAMES = ['▖', '▘', '▝', '▗'];
const PULSE_FRAMES = ['░', '▒', '▓', '█', '▓', '▒'];

/* ─── STYLE INJECTION ──────────────────────────────────────────────────
   Components need real hover/focus/active rules; inject once per id. */
const injected = new Set();
function injectCSS(id, css) {
  if (typeof document === 'undefined' || injected.has(id)) return;
  injected.add(id);
  const el = document.createElement('style');
  el.setAttribute('data-dd', id);
  el.textContent = css;
  document.head.appendChild(el);
}
const LABEL_CSS = `letter-spacing:0.22em;text-transform:uppercase;font-size:9px;font-weight:700`;
Object.assign(__ds_scope, { MONO, RAMP, SECOND_SET, DANGER, SURFACES, surfaceOf, stopIndex, hueOf, rampFor, GEOMETRY, geometryStyle, signalFilter, glitchClass, glitchAttrs, TEXTURES, textureFill, MOTION, ANIMATIONS, MOTION_CSS, animationStyle, checkerFill, BLOCKS, BOX, asciiTexture, asciiBar, SPINNER_FRAMES, PULSE_FRAMES, injectCSS, LABEL_CSS });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core.js", error: String((e && e.message) || e) }); }

// components/Badge/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
__ds_scope.injectCSS('dd-badge', `
.dd-badge{display:inline-flex;align-items:center;gap:5px;font-family:${__ds_scope.MONO};font-weight:700;text-transform:uppercase;border:1px solid transparent;white-space:nowrap;vertical-align:middle}
.dd-badge-pip{width:5px;height:5px;background:currentColor;flex:none}
.dd-badge-dot{width:6px;height:6px;flex:none;border-radius:999px}
`);
const SIZES = {
  sm: {
    height: 16,
    fontSize: 8,
    padding: '0 5px',
    letterSpacing: '0.16em'
  },
  md: {
    height: 20,
    fontSize: 9,
    padding: '0 7px',
    letterSpacing: '0.18em'
  },
  lg: {
    height: 26,
    fontSize: 11,
    padding: '0 10px',
    letterSpacing: '0.18em'
  }
};

/* Status is the one place hue is NOT seeded — an operator reads colour as
   meaning here, so live/warn/down/idle map to fixed stops. */
const STATUS = {
  ok: {
    accent: 'green'
  },
  warn: {
    accent: 'orange'
  },
  down: {
    danger: true
  },
  idle: {
    quiet: true
  }
};
function Badge({
  children,
  label,
  id,
  accent,
  status,
  variant = 'solid',
  size = 'md',
  surface = 'black',
  signal = 'live',
  geometry = 'sharp',
  glitch = 'off',
  pip = false,
  dot = false,
  checker = false,
  count,
  className = '',
  style,
  ...rest
}) {
  const s = __ds_scope.surfaceOf(surface);
  const text = label != null ? label : children;
  const st = status ? STATUS[status] : null;
  const isDanger = variant === 'danger' || st && st.danger;
  const isQuiet = variant === 'quiet' || st && st.quiet;
  const hue = __ds_scope.hueOf({
    accent: st && st.accent || accent,
    id,
    label: typeof text === 'string' ? text : label,
    surface
  });
  const sz = SIZES[size] || SIZES.md;
  let skin;
  if (isDanger) skin = {
    background: __ds_scope.DANGER.fill,
    color: __ds_scope.DANGER.ink,
    borderColor: __ds_scope.DANGER.fill
  };else if (isQuiet) skin = {
    background: 'transparent',
    color: s.dim,
    borderColor: s.rule
  };else if (variant === 'ghost') skin = {
    background: 'transparent',
    color: hue.fill,
    borderColor: hue.fill
  };else skin = {
    background: hue.fill,
    color: hue.ink,
    borderColor: hue.fill
  };
  const seam = checker ? {
    ...__ds_scope.checkerFill(isQuiet ? s.rule : hue.ink, isQuiet ? s.bg : hue.fill, 8),
    width: 10,
    alignSelf: 'stretch',
    flex: 'none',
    marginLeft: -1
  } : null;
  return /*#__PURE__*/React.createElement("span", _extends({
    className: __ds_scope.glitchClass(glitch, 'dd-badge ' + className)
  }, __ds_scope.glitchAttrs(glitch, text), {
    style: {
      height: sz.height,
      fontSize: sz.fontSize,
      letterSpacing: sz.letterSpacing,
      padding: checker ? 0 : sz.padding,
      ...skin,
      ...__ds_scope.geometryStyle(geometry),
      filter: __ds_scope.signalFilter(signal),
      ...style
    }
  }, rest), seam ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: seam
  }) : null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      padding: checker ? sz.padding : 0
    }
  }, dot ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    className: "dd-badge-dot",
    style: {
      background: isQuiet ? s.dim : 'currentColor'
    }
  }) : null, pip ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    className: "dd-badge-pip"
  }) : null, text, count != null ? /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: 0.62,
      fontVariantNumeric: 'tabular-nums'
    }
  }, count) : null));
}

/* Numeric-only chip. Tabular figures so a column of counts aligns. */
function BadgeCount({
  value,
  id,
  accent,
  surface = 'black',
  size = 'md',
  geometry = 'sharp',
  style,
  ...rest
}) {
  const hue = __ds_scope.hueOf({
    accent,
    id,
    label: String(value),
    surface
  });
  const sz = SIZES[size] || SIZES.md;
  return /*#__PURE__*/React.createElement("span", _extends({
    className: "dd-badge",
    style: {
      minWidth: sz.height,
      height: sz.height,
      fontSize: sz.fontSize,
      letterSpacing: 0,
      justifyContent: 'center',
      padding: '0 4px',
      fontVariantNumeric: 'tabular-nums',
      background: hue.fill,
      color: hue.ink,
      borderColor: hue.fill,
      ...__ds_scope.geometryStyle(geometry),
      ...style
    }
  }, rest), value);
}
function BadgeRow({
  children,
  gap = 6,
  wrap = true,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap,
      flexWrap: wrap ? 'wrap' : 'nowrap',
      alignItems: 'center',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Badge, BadgeCount, BadgeRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Badge/Badge.jsx", error: String((e && e.message) || e) }); }

// components/Button/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
__ds_scope.injectCSS('dd-motion', __ds_scope.MOTION_CSS);
__ds_scope.injectCSS('dd-button', `
.dd-btn{display:inline-flex;align-items:center;gap:6px;font-family:${__ds_scope.MONO};font-weight:700;text-transform:uppercase;border:1px solid transparent;cursor:pointer;white-space:nowrap;position:relative;background-color:var(--dd-bg);color:var(--dd-fg);border-color:var(--dd-bd);transition:border-radius .25s ease,clip-path .25s ease,background-color .1s linear,color .1s linear,border-color .1s linear}
.dd-btn:hover:not([disabled]){background-color:var(--dd-hbg);color:var(--dd-hfg);border-color:var(--dd-hbd)}
.dd-btn:active:not([disabled]){transform:translateY(1px)}
.dd-btn:focus-visible{outline:2px solid #fff;outline-offset:2px}
.dd-btn[disabled]{opacity:.34;cursor:not-allowed}
.dd-btn-pip{width:6px;height:6px;background:currentColor;flex:none}
`);
const SIZES = {
  sm: {
    height: 22,
    fontSize: 9,
    padding: '0 10px',
    letterSpacing: '0.14em'
  },
  md: {
    height: 32,
    fontSize: 11,
    padding: '0 14px',
    letterSpacing: '0.15em'
  },
  lg: {
    height: 44,
    fontSize: 13,
    padding: '0 20px',
    letterSpacing: '0.16em'
  }
};
function Button({
  children,
  label,
  id,
  accent,
  variant = 'solid',
  size = 'md',
  surface = 'black',
  signal = 'live',
  geometry = 'sharp',
  glitch = 'off',
  texture = 'none',
  animation = 'none',
  disabled = false,
  pip = false,
  checker = false,
  icon = false,
  block = false,
  onClick,
  className = '',
  style,
  ...rest
}) {
  const s = __ds_scope.surfaceOf(surface);
  const text = label != null ? label : children;
  const hue = __ds_scope.hueOf({
    accent,
    id,
    label: typeof text === 'string' ? text : label,
    surface
  });
  const sz = SIZES[size] || SIZES.md;

  /* Flat states: hover inverts ink and fill. No offset shadow, no lift. */
  let skin;
  if (variant === 'ghost') skin = {
    '--dd-bg': 'transparent',
    '--dd-fg': hue.fill,
    '--dd-bd': hue.fill,
    '--dd-hbg': hue.fill,
    '--dd-hfg': hue.ink,
    '--dd-hbd': hue.fill
  };else if (variant === 'quiet') skin = {
    '--dd-bg': 'transparent',
    '--dd-fg': s.fg,
    '--dd-bd': s.rule,
    '--dd-hbg': s.fg,
    '--dd-hfg': s.bg,
    '--dd-hbd': s.fg
  };else if (variant === 'danger') skin = {
    '--dd-bg': __ds_scope.DANGER.fill,
    '--dd-fg': __ds_scope.DANGER.ink,
    '--dd-bd': __ds_scope.DANGER.fill,
    '--dd-hbg': __ds_scope.DANGER.ink,
    '--dd-hfg': __ds_scope.DANGER.fill,
    '--dd-hbd': __ds_scope.DANGER.fill
  };else skin = {
    '--dd-bg': hue.fill,
    '--dd-fg': hue.ink,
    '--dd-bd': hue.fill,
    '--dd-hbg': hue.ink,
    '--dd-hfg': hue.fill,
    '--dd-hbd': hue.fill
  };
  const seam = checker ? {
    ...__ds_scope.checkerFill(variant === 'solid' ? hue.ink : hue.fill, variant === 'solid' ? hue.fill : s.bg, 12),
    width: size === 'lg' ? 22 : 16,
    alignSelf: 'stretch',
    flex: 'none',
    marginLeft: -1
  } : null;

  /* Overlay law: texture owns the ground, so the label moves onto a flat
     panel over it. Two inks only — the stop and its own ink. */
  const textured = texture && texture !== 'none';
  const tex = textured ? variant === 'ghost' || variant === 'quiet' ? __ds_scope.textureFill(texture, variant === 'ghost' ? hue.fill : s.rule, s.bg, sz.height / 2) : __ds_scope.textureFill(texture, hue.ink, hue.fill, sz.height / 2) : {};
  const panel = textured && !icon ? {
    background: variant === 'ghost' || variant === 'quiet' ? s.bg : hue.fill,
    color: variant === 'ghost' ? hue.fill : variant === 'quiet' ? s.fg : hue.ink,
    padding: sz.padding,
    alignSelf: 'stretch',
    display: 'inline-flex',
    alignItems: 'center'
  } : null;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: disabled,
    onClick: onClick,
    className: __ds_scope.glitchClass(glitch, 'dd-btn ' + (animation !== 'none' ? 'dd-anim ' : '') + className)
  }, __ds_scope.glitchAttrs(glitch, text), {
    style: {
      height: sz.height,
      fontSize: sz.fontSize,
      letterSpacing: sz.letterSpacing,
      padding: icon || checker ? 0 : textured ? `${Math.max(4, Math.round(sz.height / 7))}px` : sz.padding,
      width: icon ? sz.height : block ? '100%' : undefined,
      justifyContent: icon || block ? 'center' : undefined,
      overflow: textured ? 'hidden' : undefined,
      ...skin,
      ...__ds_scope.geometryStyle(geometry),
      ...tex,
      filter: __ds_scope.signalFilter(signal),
      ...__ds_scope.animationStyle(animation),
      ...style
    }
  }, rest), seam ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: seam
  }) : null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: checker && !icon && !textured ? sz.padding : 0,
      ...panel
    }
  }, pip ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    className: "dd-btn-pip"
  }) : null, text));
}
function ButtonRow({
  children,
  gap = 8,
  wrap = true,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap,
      flexWrap: wrap ? 'wrap' : 'nowrap',
      alignItems: 'center',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Button, ButtonRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Button/Button.jsx", error: String((e && e.message) || e) }); }

// components/Card/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
__ds_scope.injectCSS('dd-card', `
.dd-card{font-family:${__ds_scope.MONO};border:1px solid transparent;position:relative;display:flex;flex-direction:column;min-width:0}
.dd-card-strip{height:6px;flex:none}
.dd-card-lab{${__ds_scope.LABEL_CSS};margin:0}
.dd-card-int{cursor:pointer;transition:border-color .1s linear,background-color .1s linear}
.dd-card-int:hover{border-color:var(--dd-hbd)}
.dd-card-int:focus-visible{outline:2px solid #fff;outline-offset:2px}
`);
const PAD = {
  sm: 12,
  md: 16,
  lg: 22
};

/* The base panel. `strip` is the checkerboard accent — trim, not texture,
   which is why it survives alongside a `texture` ground. */
function Card({
  children,
  title,
  label,
  id,
  accent,
  surface = 'black',
  variant = 'panel',
  signal = 'live',
  geometry = 'sharp',
  glitch = 'off',
  texture = 'none',
  padding = 'md',
  strip = false,
  rule = true,
  interactive = false,
  onClick,
  className = '',
  style,
  ...rest
}) {
  const s = __ds_scope.surfaceOf(surface);
  const hue = __ds_scope.hueOf({
    accent,
    id,
    label: typeof title === 'string' ? title : label,
    surface
  });
  const pad = PAD[padding] != null ? PAD[padding] : padding;
  const grounds = {
    panel: {
      background: s.panel,
      borderColor: rule ? s.rule : 'transparent'
    },
    raised: {
      background: s.raised,
      borderColor: rule ? s.rule : 'transparent'
    },
    flat: {
      background: s.bg,
      borderColor: rule ? s.rule : 'transparent'
    },
    accent: {
      background: hue.fill,
      borderColor: hue.fill,
      color: hue.ink
    },
    outline: {
      background: 'transparent',
      borderColor: hue.fill
    }
  };
  const ground = grounds[variant] || grounds.panel;
  const inkOnAccent = variant === 'accent';
  const tex = texture !== 'none' ? __ds_scope.textureFill(texture, inkOnAccent ? hue.ink : s.rule, inkOnAccent ? hue.fill : s.panel, 14) : {};
  const Tag = interactive ? 'button' : 'div';
  return /*#__PURE__*/React.createElement(Tag, _extends({
    type: interactive ? 'button' : undefined,
    onClick: onClick,
    className: __ds_scope.glitchClass(glitch, 'dd-card ' + (interactive ? 'dd-card-int ' : '') + className),
    style: {
      color: inkOnAccent ? hue.ink : s.fg,
      textAlign: interactive ? 'left' : undefined,
      '--dd-hbd': hue.fill,
      ...ground,
      ...tex,
      ...__ds_scope.geometryStyle(geometry),
      filter: __ds_scope.signalFilter(signal),
      ...style
    }
  }, rest), strip ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    className: "dd-card-strip",
    style: __ds_scope.checkerFill(hue.fill, inkOnAccent ? hue.ink : s.bg, 12)
  }) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: pad,
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      minWidth: 0
    }
  }, label ? /*#__PURE__*/React.createElement("p", {
    className: "dd-card-lab",
    style: {
      color: inkOnAccent ? hue.ink : s.dim,
      opacity: inkOnAccent ? 0.72 : 1
    }
  }, label) : null, title ? /*#__PURE__*/React.createElement("h3", {
    style: {
      font: '900 17px/1.15 "Space Grotesk",sans-serif',
      textTransform: 'uppercase',
      letterSpacing: '-0.01em',
      margin: 0
    }
  }, title) : null, children));
}

/* Header/body/footer slots for when a card needs internal rules. */
function CardSection({
  children,
  surface = 'black',
  padding = 'md',
  divide = true,
  style
}) {
  const s = __ds_scope.surfaceOf(surface);
  const pad = PAD[padding] != null ? PAD[padding] : padding;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: pad,
      borderTop: divide ? `1px solid ${s.rule}` : undefined,
      minWidth: 0,
      ...style
    }
  }, children);
}
function CardGrid({
  children,
  min = 260,
  gap = 18,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: `repeat(auto-fill,minmax(${min}px,1fr))`,
      gap,
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Card, CardSection, CardGrid });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Card/Card.jsx", error: String((e && e.message) || e) }); }

// components/Field/Field.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
__ds_scope.injectCSS('dd-field', `
.dd-field{font-family:${__ds_scope.MONO};display:flex;flex-direction:column;gap:6px;min-width:0}
.dd-field-lab{${__ds_scope.LABEL_CSS};margin:0;display:flex;justify-content:space-between;gap:10px;align-items:baseline}
.dd-input{font-family:${__ds_scope.MONO};font-size:12px;letter-spacing:.04em;width:100%;border:1px solid var(--dd-bd);background:var(--dd-bg);color:var(--dd-fg);padding:0 10px;height:34px;transition:border-color .1s linear}
.dd-input::placeholder{color:var(--dd-ph)}
.dd-input:hover:not(:disabled){border-color:var(--dd-bd-hi)}
.dd-input:focus{outline:none;border-color:var(--dd-focus);box-shadow:inset 0 0 0 1px var(--dd-focus)}
.dd-input:disabled{opacity:.4;cursor:not-allowed}
.dd-input[data-multiline]{height:auto;padding:9px 10px;line-height:1.6;resize:vertical}
.dd-help{font-size:10px;line-height:1.5;letter-spacing:.03em;margin:0}
.dd-check{font-family:${__ds_scope.MONO};display:inline-flex;align-items:center;gap:8px;cursor:pointer;font-size:11px;letter-spacing:.06em}
.dd-check input{position:absolute;opacity:0;width:0;height:0}
.dd-check-box{width:15px;height:15px;flex:none;border:1px solid var(--dd-bd);display:grid;place-items:center;font-size:11px;line-height:1;color:transparent;transition:border-color .1s linear}
.dd-check:hover .dd-check-box{border-color:var(--dd-bd-hi)}
.dd-check input:checked + .dd-check-box{background:var(--dd-fill);border-color:var(--dd-fill);color:var(--dd-ink)}
.dd-check input:focus-visible + .dd-check-box{outline:2px solid #fff;outline-offset:2px}
`);
function vars(s, hue, invalid) {
  return {
    '--dd-bg': s.bg === '#e8e3d0' ? s.raised : s.bg,
    '--dd-fg': s.fg,
    '--dd-bd': invalid ? __ds_scope.DANGER.fill : s.rule,
    '--dd-bd-hi': invalid ? __ds_scope.DANGER.fill : s.ruleStrong,
    '--dd-ph': s.faint,
    '--dd-focus': invalid ? __ds_scope.DANGER.fill : hue.fill,
    '--dd-fill': hue.fill,
    '--dd-ink': hue.ink
  };
}

/* Label + control + help, with the seeded hue as the focus ring. */
function Field({
  label,
  hint,
  help,
  error,
  children,
  id,
  accent,
  surface = 'black',
  geometry = 'sharp',
  required = false,
  className = '',
  style
}) {
  const s = __ds_scope.surfaceOf(surface);
  const hue = __ds_scope.hueOf({
    accent,
    id,
    label,
    surface
  });
  const msg = error || help;
  return /*#__PURE__*/React.createElement("div", {
    className: 'dd-field ' + className,
    style: {
      ...vars(s, hue, !!error),
      color: s.fg,
      ...style
    }
  }, label ? /*#__PURE__*/React.createElement("p", {
    className: "dd-field-lab",
    style: {
      color: s.dim
    }
  }, /*#__PURE__*/React.createElement("span", null, label, required ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: hue.fill
    }
  }, " *") : null), hint ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: s.faint,
      letterSpacing: '.1em'
    }
  }, hint) : null) : null, children, msg ? /*#__PURE__*/React.createElement("p", {
    className: "dd-help",
    style: {
      color: error ? __ds_scope.DANGER.fill : s.dim
    }
  }, msg) : null);
}
function Input({
  value,
  onChange,
  placeholder,
  type = 'text',
  multiline = false,
  rows = 4,
  id,
  accent,
  surface = 'black',
  geometry = 'sharp',
  invalid = false,
  disabled = false,
  className = '',
  style,
  ...rest
}) {
  const s = __ds_scope.surfaceOf(surface);
  const hue = __ds_scope.hueOf({
    accent,
    id,
    label: placeholder,
    surface
  });
  const shared = {
    className: 'dd-input ' + className,
    value,
    onChange,
    placeholder,
    disabled,
    'aria-invalid': invalid || undefined,
    style: {
      ...vars(s, hue, invalid),
      ...__ds_scope.geometryStyle(geometry),
      ...style
    },
    ...rest
  };
  return multiline ? /*#__PURE__*/React.createElement("textarea", _extends({}, shared, {
    rows: rows,
    "data-multiline": ""
  })) : /*#__PURE__*/React.createElement("input", _extends({}, shared, {
    type: type
  }));
}
function Select({
  value,
  onChange,
  options = [],
  id,
  accent,
  surface = 'black',
  geometry = 'sharp',
  invalid = false,
  disabled = false,
  className = '',
  style,
  ...rest
}) {
  const s = __ds_scope.surfaceOf(surface);
  const hue = __ds_scope.hueOf({
    accent,
    id,
    surface
  });
  return /*#__PURE__*/React.createElement("select", _extends({
    className: 'dd-input ' + className,
    value: value,
    onChange: onChange,
    disabled: disabled,
    "aria-invalid": invalid || undefined,
    style: {
      ...vars(s, hue, invalid),
      ...__ds_scope.geometryStyle(geometry),
      cursor: 'pointer',
      ...style
    }
  }, rest), options.map(o => {
    const val = typeof o === 'string' ? o : o.value;
    const lab = typeof o === 'string' ? o : o.label;
    return /*#__PURE__*/React.createElement("option", {
      key: val,
      value: val
    }, lab);
  }));
}
function Checkbox({
  label,
  checked,
  onChange,
  id,
  accent,
  surface = 'black',
  disabled = false,
  radio = false,
  className = '',
  style,
  ...rest
}) {
  const s = __ds_scope.surfaceOf(surface);
  const hue = __ds_scope.hueOf({
    accent,
    id,
    label,
    surface
  });
  return /*#__PURE__*/React.createElement("label", {
    className: 'dd-check ' + className,
    style: {
      ...vars(s, hue, false),
      color: disabled ? s.faint : s.fg,
      cursor: disabled ? 'not-allowed' : 'pointer',
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: radio ? 'radio' : 'checkbox',
    checked: checked,
    onChange: onChange,
    disabled: disabled
  }, rest)), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    className: "dd-check-box",
    style: radio ? {
      borderRadius: 999
    } : undefined
  }, radio ? '\u25CF' : '\u2715'), label);
}
Object.assign(__ds_scope, { Field, Input, Select, Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Field/Field.jsx", error: String((e && e.message) || e) }); }

// components/NodeCard/NodeCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
__ds_scope.injectCSS('dd-nodecard', `
.dd-node{font-family:${__ds_scope.MONO};border:1px solid transparent;display:flex;flex-direction:column;min-width:0;overflow:hidden;transition:border-color .1s linear}
.dd-node-int{cursor:pointer;text-align:left}
.dd-node-int:hover{border-color:var(--dd-hbd)}
.dd-node-int:focus-visible{outline:2px solid #fff;outline-offset:2px}
.dd-node-hd{padding:8px 11px;display:flex;justify-content:space-between;align-items:center;gap:10px;border-bottom:1px solid var(--dd-rule)}
.dd-node-ti{font:900 16px/1 'Space Grotesk',sans-serif;text-transform:uppercase;letter-spacing:.04em}
.dd-node-co{font-size:9px;letter-spacing:.1em;white-space:nowrap}
.dd-node-rw{display:flex;justify-content:space-between;gap:12px;padding:3px 0;border-bottom:1px solid var(--dd-hair)}
.dd-node-rw:last-child{border-bottom:none}
.dd-node-k{${__ds_scope.LABEL_CSS};font-size:8px}
.dd-node-v{font-size:10px;letter-spacing:.05em;font-variant-numeric:tabular-nums;text-align:right}
.dd-node-pip{display:inline-block;width:5px;height:5px;background:currentColor;margin-right:5px;vertical-align:middle}
`);

/* Status hue is fixed, not seeded — an operator reads colour as meaning. */
const STATUS = {
  nominal: {
    accent: 'green',
    text: 'NOMINAL'
  },
  running: {
    accent: 'cobalt',
    text: 'RUNNING'
  },
  scanning: {
    accent: 'cyan',
    text: 'SCANNING'
  },
  warning: {
    accent: 'orange',
    text: 'WARNING'
  },
  critical: {
    fill: '#ff0066',
    text: 'CRITICAL'
  },
  offline: {
    dim: true,
    text: 'OFFLINE'
  }
};

/* The signature form: code header, key/value rows, status line.
   `rows` is [label, value] pairs — an array so the shape stays tabular. */
function NodeCard({
  name,
  code,
  rows = [],
  status = 'nominal',
  load,
  id,
  accent,
  surface = 'black',
  signal = 'live',
  geometry = 'sharp',
  glitch = 'off',
  strip = false,
  interactive = false,
  width,
  onClick,
  children,
  className = '',
  style,
  ...rest
}) {
  const s = __ds_scope.surfaceOf(surface);
  const seed = id != null ? id : name;
  const hue = __ds_scope.hueOf({
    accent,
    id: seed,
    label: name,
    surface
  });
  const st = STATUS[status] || STATUS.nominal;
  const statusHue = st.dim ? {
    fill: s.dim
  } : st.fill ? {
    fill: st.fill
  } : __ds_scope.hueOf({
    accent: st.accent,
    surface
  });
  const Tag = interactive ? 'button' : 'div';
  return /*#__PURE__*/React.createElement(Tag, _extends({
    type: interactive ? 'button' : undefined,
    onClick: onClick,
    className: __ds_scope.glitchClass(glitch, 'dd-node ' + (interactive ? 'dd-node-int ' : '') + className),
    style: {
      width,
      background: s.panel,
      borderColor: s.rule,
      color: s.fg,
      '--dd-rule': s.rule,
      '--dd-hair': s.faint,
      '--dd-hbd': hue.fill,
      ...__ds_scope.geometryStyle(geometry),
      filter: __ds_scope.signalFilter(signal),
      ...style
    }
  }, rest), strip ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      height: 6,
      flex: 'none',
      ...__ds_scope.checkerFill(hue.fill, s.bg, 12)
    }
  }) : null, /*#__PURE__*/React.createElement("div", {
    className: "dd-node-hd"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dd-node-ti"
  }, name), code ? /*#__PURE__*/React.createElement("span", {
    className: "dd-node-co",
    style: {
      color: s.dim
    }
  }, code) : null), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '9px 11px',
      display: 'flex',
      flexDirection: 'column',
      minWidth: 0
    }
  }, rows.map(([k, v], i) => /*#__PURE__*/React.createElement("div", {
    className: "dd-node-rw",
    key: i
  }, /*#__PURE__*/React.createElement("span", {
    className: "dd-node-k",
    style: {
      color: s.dim
    }
  }, k), /*#__PURE__*/React.createElement("span", {
    className: "dd-node-v",
    style: {
      color: s.fg
    }
  }, v))), /*#__PURE__*/React.createElement("div", {
    className: "dd-node-rw"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dd-node-k",
    style: {
      color: s.dim
    }
  }, "status"), /*#__PURE__*/React.createElement("span", {
    className: "dd-node-v",
    style: {
      color: statusHue.fill
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    className: "dd-node-pip"
  }), st.text)), load != null ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 9,
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      flex: 1,
      height: 6,
      display: 'flex',
      background: s.faint
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: `${Math.round(Math.max(0, Math.min(1, load)) * 100)}%`,
      background: statusHue.fill
    }
  })), /*#__PURE__*/React.createElement("span", {
    className: "dd-node-v",
    style: {
      color: s.dim,
      fontSize: 9
    }
  }, Math.round(load * 100), "%")) : null, children));
}

/* Sector roll-up: solid seeded fill, segmented health bar, count chips.
   `breakdown` is [statusName, count] pairs. */
function SectorCard({
  name,
  id,
  accent,
  breakdown = [],
  surface = 'black',
  geometry = 'sharp',
  width,
  className = '',
  style,
  ...rest
}) {
  const s = __ds_scope.surfaceOf(surface);
  const hue = __ds_scope.hueOf({
    accent,
    id: id != null ? id : name,
    label: name,
    surface
  });
  const total = breakdown.reduce((n, [, c]) => n + c, 0) || 1;
  const fillFor = k => {
    const st = STATUS[k] || STATUS.nominal;
    if (st.dim) return 'rgba(0,0,0,.5)';
    if (st.fill) return st.fill;
    return __ds_scope.hueOf({
      accent: st.accent,
      surface: 'black'
    }).fill;
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    className: 'dd-node ' + className,
    style: {
      width,
      background: hue.fill,
      borderColor: hue.fill,
      color: hue.ink,
      padding: 14,
      ...__ds_scope.geometryStyle(geometry),
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 8,
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '900 28px/1 "Space Grotesk",sans-serif'
    }
  }, name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9,
      fontWeight: 700,
      letterSpacing: '.12em',
      textTransform: 'uppercase',
      textAlign: 'right',
      lineHeight: 1.3
    }
  }, total, /*#__PURE__*/React.createElement("br", null), "NODES")), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      display: 'flex',
      height: 6,
      width: '100%',
      marginBottom: 8,
      overflow: 'hidden'
    }
  }, breakdown.map(([k, c], i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      background: fillFor(k),
      width: `${c / total * 100}%`
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 5
    }
  }, breakdown.map(([k, c], i) => /*#__PURE__*/React.createElement("b", {
    key: i,
    style: {
      background: '#000',
      color: fillFor(k),
      fontSize: 8,
      fontWeight: 700,
      letterSpacing: '.1em',
      textTransform: 'uppercase',
      padding: '2px 6px'
    }
  }, c, " ", (STATUS[k] || STATUS.nominal).text))));
}

/* Big-figure stat tile. */
function StatCard({
  value,
  label,
  note,
  id,
  accent,
  status,
  surface = 'black',
  geometry = 'sharp',
  width = 110,
  className = '',
  style,
  ...rest
}) {
  const s = __ds_scope.surfaceOf(surface);
  const st = status ? STATUS[status] : null;
  const hue = st && !st.dim ? st.fill ? {
    fill: st.fill
  } : __ds_scope.hueOf({
    accent: st.accent,
    surface
  }) : __ds_scope.hueOf({
    accent,
    id: id != null ? id : label,
    label,
    surface
  });
  return /*#__PURE__*/React.createElement("div", _extends({
    className: 'dd-node ' + className,
    style: {
      width,
      background: s.panel,
      borderColor: s.rule,
      color: s.fg,
      padding: 10,
      ...__ds_scope.geometryStyle(geometry),
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '900 44px/1 "Space Grotesk",sans-serif',
      color: hue.fill,
      fontVariantNumeric: 'tabular-nums'
    }
  }, value), /*#__PURE__*/React.createElement("div", {
    className: "dd-node-k",
    style: {
      color: s.dim,
      marginTop: 4
    }
  }, label), note ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      letterSpacing: '.08em',
      marginTop: 2,
      color: hue.fill
    }
  }, note) : null);
}

/* ASCII block meter — the sanctioned loading/progress job for block chars. */
function NodeMeter({
  value = 0,
  width = 24,
  surface = 'black',
  accent,
  id,
  style
}) {
  const s = __ds_scope.surfaceOf(surface);
  const hue = __ds_scope.hueOf({
    accent,
    id,
    label: String(value),
    surface
  });
  const n = Math.max(0, Math.min(width, Math.round(value * width)));
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: __ds_scope.MONO,
      fontSize: 11,
      letterSpacing: '.02em',
      whiteSpace: 'pre',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: hue.fill
    }
  }, __ds_scope.BLOCKS.full.repeat(n)), /*#__PURE__*/React.createElement("span", {
    style: {
      color: s.faint
    }
  }, __ds_scope.BLOCKS.light.repeat(width - n)));
}
Object.assign(__ds_scope, { NodeCard, SectorCard, StatCard, NodeMeter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/NodeCard/NodeCard.jsx", error: String((e && e.message) || e) }); }

// components/Progress/Progress.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
__ds_scope.injectCSS('dd-motion', __ds_scope.MOTION_CSS);
__ds_scope.injectCSS('dd-progress', `
.dd-prog{font-family:${__ds_scope.MONO};display:flex;flex-direction:column;gap:6px;min-width:0}
.dd-prog-hd{${__ds_scope.LABEL_CSS};margin:0;display:flex;justify-content:space-between;gap:10px;align-items:baseline}
.dd-prog-track{display:flex;width:100%;overflow:hidden}
.dd-prog-fill{height:100%;transition:width .25s cubic-bezier(.16,1,.3,1)}
.dd-prog-seg{display:flex;width:100%;gap:2px}
.dd-prog-seg > span{flex:1}
.dd-ascii{font-family:${__ds_scope.MONO};white-space:pre;letter-spacing:.02em;line-height:1}
@keyframes dd-indet{0%{transform:translateX(-100%)}100%{transform:translateX(400%)}}
.dd-prog-indet{animation:dd-indet 1.1s steps(6,end) infinite;width:25%!important}
@media (prefers-reduced-motion:reduce){.dd-prog-indet{animation-duration:2.4s}}
`);
const HEIGHTS = {
  sm: 4,
  md: 6,
  lg: 10
};

/* Solid-fill bar. Hue is seeded from the label unless pinned. */
function Progress({
  value = 0,
  label,
  note,
  id,
  accent,
  surface = 'black',
  size = 'md',
  geometry = 'sharp',
  indeterminate = false,
  showValue = false,
  className = '',
  style,
  ...rest
}) {
  const s = __ds_scope.surfaceOf(surface);
  const hue = __ds_scope.hueOf({
    accent,
    id,
    label,
    surface
  });
  const h = HEIGHTS[size] != null ? HEIGHTS[size] : size;
  const pct = Math.round(Math.max(0, Math.min(1, value)) * 100);
  return /*#__PURE__*/React.createElement("div", {
    className: 'dd-prog ' + className,
    style: {
      color: s.fg,
      ...style
    }
  }, label || note || showValue ? /*#__PURE__*/React.createElement("p", {
    className: "dd-prog-hd",
    style: {
      color: s.dim
    }
  }, /*#__PURE__*/React.createElement("span", null, label), /*#__PURE__*/React.createElement("span", {
    style: {
      color: s.faint,
      fontVariantNumeric: 'tabular-nums'
    }
  }, note != null ? note : showValue ? pct + '%' : null)) : null, /*#__PURE__*/React.createElement("div", _extends({
    className: "dd-prog-track",
    role: "progressbar",
    "aria-valuenow": indeterminate ? undefined : pct,
    "aria-valuemin": 0,
    "aria-valuemax": 100,
    "aria-label": label,
    style: {
      height: h,
      background: s.faint,
      ...__ds_scope.geometryStyle(geometry)
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: 'dd-prog-fill' + (indeterminate ? ' dd-prog-indet' : ''),
    style: {
      width: indeterminate ? undefined : pct + '%',
      background: hue.fill
    }
  })));
}

/* Segmented bar — discrete units, the honest form when the total is countable
   (14 of 20 nodes, not 70%). */
function ProgressSegments({
  value = 0,
  total = 10,
  label,
  id,
  accent,
  surface = 'black',
  size = 'md',
  className = '',
  style,
  ...rest
}) {
  const s = __ds_scope.surfaceOf(surface);
  const hue = __ds_scope.hueOf({
    accent,
    id,
    label,
    surface
  });
  const h = HEIGHTS[size] != null ? HEIGHTS[size] : size;
  const n = Math.max(0, Math.min(total, Math.round(value)));
  return /*#__PURE__*/React.createElement("div", {
    className: 'dd-prog ' + className,
    style: {
      color: s.fg,
      ...style
    }
  }, label ? /*#__PURE__*/React.createElement("p", {
    className: "dd-prog-hd",
    style: {
      color: s.dim
    }
  }, /*#__PURE__*/React.createElement("span", null, label), /*#__PURE__*/React.createElement("span", {
    style: {
      color: s.faint,
      fontVariantNumeric: 'tabular-nums'
    }
  }, n, "/", total)) : null, /*#__PURE__*/React.createElement("div", _extends({
    className: "dd-prog-seg",
    role: "progressbar",
    "aria-valuenow": n,
    "aria-valuemin": 0,
    "aria-valuemax": total,
    "aria-label": label,
    style: {
      height: h
    }
  }, rest), Array.from({
    length: total
  }, (_, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      background: i < n ? hue.fill : s.faint
    }
  }))));
}

/* Stacked bar for a breakdown — [label, count, accent] triples. */
function ProgressStack({
  parts = [],
  label,
  surface = 'black',
  size = 'md',
  legend = true,
  className = '',
  style,
  ...rest
}) {
  const s = __ds_scope.surfaceOf(surface);
  const h = HEIGHTS[size] != null ? HEIGHTS[size] : size;
  const total = parts.reduce((n, p) => n + p[1], 0) || 1;
  return /*#__PURE__*/React.createElement("div", {
    className: 'dd-prog ' + className,
    style: {
      color: s.fg,
      ...style
    }
  }, label ? /*#__PURE__*/React.createElement("p", {
    className: "dd-prog-hd",
    style: {
      color: s.dim
    }
  }, /*#__PURE__*/React.createElement("span", null, label), /*#__PURE__*/React.createElement("span", {
    style: {
      color: s.faint
    }
  }, total)) : null, /*#__PURE__*/React.createElement("div", _extends({
    className: "dd-prog-track",
    style: {
      height: h,
      background: s.faint
    }
  }, rest), parts.map(([name, count, accent], i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      width: `${count / total * 100}%`,
      background: __ds_scope.hueOf({
        accent,
        label: name,
        surface
      }).fill
    }
  }))), legend ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '4px 10px',
      marginTop: 2
    }
  }, parts.map(([name, count, accent], i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      fontSize: 9,
      letterSpacing: '.12em',
      textTransform: 'uppercase',
      color: s.dim
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 6,
      height: 6,
      background: __ds_scope.hueOf({
        accent,
        label: name,
        surface
      }).fill
    }
  }), count, " ", name))) : null);
}

/* ASCII block meter — one of the three sanctioned ASCII jobs. */
function ProgressAscii({
  value = 0,
  width = 24,
  label,
  id,
  accent,
  surface = 'black',
  showValue = true,
  className = '',
  style
}) {
  const s = __ds_scope.surfaceOf(surface);
  const hue = __ds_scope.hueOf({
    accent,
    id,
    label,
    surface
  });
  const n = Math.max(0, Math.min(width, Math.round(value * width)));
  return /*#__PURE__*/React.createElement("div", {
    className: 'dd-prog ' + className,
    style: {
      color: s.fg,
      gap: 4,
      ...style
    }
  }, label ? /*#__PURE__*/React.createElement("p", {
    className: "dd-prog-hd",
    style: {
      color: s.dim
    }
  }, /*#__PURE__*/React.createElement("span", null, label)) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "dd-ascii",
    style: {
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: hue.fill
    }
  }, __ds_scope.BLOCKS.full.repeat(n)), /*#__PURE__*/React.createElement("span", {
    style: {
      color: s.faint
    }
  }, __ds_scope.BLOCKS.light.repeat(width - n))), showValue ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9,
      letterSpacing: '.1em',
      color: s.dim,
      fontVariantNumeric: 'tabular-nums'
    }
  }, Math.round(value * 100), "%") : null));
}

/* Stepped ASCII spinner. Quadrant frames, 8 fps — no smooth rotation. */
function Spinner({
  surface = 'black',
  accent,
  id,
  size = 14,
  label,
  pulse = false,
  style
}) {
  const s = __ds_scope.surfaceOf(surface);
  const hue = __ds_scope.hueOf({
    accent,
    id,
    label,
    surface
  });
  const frames = pulse ? __ds_scope.PULSE_FRAMES : __ds_scope.SPINNER_FRAMES;
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    const reduced = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion:reduce)').matches;
    const ms = reduced ? 320 : 125;
    const t = setInterval(() => setI(n => (n + 1) % frames.length), ms);
    return () => clearInterval(t);
  }, [frames.length]);
  return /*#__PURE__*/React.createElement("span", {
    role: "status",
    "aria-label": label || 'Loading',
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7,
      fontFamily: __ds_scope.MONO,
      color: s.fg,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    className: "dd-ascii",
    style: {
      color: hue.fill,
      fontSize: size,
      width: size,
      textAlign: 'center'
    }
  }, frames[i]), label ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      letterSpacing: '.14em',
      textTransform: 'uppercase',
      color: s.dim
    }
  }, label) : null);
}
Object.assign(__ds_scope, { Progress, ProgressSegments, ProgressStack, ProgressAscii, Spinner });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Progress/Progress.jsx", error: String((e && e.message) || e) }); }

// glitch.js
try { (() => {
/* digidelic glitch driver v2 — fine, intermittent micro-tears */
(function () {
  // Inject the psychedelic liquid-warp SVG filter (#psyGoo) once, so any
  // element with class .psy-liquid can melt organically. Runs regardless of
  // reduced-motion (the animate inside is cheap; CSS handles motion-reduce).
  if (!document.getElementById('psyGoo')) {
    var ns = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('width', '0');
    svg.setAttribute('height', '0');
    svg.setAttribute('aria-hidden', 'true');
    svg.style.cssText = 'position:absolute;width:0;height:0';
    svg.innerHTML = '<defs>' + '<filter id="psyGoo">' + '<feTurbulence type="fractalNoise" baseFrequency="0.008 0.014" numOctaves="3" seed="7" result="n">' + '<animate attributeName="baseFrequency" dur="14s" values="0.008 0.014;0.018 0.006;0.008 0.014" repeatCount="indefinite"/>' + '</feTurbulence>' + '<feDisplacementMap in="SourceGraphic" in2="n" scale="34" xChannelSelector="R" yChannelSelector="G">' + '<animate attributeName="scale" dur="9s" values="22;46;22" repeatCount="indefinite"/>' + '</feDisplacementMap>' + '</filter>' + '<filter id="psyWave">' + '<feTurbulence type="turbulence" baseFrequency="0.002 0.02" numOctaves="3" seed="3" result="w">' + '<animate attributeName="baseFrequency" dur="9s" values="0.002 0.02;0.008 0.05;0.002 0.02" repeatCount="indefinite"/>' + '</feTurbulence>' + '<feDisplacementMap in="SourceGraphic" in2="w" scale="70" xChannelSelector="R" yChannelSelector="G">' + '<animate attributeName="scale" dur="7s" values="40;88;40" repeatCount="indefinite"/>' + '</feDisplacementMap>' + '</filter>' + '<filter id="psyWaveXL">' + '<feTurbulence type="turbulence" baseFrequency="0.0015 0.012" numOctaves="2" seed="9" result="wx">' + '<animate attributeName="baseFrequency" dur="13s" values="0.0015 0.012;0.005 0.03;0.0015 0.012" repeatCount="indefinite"/>' + '</feTurbulence>' + '<feDisplacementMap in="SourceGraphic" in2="wx" scale="120" xChannelSelector="R" yChannelSelector="G">' + '<animate attributeName="scale" dur="10s" values="70;150;70" repeatCount="indefinite"/>' + '</feDisplacementMap>' + '</filter>' + '</defs>';
    (document.body || document.documentElement).appendChild(svg);
  }
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  /* Resolve the stage lazily. When this file is loaded from <head> — which is
     how the compiled bundle loads it — document.body is still null at module
     scope, and grabbing it here permanently captured null. */
  function getStage() {
    return document.querySelector('.gl-stage') || document.body || document.documentElement;
  }
  function getSlices() {
    return document.querySelectorAll('.gl-slice');
  }
  function rand(a, b) {
    return a + Math.random() * (b - a);
  }
  function burst() {
    var stage = getStage();
    var slices = getSlices();
    if (!stage) {
      schedule();
      return;
    }
    stage.setAttribute('data-gl-tear', '1');
    slices.forEach(function (el) {
      el.style.setProperty('--gl-slice-top', rand(12, 80).toFixed(1) + '%');
      el.style.setProperty('--gl-slice-top2', rand(12, 80).toFixed(1) + '%');
      el.style.setProperty('--gl-slice-x', rand(-4, 4).toFixed(1) + 'px');
      el.style.setProperty('--gl-slice-x2', rand(-3, 3).toFixed(1) + 'px');
      el.setAttribute('data-gl-tear', '1');
    });
    // very short flash so it reads as a fine artifact, not a block
    setTimeout(function () {
      stage.removeAttribute('data-gl-tear');
      slices.forEach(function (el) {
        el.removeAttribute('data-gl-tear');
      });
    }, 70 + Math.random() * 80);

    // occasional quick double-tap for a stutter feel
    if (Math.random() < 0.35) {
      setTimeout(function () {
        stage.setAttribute('data-gl-tear', '1');
        setTimeout(function () {
          stage.removeAttribute('data-gl-tear');
        }, 50);
      }, 140);
    }
    schedule();
  }
  function schedule() {
    setTimeout(burst, 2600 + Math.random() * 5000);
  }
  schedule();
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "glitch.js", error: String((e && e.message) || e) }); }

// tailwind.config.js
try { (() => {
/**
 * digidelic Design System — Tailwind config
 * v2.2 — palette retuned to coral / sky / teal duotone refs;
 *        psychedelia tokens added (brand-spectrum gradients, spin/sat/pan)
 *
 * Usage (real project):
 *   // tailwind.config.js
 *   const digidelic = require('./tailwind.config.js');
 *   module.exports = digidelic;
 *
 * Or copy the `theme.extend` block into your own config.
 * Pair with the @layer utilities in tailwind-utilities.css for
 * the checker / hazard / texture / glitch motifs.
 */
module.exports = {
  content: ['./**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    // hard-reset radius — digidelic is zero-radius everywhere
    borderRadius: {
      none: '0',
      DEFAULT: '0',
      sm: '0',
      md: '0',
      lg: '0',
      xl: '0',
      full: '0'
    },
    extend: {
      colors: {
        // base
        void: '#000000',
        soft: '#0a0a0a',
        panel: '#111110',
        raised: '#1a1a18',
        // neon heroes
        cobalt: {
          DEFAULT: '#2d6cff',
          dim: '#1f52d6'
        },
        pink: {
          DEFAULT: '#ff2d87',
          hot: '#ff0066'
        },
        green: {
          DEFAULT: '#39ff6a',
          dim: '#00d93d'
        },
        lime: {
          DEFAULT: '#c6ff3a',
          dim: '#a0e600'
        },
        cyan: {
          DEFAULT: '#00d9ff'
        },
        blue: {
          DEFAULT: '#2d6cff',
          deep: '#0018cc'
        },
        // electric
        magenta: {
          DEFAULT: '#c800ff'
        },
        orange: {
          DEFAULT: '#ff5a00'
        },
        // duotone layer (from flower / halftone refs)
        coral: {
          DEFAULT: '#ff6050'
        },
        // was signal-red
        sky: {
          DEFAULT: '#0a84e0'
        },
        // was periwinkle
        teal: {
          DEFAULT: '#12b39b'
        }
      },
      // text-on-color always flips to black; expose as a util color
      textColor: {
        ink: '#000000'
      },
      fontFamily: {
        mono: ['Geist Mono', 'Red Hat Mono', 'ui-monospace', 'monospace'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif']
      },
      fontSize: {
        '2xs': ['10px', '1.2'],
        xs: ['11px', '1.3'],
        sm: ['12px', '1.4'],
        md: ['14px', '1.45'],
        lg: ['16px', '1.4'],
        xl: ['20px', '1.2'],
        '2xl': ['28px', '1.05'],
        '3xl': ['40px', '1.0'],
        '4xl': ['56px', '0.98'],
        '5xl': ['80px', '0.95'],
        '6xl': ['120px', '0.92']
      },
      letterSpacing: {
        tight: '-0.02em',
        wide: '0.06em',
        wider: '0.12em',
        widest: '0.22em'
      },
      spacing: {
        // 4px base — Tailwind's default 4px scale already matches;
        // explicit aliases for the named tokens
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        5: '20px',
        6: '24px',
        8: '32px',
        10: '40px',
        12: '48px',
        16: '64px',
        20: '80px',
        24: '96px'
      },
      transitionTimingFunction: {
        flow: 'cubic-bezier(0.22, 1, 0.36, 1)',
        snap: 'cubic-bezier(0.16, 1, 0.3, 1)',
        linear: 'linear'
      },
      transitionDuration: {
        fast: '80ms',
        base: '140ms'
      },
      backgroundImage: {
        // motif gradients
        'checker': 'linear-gradient(45deg,#0a84e0 25%,transparent 25%,transparent 75%,#0a84e0 75%),linear-gradient(45deg,#0a84e0 25%,transparent 25%,transparent 75%,#0a84e0 75%)',
        'hazard-cobalt': 'repeating-linear-gradient(-45deg,#2d6cff 0 14px,#000 14px 28px)',
        'hazard-coral': 'repeating-linear-gradient(-45deg,#ff6050 0 14px,#000 14px 28px)',
        // psychedelia — spectrum built ONLY from brand neons (no hue-rotate)
        'psy-spectrum': 'linear-gradient(90deg,#2d6cff,#39ff6a,#00d9ff,#2d6cff,#c800ff,#ff2d87,#ff6050,#ff5a00,#2d6cff)',
        'psy-sun': 'conic-gradient(from 0deg,#2d6cff,#39ff6a,#00d9ff,#2d6cff,#c800ff,#ff2d87,#ff6050,#ff5a00,#2d6cff)',
        'psy-aura': 'linear-gradient(180deg,rgba(255,45,135,0) 0%,#ff2d87 14%,#ff5a00 28%,#2d6cff 42%,#39ff6a 56%,#00d9ff 70%,#2d6cff 82%,rgba(200,0,255,0) 100%)',
        // texture overlays (image refs)
        'tex-crossgrid': "url('assets/tex-crossgrid.png')",
        'tex-flower': "url('assets/tex-flower-duotone.png')",
        'tex-halftone': "url('assets/tex-halftone-portrait.png')"
      },
      keyframes: {
        'psy-spin': {
          to: {
            transform: 'rotate(360deg)'
          }
        },
        'psy-spin-ccw': {
          to: {
            transform: 'rotate(-360deg)'
          }
        },
        // saturation breathe — hue stays fixed to the palette
        'psy-sat': {
          '0%,100%': {
            filter: 'saturate(1)'
          },
          '50%': {
            filter: 'saturate(1.4) brightness(1.08)'
          }
        },
        'psy-pan': {
          '0%': {
            backgroundPosition: '0% 50%'
          },
          '100%': {
            backgroundPosition: '300% 50%'
          }
        }
      },
      animation: {
        'psy-spin': 'psy-spin 120s linear infinite',
        'psy-spin-fast': 'psy-spin 40s linear infinite',
        'psy-sat': 'psy-sat 9s ease-in-out infinite',
        'psy-pan': 'psy-pan 5s linear infinite'
      }
    }
  },
  plugins: []
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "tailwind.config.js", error: String((e && e.message) || e) }); }

// tweaks-panel.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
// Copied omelette starter. Re-running copy_starter_component with this kind overwrites this file with the latest version (page content is unaffected).

/* BEGIN USAGE */
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
// Exports (to window): useTweaks, TweaksPanel, TweakSection, TweakRow, TweakSlider,
//   TweakToggle, TweakRadio, TweakSelect, TweakText, TweakNumber, TweakColor, TweakButton.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// TweakRadio is the segmented control for 2–3 short options (auto-falls-back to
// TweakSelect past ~16/~10 chars per label); reach for TweakSelect directly when
// options are many or long. For color tweaks always curate 3-4 options rather than
// a free picker; an option can also be a whole 2–5 color palette (the stored value
// is the array). The Tweak* controls are a floor, not a ceiling — build custom
// controls inside the panel if a tweak calls for UI they don't cover.
/* END USAGE */
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null ? keyOrEdits : {
      [keyOrEdits]: val
    };
    setValues(prev => ({
      ...prev,
      ...edits
    }));
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits
    }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', {
      detail: edits
    }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({
  title = 'Tweaks',
  children
}) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({
    x: 16,
    y: 16
  });
  const PAD = 16;
  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth,
      h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);
  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);
  React.useEffect(() => {
    const onMsg = e => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({
      type: '__edit_mode_dismissed'
    }, '*');
  };
  const onDragStart = e => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = ev => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy)
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };

  // data-om-starter: inert presence marker — Claude Design's starter-usage
  // probe reads it. The closed panel renders nothing, so the marker rides
  // the <html> element as an attribute instead of a rendered node — zero
  // elements added, so page CSS (even structural selectors like
  // :nth-child) can never observe it. It records that the page WIRES a
  // tweaks panel, whether or not the panel is open. Keep this effect.
  React.useEffect(() => {
    document.documentElement.setAttribute('data-om-starter', 'tweaks-panel');
    return () => document.documentElement.removeAttribute('data-om-starter');
  }, []);
  if (!open) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, __TWEAKS_STYLE), /*#__PURE__*/React.createElement("div", {
    ref: dragRef,
    className: "twk-panel",
    "data-omelette-chrome": "",
    style: {
      right: offsetRef.current.x,
      bottom: offsetRef.current.y
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-hd",
    onMouseDown: onDragStart
  }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("button", {
    className: "twk-x",
    "aria-label": "Close tweaks",
    onMouseDown: e => e.stopPropagation(),
    onClick: dismiss
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "twk-body"
  }, children)));
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "twk-sect"
  }, label), children);
}
function TweakRow({
  label,
  value,
  children,
  inline = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: inline ? 'twk-row twk-row-h' : 'twk-row'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label), value != null && /*#__PURE__*/React.createElement("span", {
    className: "twk-val"
  }, value)), children);
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label,
    value: `${value}${unit}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "twk-slider",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value))
  }));
}
function TweakToggle({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "twk-toggle",
    "data-on": value ? '1' : '0',
    role: "switch",
    "aria-checked": !!value,
    onClick: () => onChange(!value)
  }, /*#__PURE__*/React.createElement("i", null)));
}
function TweakRadio({
  label,
  value,
  options,
  onChange
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = o => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({
    2: 16,
    3: 10
  }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = s => {
      const m = options.find(o => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return /*#__PURE__*/React.createElement(TweakSelect, {
      label: label,
      value: value,
      options: options,
      onChange: s => onChange(resolve(s))
    });
  }
  const opts = options.map(o => typeof o === 'object' ? o : {
    value: o,
    label: o
  });
  const idx = Math.max(0, opts.findIndex(o => o.value === value));
  const n = opts.length;
  const segAt = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor((clientX - r.left - 2) / inner * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };
  const onPointerDown = e => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = ev => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    role: "radiogroup",
    onPointerDown: onPointerDown,
    className: dragging ? 'twk-seg dragging' : 'twk-seg'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-seg-thumb",
    style: {
      left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
      width: `calc((100% - 4px) / ${n})`
    }
  }), opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    role: "radio",
    "aria-checked": o.value === value
  }, o.label))));
}
function TweakSelect({
  label,
  value,
  options,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("select", {
    className: "twk-field",
    value: value,
    onChange: e => onChange(e.target.value)
  }, options.map(o => {
    const v = typeof o === 'object' ? o.value : o;
    const l = typeof o === 'object' ? o.label : o;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
function TweakText({
  label,
  value,
  placeholder,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("input", {
    className: "twk-field",
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakNumber({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) {
  const clamp = n => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({
    x: 0,
    val: 0
  });
  const onScrubStart = e => {
    e.preventDefault();
    startRef.current = {
      x: e.clientX,
      val: value
    };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = ev => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-num"
  }, /*#__PURE__*/React.createElement("span", {
    className: "twk-num-lbl",
    onPointerDown: onScrubStart
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => onChange(clamp(Number(e.target.value)))
  }), unit && /*#__PURE__*/React.createElement("span", {
    className: "twk-num-unit"
  }, unit));
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, c => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}
const __TwkCheck = ({
  light
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 14 14",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 7.2 5.8 10 11 4.2",
  fill: "none",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  stroke: light ? 'rgba(0,0,0,.78)' : '#fff'
}));

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({
  label,
  value,
  options,
  onChange
}) {
  if (!options || !options.length) {
    return /*#__PURE__*/React.createElement("div", {
      className: "twk-row twk-row-h"
    }, /*#__PURE__*/React.createElement("div", {
      className: "twk-lbl"
    }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("input", {
      type: "color",
      className: "twk-swatch",
      value: value,
      onChange: e => onChange(e.target.value)
    }));
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = o => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-chips",
    role: "radiogroup"
  }, options.map((o, i) => {
    const colors = Array.isArray(o) ? o : [o];
    const [hero, ...rest] = colors;
    const sup = rest.slice(0, 4);
    const on = key(o) === cur;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      className: "twk-chip",
      role: "radio",
      "aria-checked": on,
      "data-on": on ? '1' : '0',
      "aria-label": colors.join(', '),
      title: colors.join(' · '),
      style: {
        background: hero
      },
      onClick: () => onChange(o)
    }, sup.length > 0 && /*#__PURE__*/React.createElement("span", null, sup.map((c, j) => /*#__PURE__*/React.createElement("i", {
      key: j,
      style: {
        background: c
      }
    }))), on && /*#__PURE__*/React.createElement(__TwkCheck, {
      light: __twkIsLight(hero)
    }));
  })));
}
function TweakButton({
  label,
  onClick,
  secondary = false
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: secondary ? 'twk-btn secondary' : 'twk-btn',
    onClick: onClick
  }, label);
}
Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRow,
  TweakSlider,
  TweakToggle,
  TweakRadio,
  TweakSelect,
  TweakText,
  TweakNumber,
  TweakColor,
  TweakButton
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "tweaks-panel.jsx", error: String((e && e.message) || e) }); }

// ui_kits/pantry/data.js
try { (() => {
window.PANTRY = (() => {
  const inv = [['beef', 'Ground beef', 'fridge', 0], ['spag', 'Spaghetti', 'pantry', 0], ['toms', 'Canned tomatoes', 'pantry', 0], ['onion', 'Onions', 'pantry', 1], ['garlic', 'Garlic', 'pantry', 1], ['butter', 'Butter', 'fridge', 1], ['soy', 'Soy sauce', 'pantry', 1], ['mixveg', 'Stir-fry veg mix', 'freezer', 0], ['rice', 'Jasmine rice', 'pantry', 1], ['chix', 'Chicken thighs', 'freezer', 0], ['lemon', 'Lemons', 'fridge', 0], ['pots', 'Potatoes', 'pantry', 0], ['arbo', 'Arborio rice', 'pantry', 0], ['mush', 'Mushrooms', 'fridge', 0], ['parm', 'Parmesan', 'fridge', 0], ['chick', 'Chickpeas (can)', 'pantry', 0], ['coco', 'Coconut milk', 'pantry', 0], ['curry', 'Curry paste', 'fridge', 0], ['buns', 'Burger buns', 'pantry', 0], ['ched', 'Cheddar', 'fridge', 0], ['salmon', 'Salmon fillets', 'freezer', 0], ['miso', 'Miso paste', 'fridge', 0], ['tort', 'Tortillas', 'pantry', 0], ['taco', 'Taco seasoning', 'pantry', 0], ['bread', 'Sourdough loaf', 'pantry', 0], ['gnoc', 'Gnocchi', 'pantry', 0], ['pesto', 'Pesto jar', 'pantry', 0], ['eggs', 'Eggs', 'fridge', 0], ['oil', 'Olive oil', 'pantry', 1], ['spin', 'Baby spinach', 'fridge', 0]].map(([id, name, loc, staple]) => ({
    id,
    name,
    loc,
    staple: !!staple,
    have: true
  }));
  // start a few out-of-stock for realism
  for (const id of ['beef', 'lemon', 'salmon', 'coco', 'buns', 'eggs']) inv.find(i => i.id === id).have = false;
  const R = (id, name, tags, mins, serves, ing, steps) => ({
    id,
    name,
    tags,
    mins,
    serves,
    ing,
    steps
  });
  const recipes = [R('bolo', 'Weeknight Bolognese', ['batch'], 45, 4, ['beef', 'spag', 'toms', 'onion', 'garlic', 'parm', 'oil'], ['Sweat onion + garlic in olive oil.', 'Brown the beef hard, don\u2019t crowd it.', 'Tip in tomatoes, simmer 30 min.', 'Toss with spaghetti, bury in parm.']), R('stir', 'Garlic Butter Stir-Fry', ['veg', 'quick'], 20, 2, ['mixveg', 'garlic', 'butter', 'soy', 'rice'], ['Get rice going first.', 'Screaming-hot pan, veg in, keep it moving.', 'Butter + garlic + soy off the heat.', 'Serve over rice.']), R('sheet', 'Sheet-Pan Lemon Chicken', [], 50, 4, ['chix', 'lemon', 'pots', 'garlic', 'oil'], ['220\u00b0C. Toss everything on one pan.', 'Lemon halves cut-side down.', 'Roast 40 min, skin side up.', 'Squeeze the roasted lemons over.']), R('riso', 'Mushroom Risotto', ['veg'], 40, 3, ['arbo', 'mush', 'onion', 'butter', 'parm', 'garlic'], ['Brown mushrooms first, set aside.', 'Toast rice in butter with onion.', 'Ladle stock, stir, repeat ~20 min.', 'Fold in mushrooms + parm.']), R('curryx', 'Chickpea Coconut Curry', ['veg', 'batch', 'quick'], 25, 4, ['chick', 'coco', 'curry', 'onion', 'garlic', 'rice', 'spin'], ['Fry curry paste with onion + garlic.', 'Chickpeas + coconut milk, simmer 15.', 'Wilt in spinach at the end.', 'Rice on the side.']), R('smash', 'Smash Burgers', ['quick'], 20, 2, ['beef', 'buns', 'ched', 'onion', 'butter'], ['Loose beef balls, hot griddle.', 'SMASH. 90 seconds. Flip.', 'Cheese on, buns buttered + toasted.', 'Stack with shaved onion.']), R('misos', 'Miso Salmon + Rice', ['quick'], 25, 2, ['salmon', 'miso', 'soy', 'rice', 'butter'], ['Whisk miso + soy + knob of butter.', 'Brush salmon, grill 8 min.', 'Glaze again halfway.', 'Serve on rice, spoon over pan juice.']), R('rvp', 'Roast Veg Pesto Pasta', ['veg', 'batch'], 35, 4, ['spag', 'pesto', 'mush', 'onion', 'parm', 'oil'], ['Roast veg at 200\u00b0C till edges char.', 'Cook pasta, save a mug of water.', 'Pesto + pasta water = sauce.', 'Toss everything, parm on top.']), R('tacos', 'Beef Tacos', ['quick'], 25, 3, ['beef', 'tort', 'taco', 'ched', 'onion'], ['Brown beef, dust with seasoning.', 'Splash of water, simmer 5.', 'Char tortillas on the flame.', 'Build. No plate survives.']), R('soup', 'Tomato Soup + Grilled Cheese', ['veg', 'quick'], 20, 2, ['toms', 'onion', 'garlic', 'butter', 'bread', 'ched'], ['Blitz tomatoes, onion, garlic. Simmer.', 'Butter the OUTSIDE of the bread.', 'Low and slow till molten.', 'Dunk. Mandatory.']), R('fried', 'Leftover Fried Rice', ['veg', 'quick'], 15, 2, ['rice', 'eggs', 'mixveg', 'soy', 'garlic', 'oil'], ['Day-old rice only.', 'Egg first, scramble hard, out.', 'Rice + veg, high heat, soy at the edge.', 'Egg back in. Done in 15.']), R('gnop', 'Pesto Gnocchi', ['veg', 'quick'], 15, 2, ['gnoc', 'pesto', 'parm', 'butter', 'spin'], ['Pan-fry gnocchi in butter till crisp.', 'No boiling. Trust.', 'Pesto + spinach off heat.', 'Parm avalanche.'])];
  const receipt = {
    store: 'MEGAMART #0442',
    date: '07/22/2026',
    items: [{
      name: 'GRND BEEF 80/20',
      map: 'beef'
    }, {
      name: 'LEMONS NET 4CT',
      map: 'lemon'
    }, {
      name: 'SALMON ATL FZN',
      map: 'salmon'
    }, {
      name: 'CCNUT MILK 400ML',
      map: 'coco'
    }, {
      name: 'EGGS LG 12CT',
      map: 'eggs'
    }, {
      name: 'BRIOCHE BUNS 6',
      map: 'buns'
    }, {
      name: 'KOMBUCHA GNGR',
      map: null
    }, {
      name: 'DARK CHOC 85%',
      map: null
    }]
  };
  const aisle = {
    fridge: 'CHILLED',
    freezer: 'FROZEN',
    pantry: 'DRY GOODS'
  };
  return {
    inv,
    recipes,
    receipt,
    aisle
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/pantry/data.js", error: String((e && e.message) || e) }); }

// ui_kits/pantry/ui.jsx
try { (() => {
const C = {
  blue: '#2d6cff',
  sky: '#0a84e0',
  cobalt: '#2d6cff',
  cyan: '#00d9ff',
  pink: '#ff2d87',
  green: '#39ff6a',
  coral: '#ff6050',
  ink: '#0a0a0a',
  panel: '#101010',
  line: 'rgba(255,255,255,.12)',
  dim: 'rgba(255,255,255,.45)'
};
const Lab = ({
  c = C.dim,
  style,
  children
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 9,
    fontWeight: 700,
    letterSpacing: '.2em',
    textTransform: 'uppercase',
    color: c,
    ...style
  }
}, children);
const Tag = ({
  c = C.cyan,
  solid,
  children,
  style
}) => /*#__PURE__*/React.createElement("span", {
  style: {
    fontSize: 8,
    fontWeight: 700,
    letterSpacing: '.14em',
    textTransform: 'uppercase',
    padding: '2px 6px',
    border: `1px solid ${c}`,
    color: solid ? '#000' : c,
    background: solid ? c : 'transparent',
    ...style
  }
}, children);
const Btn = ({
  c = C.cobalt,
  solid,
  onClick,
  disabled,
  children,
  style
}) => /*#__PURE__*/React.createElement("button", {
  onClick: onClick,
  disabled: disabled,
  className: "db",
  style: {
    fontFamily: 'inherit',
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: '.14em',
    textTransform: 'uppercase',
    padding: 'calc(8px*var(--den)) 14px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    border: `1px solid ${c}`,
    color: solid ? '#000' : c,
    background: solid ? c : 'transparent',
    opacity: disabled ? .35 : 1,
    ...style
  }
}, children);
const Dot = ({
  on
}) => /*#__PURE__*/React.createElement("span", {
  style: {
    width: 7,
    height: 7,
    borderRadius: 99,
    flexShrink: 0,
    background: on ? C.green : C.coral,
    boxShadow: on ? `0 0 6px ${C.green}` : 'none',
    display: 'inline-block'
  }
});
const Panel = ({
  title,
  c = C.cyan,
  right,
  children,
  style,
  tex
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    border: `1px solid ${C.line}`,
    background: C.panel,
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    ...style
  }
}, tex ? /*#__PURE__*/React.createElement("div", {
  className: `tex ${tex}`
}) : null, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 'calc(8px*var(--den)) 10px',
    borderBottom: `1px solid ${C.line}`,
    position: 'relative',
    zIndex: 1
  }
}, /*#__PURE__*/React.createElement(Lab, {
  c: c
}, title), right), /*#__PURE__*/React.createElement("div", {
  style: {
    padding: 'calc(10px*var(--den))',
    position: 'relative',
    zIndex: 1,
    flex: 1,
    minHeight: 0,
    overflowY: 'auto'
  }
}, children));
const Field = ({
  label,
  children
}) => /*#__PURE__*/React.createElement("label", {
  style: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5
  }
}, /*#__PURE__*/React.createElement(Lab, null, label), children);
const inputStyle = {
  fontFamily: 'inherit',
  fontSize: 12,
  color: '#fff',
  background: '#000',
  border: `1px solid ${C.line}`,
  padding: 'calc(8px*var(--den)) 10px',
  outline: 'none'
};
const Toggle = ({
  on,
  onClick,
  children
}) => /*#__PURE__*/React.createElement("button", {
  onClick: onClick,
  className: "db",
  style: {
    fontFamily: 'inherit',
    fontSize: 9,
    fontWeight: 700,
    letterSpacing: '.14em',
    textTransform: 'uppercase',
    padding: '5px 9px',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    border: `1px solid ${on ? C.cobalt : C.line}`,
    color: on ? C.cobalt : C.dim,
    background: on ? 'rgba(45,108,255,.08)' : 'transparent'
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    width: 6,
    height: 6,
    background: on ? C.cobalt : 'rgba(255,255,255,.2)'
  }
}), children);
// recipe/inventory helpers
const missingOf = (r, inv) => r.ing.filter(id => !inv.find(i => i.id === id).have);
const canMake = (r, inv) => missingOf(r, inv).length === 0;
const invName = (inv, id) => (inv.find(i => i.id === id) || {}).name || id;
Object.assign(window, {
  C,
  Lab,
  Tag,
  Btn,
  Dot,
  Panel,
  Field,
  inputStyle,
  Toggle,
  missingOf,
  canMake,
  invName
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/pantry/ui.jsx", error: String((e && e.message) || e) }); }

// ui_kits/pantry/views-a.jsx
try { (() => {
function Library({
  recipes,
  inv,
  onOpen,
  onPlanNight
}) {
  const [q, setQ] = React.useState('');
  const [tag, setTag] = React.useState(null);
  const [onlyMake, setOnlyMake] = React.useState(false);
  const tags = ['veg', 'quick', 'batch'];
  const list = recipes.filter(r => (!q || r.name.toLowerCase().includes(q.toLowerCase())) && (!tag || r.tags.includes(tag)) && (!onlyMake || canMake(r, inv)));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'calc(12px*var(--den))',
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'center',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: q,
    onChange: e => setQ(e.target.value),
    placeholder: "> search recipes_",
    style: {
      ...inputStyle,
      flex: '1 1 220px',
      borderColor: q ? C.cyan : C.line,
      color: C.cyan
    }
  }), tags.map(t => /*#__PURE__*/React.createElement(Toggle, {
    key: t,
    on: tag === t,
    onClick: () => setTag(tag === t ? null : t)
  }, t)), /*#__PURE__*/React.createElement(Toggle, {
    on: onlyMake,
    onClick: () => setOnlyMake(!onlyMake)
  }, "can make now")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill,minmax(230px,1fr))',
      gap: 'calc(10px*var(--den))',
      alignContent: 'start'
    }
  }, list.map((r, i) => {
    const miss = missingOf(r, inv);
    const accents = [C.cyan, C.pink, C.cobalt, C.green];
    const a = accents[i % 4];
    return /*#__PURE__*/React.createElement("div", {
      key: r.id,
      onClick: () => onOpen(r.id),
      className: "card",
      style: {
        border: `1px solid ${C.line}`,
        background: C.panel,
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        padding: 'calc(12px*var(--den))',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        minHeight: 120
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: `tex ${i % 3 === 0 ? 'tx-dense' : i % 3 === 1 ? 'tx-patch' : 'tx-react'}`
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        justifyContent: 'space-between',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement(Lab, {
      c: a
    }, "REC/", String(i + 1).padStart(2, '0')), miss.length === 0 ? /*#__PURE__*/React.createElement(Tag, {
      c: C.green
    }, "\u25CF CAN MAKE") : /*#__PURE__*/React.createElement(Tag, {
      c: C.coral
    }, miss.length, " MISSING")), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        zIndex: 1,
        fontFamily: "'Space Grotesk',sans-serif",
        fontWeight: 900,
        fontSize: 19,
        lineHeight: .95,
        textTransform: 'uppercase',
        letterSpacing: '-.01em'
      }
    }, r.name), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        zIndex: 1,
        marginTop: 'auto',
        display: 'flex',
        gap: 6,
        alignItems: 'center',
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement(Tag, {
      c: C.dim,
      style: {
        borderColor: C.line
      }
    }, r.mins, " MIN"), /*#__PURE__*/React.createElement(Tag, {
      c: C.dim,
      style: {
        borderColor: C.line
      }
    }, "SERVES ", r.serves), r.tags.map(t => /*#__PURE__*/React.createElement(Tag, {
      key: t,
      c: a
    }, t))));
  }), list.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1/-1',
      border: `1px dashed ${C.line}`,
      padding: 30,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(Lab, null, "// NO MATCH \u2014 LOOSEN THE FILTERS")) : null));
}
function RecipeDetail({
  r,
  inv,
  idx,
  onBack,
  onCook,
  onAddMissing,
  onToggleItem
}) {
  const miss = missingOf(r, inv);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '340px 1fr',
      gap: 'calc(12px*var(--den))',
      height: '100%',
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'calc(12px*var(--den))',
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      border: `1px solid ${C.line}`,
      background: C.panel,
      padding: 'calc(14px*var(--den))',
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "tex tx-cosmo",
    style: {
      opacity: 'calc(.35*var(--texop))'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    className: "db",
    style: {
      fontFamily: 'inherit',
      background: 'none',
      border: 'none',
      color: C.cyan,
      fontSize: 9,
      letterSpacing: '.18em',
      cursor: 'pointer',
      padding: 0,
      marginBottom: 10
    }
  }, "\u25C0 BACK TO LIBRARY"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Space Grotesk',sans-serif",
      fontWeight: 900,
      fontSize: 32,
      lineHeight: .92,
      textTransform: 'uppercase',
      letterSpacing: '-.01em'
    }
  }, r.name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      marginTop: 10,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    c: C.cobalt,
    solid: true
  }, r.mins, " MIN"), /*#__PURE__*/React.createElement(Tag, {
    c: C.cyan
  }, "SERVES ", r.serves), r.tags.map(t => /*#__PURE__*/React.createElement(Tag, {
    key: t,
    c: C.pink
  }, t))))), /*#__PURE__*/React.createElement(Panel, {
    title: `// INGREDIENTS — ${r.ing.length}`,
    c: miss.length ? C.coral : C.green,
    style: {
      flex: 1,
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, r.ing.map(id => {
    const it = inv.find(i => i.id === id);
    return /*#__PURE__*/React.createElement("div", {
      key: id,
      onClick: () => onToggleItem(id),
      className: "row",
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 9,
        padding: 'calc(7px*var(--den)) 8px',
        cursor: 'pointer',
        borderBottom: `1px solid rgba(255,255,255,.05)`
      }
    }, /*#__PURE__*/React.createElement(Dot, {
      on: it.have
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        flex: 1,
        color: it.have ? '#fff' : C.dim,
        textDecoration: it.have ? 'none' : 'line-through'
      }
    }, it.name), /*#__PURE__*/React.createElement(Tag, {
      c: C.dim,
      style: {
        borderColor: 'transparent'
      }
    }, window.PANTRY.aisle[it.loc]));
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    c: C.green,
    solid: true,
    disabled: miss.length > 0,
    onClick: onCook,
    style: {
      flex: 1
    }
  }, "\u25B6 COOK IT \u2014 DEDUCT STOCK"), miss.length > 0 ? /*#__PURE__*/React.createElement(Btn, {
    c: C.cobalt,
    onClick: onAddMissing,
    style: {
      flex: 1
    }
  }, "+ ", miss.length, " TO SHOPPING LIST") : null)), /*#__PURE__*/React.createElement(Panel, {
    title: "// METHOD",
    c: C.cyan,
    tex: "tx-dense"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'calc(14px*var(--den))',
      maxWidth: 640
    }
  }, r.steps.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      gap: 14,
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'Space Grotesk',sans-serif",
      fontWeight: 900,
      fontSize: 30,
      color: [C.cyan, C.pink, C.cobalt, C.green][i % 4],
      lineHeight: 1,
      flexShrink: 0
    }
  }, String(i + 1).padStart(2, '0')), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      lineHeight: 1.6,
      margin: 0
    }
  }, s))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: `1px solid ${C.line}`,
      paddingTop: 10
    }
  }, /*#__PURE__*/React.createElement(Lab, null, "// EOF \u2014 SERVE HOT")))));
}
function RecipeForm({
  inv,
  onSave,
  onCancel
}) {
  const [name, setName] = React.useState('');
  const [mins, setMins] = React.useState(30);
  const [serves, setServes] = React.useState(2);
  const [tags, setTags] = React.useState([]);
  const [ing, setIng] = React.useState([]);
  const [steps, setSteps] = React.useState(['']);
  const [err, setErr] = React.useState(null);
  const toggleTag = t => setTags(tags.includes(t) ? tags.filter(x => x !== t) : [...tags, t]);
  const toggleIng = id => setIng(ing.includes(id) ? ing.filter(x => x !== id) : [...ing, id]);
  const save = () => {
    if (!name.trim()) return setErr('NAME REQUIRED');
    if (ing.length === 0) return setErr('PICK AT LEAST ONE INGREDIENT');
    onSave({
      id: 'u' + Date.now(),
      name: name.trim(),
      tags,
      mins: +mins || 30,
      serves: +serves || 2,
      ing,
      steps: steps.filter(s => s.trim())
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'calc(12px*var(--den))',
      height: '100%',
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement(Panel, {
    title: "// NEW RECIPE \u2014 META",
    c: C.pink,
    tex: "tx-patch"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'calc(14px*var(--den))'
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "RECIPE NAME"
  }, /*#__PURE__*/React.createElement("input", {
    value: name,
    onChange: e => {
      setName(e.target.value);
      setErr(null);
    },
    placeholder: "> e.g. midnight ramen_",
    style: {
      ...inputStyle,
      fontSize: 15,
      color: C.cobalt,
      borderColor: name ? C.cobalt : C.line
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "MINUTES"
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: mins,
    onChange: e => setMins(e.target.value),
    style: inputStyle
  })), /*#__PURE__*/React.createElement(Field, {
    label: "SERVES"
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: serves,
    onChange: e => setServes(e.target.value),
    style: inputStyle
  }))), /*#__PURE__*/React.createElement(Field, {
    label: "TAGS"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, ['veg', 'quick', 'batch'].map(t => /*#__PURE__*/React.createElement(Toggle, {
    key: t,
    on: tags.includes(t),
    onClick: () => toggleTag(t)
  }, t)))), /*#__PURE__*/React.createElement(Field, {
    label: "STEPS"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, steps.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'Space Grotesk',sans-serif",
      fontWeight: 900,
      fontSize: 16,
      color: C.cyan,
      width: 24,
      flexShrink: 0,
      paddingTop: 8
    }
  }, String(i + 1).padStart(2, '0')), /*#__PURE__*/React.createElement("input", {
    value: s,
    onChange: e => setSteps(steps.map((x, j) => j === i ? e.target.value : x)),
    placeholder: "> step_",
    style: {
      ...inputStyle,
      flex: 1
    }
  }))), /*#__PURE__*/React.createElement(Btn, {
    c: C.cyan,
    onClick: () => setSteps([...steps, '']),
    style: {
      alignSelf: 'flex-start'
    }
  }, "+ STEP"))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'calc(12px*var(--den))',
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement(Panel, {
    title: `// INGREDIENTS — ${ing.length} PICKED`,
    c: C.green,
    style: {
      flex: 1,
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 6
    }
  }, inv.map(it => /*#__PURE__*/React.createElement(Toggle, {
    key: it.id,
    on: ing.includes(it.id),
    onClick: () => toggleIng(it.id)
  }, it.name)))), err ? /*#__PURE__*/React.createElement("div", {
    style: {
      border: `1px solid ${C.coral}`,
      color: C.coral,
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '.14em',
      padding: '8px 10px'
    }
  }, "\u26A0 ", err) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    c: C.cobalt,
    solid: true,
    onClick: save,
    style: {
      flex: 1
    }
  }, "SAVE TO LIBRARY"), /*#__PURE__*/React.createElement(Btn, {
    c: C.dim,
    onClick: onCancel,
    style: {
      borderColor: C.line
    }
  }, "DISCARD"))));
}
Object.assign(window, {
  Library,
  RecipeDetail,
  RecipeForm
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/pantry/views-a.jsx", error: String((e && e.message) || e) }); }

// ui_kits/pantry/views-b.jsx
try { (() => {
function Inventory({
  inv,
  onToggle,
  onRestockAll,
  onScan
}) {
  const out = inv.filter(i => !i.have);
  const outStaples = out.filter(i => i.staple);
  const locs = ['fridge', 'freezer', 'pantry'];
  const locColor = {
    fridge: C.cyan,
    freezer: C.sky,
    pantry: C.cobalt
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'calc(12px*var(--den))',
      height: '100%',
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      border: `1px solid ${out.length ? C.coral : C.green}`,
      background: out.length ? 'rgba(255,96,80,.06)' : 'rgba(57,255,106,.05)',
      padding: 'calc(10px*var(--den)) 12px',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Lab, {
    c: out.length ? C.coral : C.green
  }, out.length ? `\u26A0 ${out.length} OUT OF STOCK${outStaples.length ? ` \u00B7 ${outStaples.length} STAPLE${outStaples.length > 1 ? 'S' : ''}` : ''}` : '\u25CF ALL STOCKED — KITCHEN NOMINAL'), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4,
      flexWrap: 'wrap',
      flex: 1
    }
  }, out.slice(0, 6).map(i => /*#__PURE__*/React.createElement(Tag, {
    key: i.id,
    c: i.staple ? C.coral : C.dim,
    style: i.staple ? {} : {
      borderColor: C.line
    }
  }, i.name)), out.length > 6 ? /*#__PURE__*/React.createElement(Tag, {
    c: C.dim,
    style: {
      borderColor: 'transparent'
    }
  }, "+", out.length - 6) : null), out.length ? /*#__PURE__*/React.createElement(Btn, {
    c: C.cobalt,
    onClick: onRestockAll
  }, "+ ALL TO SHOPPING") : null, /*#__PURE__*/React.createElement(Btn, {
    c: C.pink,
    solid: true,
    onClick: onScan
  }, "\u25A7 SCAN RECEIPT")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 'calc(12px*var(--den))'
    }
  }, locs.map(loc => {
    const items = inv.filter(i => i.loc === loc);
    const have = items.filter(i => i.have).length;
    return /*#__PURE__*/React.createElement(Panel, {
      key: loc,
      title: `// ${window.PANTRY.aisle[loc]} — ${have}/${items.length}`,
      c: locColor[loc],
      tex: loc === 'pantry' ? 'tx-patch' : loc === 'fridge' ? 'tx-dense' : 'tx-react'
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }
    }, items.map(it => /*#__PURE__*/React.createElement("div", {
      key: it.id,
      onClick: () => onToggle(it.id),
      className: "row",
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 9,
        padding: 'calc(6px*var(--den)) 8px',
        cursor: 'pointer',
        borderBottom: '1px solid rgba(255,255,255,.05)'
      }
    }, /*#__PURE__*/React.createElement(Dot, {
      on: it.have
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        flex: 1,
        color: it.have ? '#fff' : C.dim,
        textDecoration: it.have ? 'none' : 'line-through'
      }
    }, it.name), it.staple ? /*#__PURE__*/React.createElement(Tag, {
      c: C.dim,
      style: {
        borderColor: 'transparent',
        color: 'rgba(255,255,255,.3)'
      }
    }, "STAPLE") : null, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 8,
        letterSpacing: '.14em',
        color: it.have ? C.green : C.coral
      }
    }, it.have ? 'HAVE' : 'OUT')))));
  })));
}
function Shopping({
  list,
  inv,
  onCheck,
  onClearDone,
  onAdd,
  onRestock
}) {
  const [txt, setTxt] = React.useState('');
  const done = list.filter(i => i.done).length;
  const add = () => {
    if (txt.trim()) {
      onAdd(txt.trim());
      setTxt('');
    }
  };
  const groups = {};
  list.forEach(i => {
    const g = i.loc ? window.PANTRY.aisle[i.loc] : 'OTHER';
    (groups[g] = groups[g] || []).push(i);
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 300px',
      gap: 'calc(12px*var(--den))',
      height: '100%',
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement(Panel, {
    title: `// SHOPPING LIST — ${done}/${list.length} IN CART`,
    c: C.cobalt,
    right: done ? /*#__PURE__*/React.createElement(Btn, {
      c: C.green,
      onClick: onClearDone,
      style: {
        padding: '3px 8px',
        fontSize: 8
      }
    }, "RESTOCK ", done, " \\u2192 INVENTORY") : null
  }, list.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      border: `1px dashed ${C.line}`,
      padding: 30,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(Lab, null, "// LIST EMPTY \u2014 NICE")) : Object.entries(groups).map(([g, items]) => /*#__PURE__*/React.createElement("div", {
    key: g,
    style: {
      marginBottom: 'calc(14px*var(--den))'
    }
  }, /*#__PURE__*/React.createElement(Lab, {
    style: {
      marginBottom: 6,
      color: 'rgba(255,255,255,.3)'
    }
  }, "\u25AA ", g), items.map(it => /*#__PURE__*/React.createElement("div", {
    key: it.key,
    onClick: () => onCheck(it.key),
    className: "row",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: 'calc(7px*var(--den)) 8px',
      cursor: 'pointer',
      borderBottom: '1px solid rgba(255,255,255,.05)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 12,
      height: 12,
      border: `1px solid ${it.done ? C.green : C.line}`,
      background: it.done ? C.green : 'transparent',
      color: '#000',
      fontSize: 9,
      lineHeight: '12px',
      textAlign: 'center',
      flexShrink: 0
    }
  }, it.done ? '\u2713' : ''), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      flex: 1,
      color: it.done ? C.dim : '#fff',
      textDecoration: it.done ? 'line-through' : 'none'
    }
  }, it.name), it.from ? /*#__PURE__*/React.createElement(Tag, {
    c: C.pink,
    style: {
      borderColor: 'transparent'
    }
  }, "\u2190 ", it.from) : null))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'calc(12px*var(--den))'
    }
  }, /*#__PURE__*/React.createElement(Panel, {
    title: "// ADD ITEM",
    c: C.cyan
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: txt,
    onChange: e => setTxt(e.target.value),
    onKeyDown: e => e.key === 'Enter' && add(),
    placeholder: "> item_",
    style: {
      ...inputStyle,
      flex: 1,
      minWidth: 0
    }
  }), /*#__PURE__*/React.createElement(Btn, {
    c: C.cyan,
    solid: true,
    onClick: add
  }, "+"))), /*#__PURE__*/React.createElement(Panel, {
    title: "// OUT OF STOCK",
    c: C.coral,
    tex: "tx-react",
    style: {
      flex: 1,
      minHeight: 0
    }
  }, inv.filter(i => !i.have).map(i => /*#__PURE__*/React.createElement("div", {
    key: i.id,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '5px 0',
      borderBottom: '1px solid rgba(255,255,255,.05)'
    }
  }, /*#__PURE__*/React.createElement(Dot, {
    on: false
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      flex: 1,
      color: C.dim
    }
  }, i.name), list.some(l => l.invId === i.id) ? /*#__PURE__*/React.createElement(Tag, {
    c: C.dim,
    style: {
      borderColor: 'transparent'
    }
  }, "LISTED") : /*#__PURE__*/React.createElement(Btn, {
    c: C.cobalt,
    onClick: () => onRestock(i.id),
    style: {
      padding: '2px 7px',
      fontSize: 8
    }
  }, "+ LIST"))))));
}
const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
function Planner({
  recipes,
  inv,
  plan,
  prefs,
  onSetPrefs,
  onAssign,
  onClear,
  onAutoBuild,
  onOpen
}) {
  const [picking, setPicking] = React.useState(null); // day index
  const pool = recipes.filter(r => (!prefs.veg || r.tags.includes('veg')) && (!prefs.quick || r.mins <= 30) && (!prefs.stock || canMake(r, inv)));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'calc(12px*var(--den))',
      height: '100%',
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'center',
      flexWrap: 'wrap',
      border: `1px solid ${C.line}`,
      background: C.panel,
      padding: 'calc(9px*var(--den)) 12px'
    }
  }, /*#__PURE__*/React.createElement(Lab, {
    c: C.pink
  }, "// DIET FILTER"), /*#__PURE__*/React.createElement(Toggle, {
    on: prefs.veg,
    onClick: () => onSetPrefs({
      ...prefs,
      veg: !prefs.veg
    })
  }, "vegetarian"), /*#__PURE__*/React.createElement(Toggle, {
    on: prefs.quick,
    onClick: () => onSetPrefs({
      ...prefs,
      quick: !prefs.quick
    })
  }, "\u226430 min"), /*#__PURE__*/React.createElement(Toggle, {
    on: prefs.stock,
    onClick: () => onSetPrefs({
      ...prefs,
      stock: !prefs.stock
    })
  }, "use what i have"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(Lab, null, pool.length, " RECIPES MATCH"), /*#__PURE__*/React.createElement(Btn, {
    c: C.pink,
    solid: true,
    onClick: () => onAutoBuild(pool)
  }, "\u26A1 AUTO-BUILD WEEK")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      display: 'grid',
      gridTemplateColumns: 'repeat(7,1fr)',
      gap: 'calc(8px*var(--den))'
    }
  }, DAYS.map((d, di) => {
    const rid = plan[di];
    const r = rid && recipes.find(x => x.id === rid);
    const today = di === 2; // WED, per sample date
    return /*#__PURE__*/React.createElement("div", {
      key: d,
      style: {
        border: `1px solid ${today ? C.cobalt : C.line}`,
        background: C.panel,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
        position: 'relative',
        overflow: 'hidden'
      }
    }, di % 2 === 0 ? /*#__PURE__*/React.createElement("div", {
      className: "tex tx-dense"
    }) : null, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '7px 8px',
        borderBottom: `1px solid ${C.line}`,
        display: 'flex',
        justifyContent: 'space-between',
        position: 'relative',
        zIndex: 1
      }
    }, /*#__PURE__*/React.createElement(Lab, {
      c: today ? C.cobalt : C.dim
    }, d), today ? /*#__PURE__*/React.createElement(Tag, {
      c: C.cobalt,
      solid: true
    }, "NOW") : null), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        padding: 'calc(8px*var(--den))',
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 6
      }
    }, r ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      onClick: () => onOpen(r.id),
      style: {
        fontFamily: "'Space Grotesk',sans-serif",
        fontWeight: 900,
        fontSize: 14,
        lineHeight: .95,
        textTransform: 'uppercase',
        cursor: 'pointer',
        color: canMake(r, inv) ? '#fff' : C.coral
      }
    }, r.name), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 4,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement(Tag, {
      c: C.dim,
      style: {
        borderColor: C.line
      }
    }, r.mins, "M"), canMake(r, inv) ? /*#__PURE__*/React.createElement(Tag, {
      c: C.green
    }, "\u25CF") : /*#__PURE__*/React.createElement(Tag, {
      c: C.coral
    }, missingOf(r, inv).length, " MISS")), /*#__PURE__*/React.createElement("button", {
      onClick: () => onClear(di),
      className: "db",
      style: {
        marginTop: 'auto',
        fontFamily: 'inherit',
        background: 'none',
        border: 'none',
        color: 'rgba(255,255,255,.25)',
        fontSize: 8,
        letterSpacing: '.14em',
        cursor: 'pointer',
        textAlign: 'left',
        padding: 0
      }
    }, "\u2715 CLEAR")) : /*#__PURE__*/React.createElement("button", {
      onClick: () => setPicking(picking === di ? null : di),
      className: "db",
      style: {
        flex: 1,
        fontFamily: 'inherit',
        background: 'none',
        border: `1px dashed ${picking === di ? C.cyan : C.line}`,
        color: picking === di ? C.cyan : C.dim,
        fontSize: 10,
        letterSpacing: '.14em',
        cursor: 'pointer'
      }
    }, "+ DINNER")));
  })), picking !== null ? /*#__PURE__*/React.createElement(Panel, {
    title: `// PICK FOR ${DAYS[picking]} — FILTERED BY DIET`,
    c: C.cyan,
    style: {
      maxHeight: 180
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 6
    }
  }, pool.map(r => /*#__PURE__*/React.createElement(Toggle, {
    key: r.id,
    on: false,
    onClick: () => {
      onAssign(picking, r.id);
      setPicking(null);
    }
  }, r.name, " \\u00B7 ", r.mins, "m")), pool.length === 0 ? /*#__PURE__*/React.createElement(Lab, null, "// NOTHING MATCHES THE DIET FILTER") : null)) : null);
}
function Scanner({
  onClose,
  onCommit
}) {
  const [phase, setPhase] = React.useState('idle'); // idle -> scanning -> done
  const [prog, setProg] = React.useState(0);
  const rc = window.PANTRY.receipt;
  React.useEffect(() => {
    if (phase !== 'scanning') return;
    const t = setInterval(() => setProg(p => {
      if (p >= 100) {
        clearInterval(t);
        setPhase('done');
        return 100;
      }
      return p + 4;
    }), 50);
    return () => clearInterval(t);
  }, [phase]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 50,
      background: 'rgba(0,0,0,.75)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: 440,
      maxWidth: '90vw',
      background: C.ink,
      border: `1px solid ${C.pink}`,
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "tex tx-cosmo",
    style: {
      opacity: 'calc(.25*var(--texop))'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 1,
      padding: 'calc(16px*var(--den))',
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement(Lab, {
    c: C.pink
  }, "// RECEIPT SCANNER v0.2"), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "db",
    style: {
      fontFamily: 'inherit',
      background: 'none',
      border: 'none',
      color: C.dim,
      cursor: 'pointer',
      fontSize: 11,
      padding: 0
    }
  }, "\u2715")), phase === 'idle' ? /*#__PURE__*/React.createElement("div", {
    onClick: () => setPhase('scanning'),
    style: {
      border: `2px dashed ${C.pink}`,
      padding: '36px 20px',
      textAlign: 'center',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Space Grotesk',sans-serif",
      fontWeight: 900,
      fontSize: 22,
      textTransform: 'uppercase'
    }
  }, "DROP RECEIPT"), /*#__PURE__*/React.createElement(Lab, {
    style: {
      marginTop: 6
    }
  }, "or click to simulate camera capture")) : null, phase === 'scanning' ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.cyan
    }
  }, "> OCR PASS ", prog < 50 ? 1 : 2, "/2 \\u2014 ", rc.store, "..."), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 8,
      border: `1px solid ${C.line}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      width: prog + '%',
      background: `repeating-linear-gradient(45deg,${C.pink},${C.pink} 6px,${C.cobalt} 6px,${C.cobalt} 12px)`
    }
  })), /*#__PURE__*/React.createElement(Lab, null, prog, "% \\u2014 EXTRACTING LINE ITEMS")) : null, phase === 'done' ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      border: `1px solid ${C.line}`,
      padding: 10,
      background: '#050505'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement(Lab, {
    c: C.cobalt
  }, rc.store), /*#__PURE__*/React.createElement(Lab, null, rc.date)), rc.items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'center',
      padding: '4px 0',
      borderBottom: '1px solid rgba(255,255,255,.05)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      flex: 1,
      color: '#fff'
    }
  }, it.name), it.map ? /*#__PURE__*/React.createElement(Tag, {
    c: C.green
  }, "\u2192 ", invName(window.PANTRY.inv, it.map)) : /*#__PURE__*/React.createElement(Tag, {
    c: C.dim,
    style: {
      borderColor: C.line
    }
  }, "NEW / SKIP")))), /*#__PURE__*/React.createElement(Btn, {
    c: C.green,
    solid: true,
    onClick: onCommit
  }, "\u2713 RESTOCK ", rc.items.filter(i => i.map).length, " MATCHED ITEMS")) : null)));
}
Object.assign(window, {
  Inventory,
  Shopping,
  Planner,
  Scanner,
  DAYS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/pantry/views-b.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.BadgeCount = __ds_scope.BadgeCount;

__ds_ns.BadgeRow = __ds_scope.BadgeRow;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.ButtonRow = __ds_scope.ButtonRow;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.CardSection = __ds_scope.CardSection;

__ds_ns.CardGrid = __ds_scope.CardGrid;

__ds_ns.Field = __ds_scope.Field;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.NodeCard = __ds_scope.NodeCard;

__ds_ns.SectorCard = __ds_scope.SectorCard;

__ds_ns.StatCard = __ds_scope.StatCard;

__ds_ns.NodeMeter = __ds_scope.NodeMeter;

__ds_ns.Progress = __ds_scope.Progress;

__ds_ns.ProgressSegments = __ds_scope.ProgressSegments;

__ds_ns.ProgressStack = __ds_scope.ProgressStack;

__ds_ns.ProgressAscii = __ds_scope.ProgressAscii;

__ds_ns.Spinner = __ds_scope.Spinner;

__ds_ns.MONO = __ds_scope.MONO;

__ds_ns.RAMP = __ds_scope.RAMP;

__ds_ns.SECOND_SET = __ds_scope.SECOND_SET;

__ds_ns.DANGER = __ds_scope.DANGER;

__ds_ns.SURFACES = __ds_scope.SURFACES;

__ds_ns.GEOMETRY = __ds_scope.GEOMETRY;

__ds_ns.TEXTURES = __ds_scope.TEXTURES;

__ds_ns.MOTION = __ds_scope.MOTION;

__ds_ns.ANIMATIONS = __ds_scope.ANIMATIONS;

__ds_ns.MOTION_CSS = __ds_scope.MOTION_CSS;

__ds_ns.BLOCKS = __ds_scope.BLOCKS;

__ds_ns.BOX = __ds_scope.BOX;

__ds_ns.SPINNER_FRAMES = __ds_scope.SPINNER_FRAMES;

__ds_ns.PULSE_FRAMES = __ds_scope.PULSE_FRAMES;

__ds_ns.LABEL_CSS = __ds_scope.LABEL_CSS;

})();
