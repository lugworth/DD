import React from 'react';
import { MONO, hueOf, surfaceOf, geometryStyle, injectCSS, LABEL_CSS, BLOCKS, SPINNER_FRAMES, PULSE_FRAMES, MOTION_CSS } from '../core.js';

injectCSS('dd-motion', MOTION_CSS);
injectCSS('dd-progress', `
.dd-prog{font-family:${MONO};display:flex;flex-direction:column;gap:6px;min-width:0}
.dd-prog-hd{${LABEL_CSS};margin:0;display:flex;justify-content:space-between;gap:10px;align-items:baseline}
.dd-prog-track{display:flex;width:100%;overflow:hidden}
.dd-prog-fill{height:100%;transition:width .25s cubic-bezier(.16,1,.3,1)}
.dd-prog-seg{display:flex;width:100%;gap:2px}
.dd-prog-seg > span{flex:1}
.dd-ascii{font-family:${MONO};white-space:pre;letter-spacing:.02em;line-height:1}
@keyframes dd-indet{0%{transform:translateX(-100%)}100%{transform:translateX(400%)}}
.dd-prog-indet{animation:dd-indet 1.1s steps(6,end) infinite;width:25%!important}
@media (prefers-reduced-motion:reduce){.dd-prog-indet{animation-duration:2.4s}}
`);

const HEIGHTS = { sm: 4, md: 6, lg: 10 };

/* Solid-fill bar. Hue is seeded from the label unless pinned. */
export function Progress({
  value = 0, label, note, id, accent, surface = 'black', size = 'md',
  geometry = 'sharp', indeterminate = false, showValue = false,
  className = '', style, ...rest
}) {
  const s = surfaceOf(surface);
  const hue = hueOf({ accent, id, label, surface });
  const h = HEIGHTS[size] != null ? HEIGHTS[size] : size;
  const pct = Math.round(Math.max(0, Math.min(1, value)) * 100);

  return (
    <div className={'dd-prog ' + className} style={{ color: s.fg, ...style }}>
      {label || note || showValue ? (
        <p className="dd-prog-hd" style={{ color: s.dim }}>
          <span>{label}</span>
          <span style={{ color: s.faint, fontVariantNumeric: 'tabular-nums' }}>{note != null ? note : showValue ? pct + '%' : null}</span>
        </p>
      ) : null}
      <div
        className="dd-prog-track"
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
        style={{ height: h, background: s.faint, ...geometryStyle(geometry) }}
        {...rest}
      >
        <span
          className={'dd-prog-fill' + (indeterminate ? ' dd-prog-indet' : '')}
          style={{ width: indeterminate ? undefined : pct + '%', background: hue.fill }}
        ></span>
      </div>
    </div>
  );
}

/* Segmented bar — discrete units, the honest form when the total is countable
   (14 of 20 nodes, not 70%). */
export function ProgressSegments({
  value = 0, total = 10, label, id, accent, surface = 'black', size = 'md',
  className = '', style, ...rest
}) {
  const s = surfaceOf(surface);
  const hue = hueOf({ accent, id, label, surface });
  const h = HEIGHTS[size] != null ? HEIGHTS[size] : size;
  const n = Math.max(0, Math.min(total, Math.round(value)));

  return (
    <div className={'dd-prog ' + className} style={{ color: s.fg, ...style }}>
      {label ? (
        <p className="dd-prog-hd" style={{ color: s.dim }}>
          <span>{label}</span>
          <span style={{ color: s.faint, fontVariantNumeric: 'tabular-nums' }}>{n}/{total}</span>
        </p>
      ) : null}
      <div className="dd-prog-seg" role="progressbar" aria-valuenow={n} aria-valuemin={0} aria-valuemax={total} aria-label={label} style={{ height: h }} {...rest}>
        {Array.from({ length: total }, (_, i) => (
          <span key={i} style={{ background: i < n ? hue.fill : s.faint }}></span>
        ))}
      </div>
    </div>
  );
}

/* Stacked bar for a breakdown — [label, count, accent] triples. */
export function ProgressStack({
  parts = [], label, surface = 'black', size = 'md', legend = true,
  className = '', style, ...rest
}) {
  const s = surfaceOf(surface);
  const h = HEIGHTS[size] != null ? HEIGHTS[size] : size;
  const total = parts.reduce((n, p) => n + p[1], 0) || 1;

  return (
    <div className={'dd-prog ' + className} style={{ color: s.fg, ...style }}>
      {label ? <p className="dd-prog-hd" style={{ color: s.dim }}><span>{label}</span><span style={{ color: s.faint }}>{total}</span></p> : null}
      <div className="dd-prog-track" style={{ height: h, background: s.faint }} {...rest}>
        {parts.map(([name, count, accent], i) => (
          <span key={i} style={{ width: `${(count / total) * 100}%`, background: hueOf({ accent, label: name, surface }).fill }}></span>
        ))}
      </div>
      {legend ? (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 10px', marginTop: 2 }}>
          {parts.map(([name, count, accent], i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 9, letterSpacing: '.12em', textTransform: 'uppercase', color: s.dim }}>
              <span aria-hidden="true" style={{ width: 6, height: 6, background: hueOf({ accent, label: name, surface }).fill }}></span>
              {count} {name}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

/* ASCII block meter — one of the three sanctioned ASCII jobs. */
export function ProgressAscii({
  value = 0, width = 24, label, id, accent, surface = 'black', showValue = true,
  className = '', style
}) {
  const s = surfaceOf(surface);
  const hue = hueOf({ accent, id, label, surface });
  const n = Math.max(0, Math.min(width, Math.round(value * width)));

  return (
    <div className={'dd-prog ' + className} style={{ color: s.fg, gap: 4, ...style }}>
      {label ? <p className="dd-prog-hd" style={{ color: s.dim }}><span>{label}</span></p> : null}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span className="dd-ascii" style={{ fontSize: 12 }}>
          <span style={{ color: hue.fill }}>{BLOCKS.full.repeat(n)}</span>
          <span style={{ color: s.faint }}>{BLOCKS.light.repeat(width - n)}</span>
        </span>
        {showValue ? <span style={{ fontSize: 9, letterSpacing: '.1em', color: s.dim, fontVariantNumeric: 'tabular-nums' }}>{Math.round(value * 100)}%</span> : null}
      </div>
    </div>
  );
}

/* Stepped ASCII spinner. Quadrant frames, 8 fps — no smooth rotation. */
export function Spinner({ surface = 'black', accent, id, size = 14, label, pulse = false, style }) {
  const s = surfaceOf(surface);
  const hue = hueOf({ accent, id, label, surface });
  const frames = pulse ? PULSE_FRAMES : SPINNER_FRAMES;
  const [i, setI] = React.useState(0);

  React.useEffect(() => {
    const reduced = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion:reduce)').matches;
    const ms = reduced ? 320 : 125;
    const t = setInterval(() => setI((n) => (n + 1) % frames.length), ms);
    return () => clearInterval(t);
  }, [frames.length]);

  return (
    <span role="status" aria-label={label || 'Loading'} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: MONO, color: s.fg, ...style }}>
      <span aria-hidden="true" className="dd-ascii" style={{ color: hue.fill, fontSize: size, width: size, textAlign: 'center' }}>{frames[i]}</span>
      {label ? <span style={{ fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase', color: s.dim }}>{label}</span> : null}
    </span>
  );
}
