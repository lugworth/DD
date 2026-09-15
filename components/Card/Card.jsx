import React from 'react';
import { MONO, hueOf, surfaceOf, geometryStyle, signalFilter, glitchClass, checkerFill, textureFill, injectCSS, LABEL_CSS } from '../core.js';

injectCSS('dd-card', `
.dd-card{font-family:${MONO};border:1px solid transparent;position:relative;display:flex;flex-direction:column;min-width:0}
.dd-card-strip{height:6px;flex:none}
.dd-card-lab{${LABEL_CSS};margin:0}
.dd-card-int{cursor:pointer;transition:border-color .1s linear,background-color .1s linear}
.dd-card-int:hover{border-color:var(--dd-hbd)}
.dd-card-int:focus-visible{outline:2px solid #fff;outline-offset:2px}
`);

const PAD = { sm: 12, md: 16, lg: 22 };

/* The base panel. `strip` is the checkerboard accent — trim, not texture,
   which is why it survives alongside a `texture` ground. */
export function Card({
  children, title, label, id, accent, surface = 'black', variant = 'panel',
  signal = 'live', geometry = 'sharp', glitch = 'off', texture = 'none',
  padding = 'md', strip = false, rule = true, interactive = false,
  onClick, className = '', style, ...rest
}) {
  const s = surfaceOf(surface);
  const hue = hueOf({ accent, id, label: typeof title === 'string' ? title : label, surface });
  const pad = PAD[padding] != null ? PAD[padding] : padding;

  const grounds = {
    panel:  { background: s.panel, borderColor: rule ? s.rule : 'transparent' },
    raised: { background: s.raised, borderColor: rule ? s.rule : 'transparent' },
    flat:   { background: s.bg, borderColor: rule ? s.rule : 'transparent' },
    accent: { background: hue.fill, borderColor: hue.fill, color: hue.ink },
    outline:{ background: 'transparent', borderColor: hue.fill }
  };
  const ground = grounds[variant] || grounds.panel;
  const inkOnAccent = variant === 'accent';
  const tex = texture !== 'none'
    ? textureFill(texture, inkOnAccent ? hue.ink : s.rule, inkOnAccent ? hue.fill : s.panel, 14)
    : {};

  const Tag = interactive ? 'button' : 'div';

  return (
    <Tag
      type={interactive ? 'button' : undefined}
      onClick={onClick}
      className={glitchClass(glitch, 'dd-card ' + (interactive ? 'dd-card-int ' : '') + className)}
      style={{
        color: inkOnAccent ? hue.ink : s.fg,
        textAlign: interactive ? 'left' : undefined,
        '--dd-hbd': hue.fill,
        ...ground, ...tex, ...geometryStyle(geometry),
        filter: signalFilter(signal),
        ...style
      }}
      {...rest}
    >
      {strip ? <span aria-hidden="true" className="dd-card-strip" style={checkerFill(hue.fill, inkOnAccent ? hue.ink : s.bg, 12)}></span> : null}
      <div style={{ padding: pad, display: 'flex', flexDirection: 'column', gap: 10, minWidth: 0 }}>
        {label ? <p className="dd-card-lab" style={{ color: inkOnAccent ? hue.ink : s.dim, opacity: inkOnAccent ? 0.72 : 1 }}>{label}</p> : null}
        {title ? <h3 style={{ font: '900 17px/1.15 "Space Grotesk",sans-serif', textTransform: 'uppercase', letterSpacing: '-0.01em', margin: 0 }}>{title}</h3> : null}
        {children}
      </div>
    </Tag>
  );
}

/* Header/body/footer slots for when a card needs internal rules. */
export function CardSection({ children, surface = 'black', padding = 'md', divide = true, style }) {
  const s = surfaceOf(surface);
  const pad = PAD[padding] != null ? PAD[padding] : padding;
  return <div style={{ padding: pad, borderTop: divide ? `1px solid ${s.rule}` : undefined, minWidth: 0, ...style }}>{children}</div>;
}

export function CardGrid({ children, min = 260, gap = 18, style }) {
  return <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fill,minmax(${min}px,1fr))`, gap, ...style }}>{children}</div>;
}
