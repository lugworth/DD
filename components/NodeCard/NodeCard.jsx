import React from 'react';
import { MONO, hueOf, surfaceOf, geometryStyle, signalFilter, glitchClass, checkerFill, injectCSS, LABEL_CSS, BLOCKS } from '../core.js';

injectCSS('dd-nodecard', `
.dd-node{font-family:${MONO};border:1px solid transparent;display:flex;flex-direction:column;min-width:0;overflow:hidden;transition:border-color .1s linear}
.dd-node-int{cursor:pointer;text-align:left}
.dd-node-int:hover{border-color:var(--dd-hbd)}
.dd-node-int:focus-visible{outline:2px solid #fff;outline-offset:2px}
.dd-node-hd{padding:8px 11px;display:flex;justify-content:space-between;align-items:center;gap:10px;border-bottom:1px solid var(--dd-rule)}
.dd-node-ti{font:900 16px/1 'Space Grotesk',sans-serif;text-transform:uppercase;letter-spacing:.04em}
.dd-node-co{font-size:9px;letter-spacing:.1em;white-space:nowrap}
.dd-node-rw{display:flex;justify-content:space-between;gap:12px;padding:3px 0;border-bottom:1px solid var(--dd-hair)}
.dd-node-rw:last-child{border-bottom:none}
.dd-node-k{${LABEL_CSS};font-size:8px}
.dd-node-v{font-size:10px;letter-spacing:.05em;font-variant-numeric:tabular-nums;text-align:right}
.dd-node-pip{display:inline-block;width:5px;height:5px;background:currentColor;margin-right:5px;vertical-align:middle}
`);

/* Status hue is fixed, not seeded — an operator reads colour as meaning. */
const STATUS = {
  nominal:  { accent: 'green',  text: 'NOMINAL' },
  running:  { accent: 'cobalt', text: 'RUNNING' },
  scanning: { accent: 'cyan',   text: 'SCANNING' },
  warning:  { accent: 'orange', text: 'WARNING' },
  critical: { fill: '#ff0066',  text: 'CRITICAL' },
  offline:  { dim: true,        text: 'OFFLINE' }
};

/* The signature form: code header, key/value rows, status line.
   `rows` is [label, value] pairs — an array so the shape stays tabular. */
export function NodeCard({
  name, code, rows = [], status = 'nominal', load,
  id, accent, surface = 'black', signal = 'live', geometry = 'sharp', glitch = 'off',
  strip = false, interactive = false, width, onClick, children, className = '', style, ...rest
}) {
  const s = surfaceOf(surface);
  const seed = id != null ? id : name;
  const hue = hueOf({ accent, id: seed, label: name, surface });
  const st = STATUS[status] || STATUS.nominal;
  const statusHue = st.dim ? { fill: s.dim } : st.fill ? { fill: st.fill } : hueOf({ accent: st.accent, surface });

  const Tag = interactive ? 'button' : 'div';

  return (
    <Tag
      type={interactive ? 'button' : undefined}
      onClick={onClick}
      className={glitchClass(glitch, 'dd-node ' + (interactive ? 'dd-node-int ' : '') + className)}
      style={{
        width, background: s.panel, borderColor: s.rule, color: s.fg,
        '--dd-rule': s.rule, '--dd-hair': s.faint, '--dd-hbd': hue.fill,
        ...geometryStyle(geometry), filter: signalFilter(signal), ...style
      }}
      {...rest}
    >
      {strip ? <span aria-hidden="true" style={{ height: 6, flex: 'none', ...checkerFill(hue.fill, s.bg, 12) }}></span> : null}
      <div className="dd-node-hd">
        <span className="dd-node-ti">{name}</span>
        {code ? <span className="dd-node-co" style={{ color: s.dim }}>{code}</span> : null}
      </div>
      <div style={{ padding: '9px 11px', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {rows.map(([k, v], i) => (
          <div className="dd-node-rw" key={i}>
            <span className="dd-node-k" style={{ color: s.dim }}>{k}</span>
            <span className="dd-node-v" style={{ color: s.fg }}>{v}</span>
          </div>
        ))}
        <div className="dd-node-rw">
          <span className="dd-node-k" style={{ color: s.dim }}>status</span>
          <span className="dd-node-v" style={{ color: statusHue.fill }}>
            <span aria-hidden="true" className="dd-node-pip"></span>{st.text}
          </span>
        </div>
        {load != null ? (
          <div style={{ marginTop: 9, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span aria-hidden="true" style={{ flex: 1, height: 6, display: 'flex', background: s.faint }}>
              <span style={{ width: `${Math.round(Math.max(0, Math.min(1, load)) * 100)}%`, background: statusHue.fill }}></span>
            </span>
            <span className="dd-node-v" style={{ color: s.dim, fontSize: 9 }}>{Math.round(load * 100)}%</span>
          </div>
        ) : null}
        {children}
      </div>
    </Tag>
  );
}

/* Sector roll-up: solid seeded fill, segmented health bar, count chips.
   `breakdown` is [statusName, count] pairs. */
export function SectorCard({
  name, id, accent, breakdown = [], surface = 'black', geometry = 'sharp',
  width, className = '', style, ...rest
}) {
  const s = surfaceOf(surface);
  const hue = hueOf({ accent, id: id != null ? id : name, label: name, surface });
  const total = breakdown.reduce((n, [, c]) => n + c, 0) || 1;
  const fillFor = (k) => {
    const st = STATUS[k] || STATUS.nominal;
    if (st.dim) return 'rgba(0,0,0,.5)';
    if (st.fill) return st.fill;
    return hueOf({ accent: st.accent, surface: 'black' }).fill;
  };

  return (
    <div
      className={'dd-node ' + className}
      style={{ width, background: hue.fill, borderColor: hue.fill, color: hue.ink, padding: 14, ...geometryStyle(geometry), ...style }}
      {...rest}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8, gap: 10 }}>
        <span style={{ font: '900 28px/1 "Space Grotesk",sans-serif' }}>{name}</span>
        <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', textAlign: 'right', lineHeight: 1.3 }}>
          {total}<br />NODES
        </span>
      </div>
      <div aria-hidden="true" style={{ display: 'flex', height: 6, width: '100%', marginBottom: 8, overflow: 'hidden' }}>
        {breakdown.map(([k, c], i) => (
          <span key={i} style={{ background: fillFor(k), width: `${(c / total) * 100}%` }}></span>
        ))}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
        {breakdown.map(([k, c], i) => (
          <b key={i} style={{ background: '#000', color: fillFor(k), fontSize: 8, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', padding: '2px 6px' }}>
            {c} {(STATUS[k] || STATUS.nominal).text}
          </b>
        ))}
      </div>
    </div>
  );
}

/* Big-figure stat tile. */
export function StatCard({
  value, label, note, id, accent, status, surface = 'black', geometry = 'sharp',
  width = 110, className = '', style, ...rest
}) {
  const s = surfaceOf(surface);
  const st = status ? STATUS[status] : null;
  const hue = st && !st.dim
    ? (st.fill ? { fill: st.fill } : hueOf({ accent: st.accent, surface }))
    : hueOf({ accent, id: id != null ? id : label, label, surface });

  return (
    <div
      className={'dd-node ' + className}
      style={{ width, background: s.panel, borderColor: s.rule, color: s.fg, padding: 10, ...geometryStyle(geometry), ...style }}
      {...rest}
    >
      <div style={{ font: '900 44px/1 "Space Grotesk",sans-serif', color: hue.fill, fontVariantNumeric: 'tabular-nums' }}>{value}</div>
      <div className="dd-node-k" style={{ color: s.dim, marginTop: 4 }}>{label}</div>
      {note ? <div style={{ fontSize: 9, letterSpacing: '.08em', marginTop: 2, color: hue.fill }}>{note}</div> : null}
    </div>
  );
}

/* ASCII block meter — the sanctioned loading/progress job for block chars. */
export function NodeMeter({ value = 0, width = 24, surface = 'black', accent, id, style }) {
  const s = surfaceOf(surface);
  const hue = hueOf({ accent, id, label: String(value), surface });
  const n = Math.max(0, Math.min(width, Math.round(value * width)));
  return (
    <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '.02em', whiteSpace: 'pre', ...style }}>
      <span style={{ color: hue.fill }}>{BLOCKS.full.repeat(n)}</span>
      <span style={{ color: s.faint }}>{BLOCKS.light.repeat(width - n)}</span>
    </span>
  );
}
