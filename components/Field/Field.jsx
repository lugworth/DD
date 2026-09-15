import React from 'react';
import { MONO, DANGER, hueOf, surfaceOf, geometryStyle, glitchClass, injectCSS, LABEL_CSS } from '../core.js';

injectCSS('dd-field', `
.dd-field{font-family:${MONO};display:flex;flex-direction:column;gap:6px;min-width:0}
.dd-field-lab{${LABEL_CSS};margin:0;display:flex;justify-content:space-between;gap:10px;align-items:baseline}
.dd-input{font-family:${MONO};font-size:12px;letter-spacing:.04em;width:100%;border:1px solid var(--dd-bd);background:var(--dd-bg);color:var(--dd-fg);padding:0 10px;height:34px;transition:border-color .1s linear}
.dd-input::placeholder{color:var(--dd-ph)}
.dd-input:hover:not(:disabled){border-color:var(--dd-bd-hi)}
.dd-input:focus{outline:none;border-color:var(--dd-focus);box-shadow:inset 0 0 0 1px var(--dd-focus)}
.dd-input:disabled{opacity:.4;cursor:not-allowed}
.dd-input[data-multiline]{height:auto;padding:9px 10px;line-height:1.6;resize:vertical}
.dd-help{font-size:10px;line-height:1.5;letter-spacing:.03em;margin:0}
.dd-check{font-family:${MONO};display:inline-flex;align-items:center;gap:8px;cursor:pointer;font-size:11px;letter-spacing:.06em}
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
    '--dd-bd': invalid ? DANGER.fill : s.rule,
    '--dd-bd-hi': invalid ? DANGER.fill : s.ruleStrong,
    '--dd-ph': s.faint,
    '--dd-focus': invalid ? DANGER.fill : hue.fill,
    '--dd-fill': hue.fill,
    '--dd-ink': hue.ink
  };
}

/* Label + control + help, with the seeded hue as the focus ring. */
export function Field({
  label, hint, help, error, children, id, accent, surface = 'black',
  geometry = 'sharp', required = false, className = '', style
}) {
  const s = surfaceOf(surface);
  const hue = hueOf({ accent, id, label, surface });
  const msg = error || help;
  return (
    <div className={'dd-field ' + className} style={{ ...vars(s, hue, !!error), color: s.fg, ...style }}>
      {label ? (
        <p className="dd-field-lab" style={{ color: s.dim }}>
          <span>{label}{required ? <span style={{ color: hue.fill }}> *</span> : null}</span>
          {hint ? <span style={{ color: s.faint, letterSpacing: '.1em' }}>{hint}</span> : null}
        </p>
      ) : null}
      {children}
      {msg ? <p className="dd-help" style={{ color: error ? DANGER.fill : s.dim }}>{msg}</p> : null}
    </div>
  );
}

export function Input({
  value, onChange, placeholder, type = 'text', multiline = false, rows = 4,
  id, accent, surface = 'black', geometry = 'sharp', invalid = false, disabled = false,
  className = '', style, ...rest
}) {
  const s = surfaceOf(surface);
  const hue = hueOf({ accent, id, label: placeholder, surface });
  const shared = {
    className: 'dd-input ' + className,
    value, onChange, placeholder, disabled,
    'aria-invalid': invalid || undefined,
    style: { ...vars(s, hue, invalid), ...geometryStyle(geometry), ...style },
    ...rest
  };
  return multiline
    ? <textarea {...shared} rows={rows} data-multiline="" />
    : <input {...shared} type={type} />;
}

export function Select({
  value, onChange, options = [], id, accent, surface = 'black',
  geometry = 'sharp', invalid = false, disabled = false, className = '', style, ...rest
}) {
  const s = surfaceOf(surface);
  const hue = hueOf({ accent, id, surface });
  return (
    <select
      className={'dd-input ' + className}
      value={value} onChange={onChange} disabled={disabled}
      aria-invalid={invalid || undefined}
      style={{ ...vars(s, hue, invalid), ...geometryStyle(geometry), cursor: 'pointer', ...style }}
      {...rest}
    >
      {options.map((o) => {
        const val = typeof o === 'string' ? o : o.value;
        const lab = typeof o === 'string' ? o : o.label;
        return <option key={val} value={val}>{lab}</option>;
      })}
    </select>
  );
}

export function Checkbox({
  label, checked, onChange, id, accent, surface = 'black', disabled = false,
  radio = false, className = '', style, ...rest
}) {
  const s = surfaceOf(surface);
  const hue = hueOf({ accent, id, label, surface });
  return (
    <label className={'dd-check ' + className} style={{ ...vars(s, hue, false), color: disabled ? s.faint : s.fg, cursor: disabled ? 'not-allowed' : 'pointer', ...style }}>
      <input type={radio ? 'radio' : 'checkbox'} checked={checked} onChange={onChange} disabled={disabled} {...rest} />
      <span aria-hidden="true" className="dd-check-box" style={radio ? { borderRadius: 999 } : undefined}>
        {radio ? '\u25CF' : '\u2715'}
      </span>
      {label}
    </label>
  );
}
