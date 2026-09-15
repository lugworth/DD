import React from 'react';
import { MONO, DANGER, MOTION_CSS, hueOf, surfaceOf, geometryStyle, signalFilter, glitchClass, glitchAttrs, checkerFill, textureFill, animationStyle, injectCSS } from '../core.js';

injectCSS('dd-motion', MOTION_CSS);

injectCSS('dd-button', `
.dd-btn{display:inline-flex;align-items:center;gap:6px;font-family:${MONO};font-weight:700;text-transform:uppercase;border:1px solid transparent;cursor:pointer;white-space:nowrap;position:relative;background-color:var(--dd-bg);color:var(--dd-fg);border-color:var(--dd-bd);transition:border-radius .25s ease,clip-path .25s ease,background-color .1s linear,color .1s linear,border-color .1s linear}
.dd-btn:hover:not([disabled]){background-color:var(--dd-hbg);color:var(--dd-hfg);border-color:var(--dd-hbd)}
.dd-btn:active:not([disabled]){transform:translateY(1px)}
.dd-btn:focus-visible{outline:2px solid #fff;outline-offset:2px}
.dd-btn[disabled]{opacity:.34;cursor:not-allowed}
.dd-btn-pip{width:6px;height:6px;background:currentColor;flex:none}
`);

const SIZES = {
  sm: { height: 22, fontSize: 9, padding: '0 10px', letterSpacing: '0.14em' },
  md: { height: 32, fontSize: 11, padding: '0 14px', letterSpacing: '0.15em' },
  lg: { height: 44, fontSize: 13, padding: '0 20px', letterSpacing: '0.16em' }
};

export function Button({
  children, label, id, accent, variant = 'solid', size = 'md', surface = 'black',
  signal = 'live', geometry = 'sharp', glitch = 'off', texture = 'none', animation = 'none',
  disabled = false, pip = false, checker = false, icon = false, block = false,
  onClick, className = '', style, ...rest
}) {
  const s = surfaceOf(surface);
  const text = label != null ? label : children;
  const hue = hueOf({ accent, id, label: typeof text === 'string' ? text : label, surface });
  const sz = SIZES[size] || SIZES.md;

  /* Flat states: hover inverts ink and fill. No offset shadow, no lift. */
  let skin;
  if (variant === 'ghost') skin = { '--dd-bg': 'transparent', '--dd-fg': hue.fill, '--dd-bd': hue.fill, '--dd-hbg': hue.fill, '--dd-hfg': hue.ink, '--dd-hbd': hue.fill };
  else if (variant === 'quiet') skin = { '--dd-bg': 'transparent', '--dd-fg': s.fg, '--dd-bd': s.rule, '--dd-hbg': s.fg, '--dd-hfg': s.bg, '--dd-hbd': s.fg };
  else if (variant === 'danger') skin = { '--dd-bg': DANGER.fill, '--dd-fg': DANGER.ink, '--dd-bd': DANGER.fill, '--dd-hbg': DANGER.ink, '--dd-hfg': DANGER.fill, '--dd-hbd': DANGER.fill };
  else skin = { '--dd-bg': hue.fill, '--dd-fg': hue.ink, '--dd-bd': hue.fill, '--dd-hbg': hue.ink, '--dd-hfg': hue.fill, '--dd-hbd': hue.fill };

  const seam = checker
    ? { ...checkerFill(variant === 'solid' ? hue.ink : hue.fill, variant === 'solid' ? hue.fill : s.bg, 12), width: size === 'lg' ? 22 : 16, alignSelf: 'stretch', flex: 'none', marginLeft: -1 }
    : null;

  /* Overlay law: texture owns the ground, so the label moves onto a flat
     panel over it. Two inks only — the stop and its own ink. */
  const textured = texture && texture !== 'none';
  const tex = textured
    ? (variant === 'ghost' || variant === 'quiet'
        ? textureFill(texture, variant === 'ghost' ? hue.fill : s.rule, s.bg, sz.height / 2)
        : textureFill(texture, hue.ink, hue.fill, sz.height / 2))
    : {};
  const panel = textured && !icon
    ? { background: variant === 'ghost' || variant === 'quiet' ? s.bg : hue.fill, color: variant === 'ghost' ? hue.fill : variant === 'quiet' ? s.fg : hue.ink, padding: sz.padding, alignSelf: 'stretch', display: 'inline-flex', alignItems: 'center' }
    : null;

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
    className={glitchClass(glitch, 'dd-btn ' + (animation !== 'none' ? 'dd-anim ' : '') + className)}
      {...glitchAttrs(glitch, text)}
      style={{
        height: sz.height, fontSize: sz.fontSize, letterSpacing: sz.letterSpacing,
        padding: icon || checker ? 0 : textured ? `${Math.max(4, Math.round(sz.height / 7))}px` : sz.padding,
        width: icon ? sz.height : block ? '100%' : undefined,
        justifyContent: icon || block ? 'center' : undefined,
        overflow: textured ? 'hidden' : undefined,
        ...skin, ...geometryStyle(geometry), ...tex,
        filter: signalFilter(signal),
        ...animationStyle(animation),
        ...style
      }}
      {...rest}
    >
      {seam ? <span aria-hidden="true" style={seam}></span> : null}
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: checker && !icon && !textured ? sz.padding : 0, ...panel }}>
        {pip ? <span aria-hidden="true" className="dd-btn-pip"></span> : null}
        {text}
      </span>
    </button>
  );
}

export function ButtonRow({ children, gap = 8, wrap = true, style }) {
  return <div style={{ display: 'flex', gap, flexWrap: wrap ? 'wrap' : 'nowrap', alignItems: 'center', ...style }}>{children}</div>;
}
