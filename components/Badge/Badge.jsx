import React from 'react';
import { MONO, DANGER, hueOf, surfaceOf, geometryStyle, signalFilter, glitchClass, glitchAttrs, checkerFill, injectCSS } from '../core.js';

injectCSS('dd-badge', `
.dd-badge{display:inline-flex;align-items:center;gap:5px;font-family:${MONO};font-weight:700;text-transform:uppercase;border:1px solid transparent;white-space:nowrap;vertical-align:middle}
.dd-badge-pip{width:5px;height:5px;background:currentColor;flex:none}
.dd-badge-dot{width:6px;height:6px;flex:none;border-radius:999px}
`);

const SIZES = {
  sm: { height: 16, fontSize: 8, padding: '0 5px', letterSpacing: '0.16em' },
  md: { height: 20, fontSize: 9, padding: '0 7px', letterSpacing: '0.18em' },
  lg: { height: 26, fontSize: 11, padding: '0 10px', letterSpacing: '0.18em' }
};

/* Status is the one place hue is NOT seeded — an operator reads colour as
   meaning here, so live/warn/down/idle map to fixed stops. */
const STATUS = {
  ok:   { accent: 'green' },
  warn: { accent: 'orange' },
  down: { danger: true },
  idle: { quiet: true }
};

export function Badge({
  children, label, id, accent, status, variant = 'solid', size = 'md', surface = 'black',
  signal = 'live', geometry = 'sharp', glitch = 'off',
  pip = false, dot = false, checker = false, count,
  className = '', style, ...rest
}) {
  const s = surfaceOf(surface);
  const text = label != null ? label : children;
  const st = status ? STATUS[status] : null;
  const isDanger = variant === 'danger' || (st && st.danger);
  const isQuiet = variant === 'quiet' || (st && st.quiet);
  const hue = hueOf({ accent: (st && st.accent) || accent, id, label: typeof text === 'string' ? text : label, surface });
  const sz = SIZES[size] || SIZES.md;

  let skin;
  if (isDanger) skin = { background: DANGER.fill, color: DANGER.ink, borderColor: DANGER.fill };
  else if (isQuiet) skin = { background: 'transparent', color: s.dim, borderColor: s.rule };
  else if (variant === 'ghost') skin = { background: 'transparent', color: hue.fill, borderColor: hue.fill };
  else skin = { background: hue.fill, color: hue.ink, borderColor: hue.fill };

  const seam = checker
    ? { ...checkerFill(isQuiet ? s.rule : hue.ink, isQuiet ? s.bg : hue.fill, 8), width: 10, alignSelf: 'stretch', flex: 'none', marginLeft: -1 }
    : null;

  return (
    <span
      className={glitchClass(glitch, 'dd-badge ' + className)}
      {...glitchAttrs(glitch, text)}
      style={{
        height: sz.height, fontSize: sz.fontSize, letterSpacing: sz.letterSpacing,
        padding: checker ? 0 : sz.padding,
        ...skin, ...geometryStyle(geometry),
        filter: signalFilter(signal),
        ...style
      }}
      {...rest}
    >
      {seam ? <span aria-hidden="true" style={seam}></span> : null}
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: checker ? sz.padding : 0 }}>
        {dot ? <span aria-hidden="true" className="dd-badge-dot" style={{ background: isQuiet ? s.dim : 'currentColor' }}></span> : null}
        {pip ? <span aria-hidden="true" className="dd-badge-pip"></span> : null}
        {text}
        {count != null ? <span style={{ opacity: 0.62, fontVariantNumeric: 'tabular-nums' }}>{count}</span> : null}
      </span>
    </span>
  );
}

/* Numeric-only chip. Tabular figures so a column of counts aligns. */
export function BadgeCount({ value, id, accent, surface = 'black', size = 'md', geometry = 'sharp', style, ...rest }) {
  const hue = hueOf({ accent, id, label: String(value), surface });
  const sz = SIZES[size] || SIZES.md;
  return (
    <span
      className="dd-badge"
      style={{
        minWidth: sz.height, height: sz.height, fontSize: sz.fontSize, letterSpacing: 0,
        justifyContent: 'center', padding: '0 4px', fontVariantNumeric: 'tabular-nums',
        background: hue.fill, color: hue.ink, borderColor: hue.fill,
        ...geometryStyle(geometry), ...style
      }}
      {...rest}
    >{value}</span>
  );
}

export function BadgeRow({ children, gap = 6, wrap = true, style }) {
  return <div style={{ display: 'flex', gap, flexWrap: wrap ? 'wrap' : 'nowrap', alignItems: 'center', ...style }}>{children}</div>;
}
