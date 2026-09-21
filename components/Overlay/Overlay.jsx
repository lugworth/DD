import React, { useState } from 'react';
import { MONO, injectCSS, checkerFill } from '../core.js';

injectCSS('dd-overlay', `
.dd-scrim { position: fixed; inset: 0; background: rgba(0,0,0,.78); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 20px; }
.dd-modal { width: 100%; max-width: 440px; background: #111110; border: 1px solid #2d6cff; box-shadow: 0 16px 48px rgba(0,0,0,.9); font-family: ${MONO}; display: flex; flex-direction: column; }
.dd-modal-hd { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,.1); }
.dd-modal-title { font-family: 'Space Grotesk', sans-serif; font-weight: 900; font-size: 16px; text-transform: uppercase; letter-spacing: -0.01em; margin: 0; }
.dd-modal-x { cursor: pointer; color: rgba(255,255,255,.4); font-size: 14px; padding: 4px; transition: color 100ms; background: none; border: none; }
.dd-modal-x:hover { color: #fff; }
.dd-modal-bd { padding: 16px; font-size: 12px; line-height: 1.6; color: rgba(255,255,255,.7); }
.dd-modal-ft { display: flex; justify-content: flex-end; gap: 8px; padding: 12px 16px; border-top: 1px solid rgba(255,255,255,.1); }
.dd-toast-stack { display: flex; flex-direction: column; gap: 10px; width: 100%; max-width: 360px; font-family: ${MONO}; }
.dd-toast { background: #0a0a0a; border: 1px solid rgba(255,255,255,.12); border-left-width: 4px; display: flex; gap: 12px; padding: 12px 14px; align-items: flex-start; }
.dd-toast.ok { border-left-color: #39ff6a; }
.dd-toast.warn { border-left-color: #ff5a00; }
.dd-toast.err { border-left-color: #ff0066; background: rgba(255,0,102,.05); }
.dd-toast.info { border-left-color: #00d9ff; }
.dd-toast-ic { font-size: 13px; line-height: 1.2; flex-shrink: 0; }
.dd-toast.ok .dd-toast-ic { color: #39ff6a; }
.dd-toast.warn .dd-toast-ic { color: #ff5a00; }
.dd-toast.err .dd-toast-ic { color: #ff0066; }
.dd-toast.info .dd-toast-ic { color: #00d9ff; }
.dd-toast-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .1em; margin-bottom: 3px; }
.dd-toast-msg { font-size: 11px; color: rgba(255,255,255,.55); line-height: 1.5; }
.dd-tt-wrapper { position: relative; display: inline-flex; }
.dd-tt-content { position: absolute; background: #2d6cff; color: #000; font-family: ${MONO}; font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: .1em; padding: 5px 9px; white-space: nowrap; pointer-events: none; z-index: 50; }
.dd-tt-content.top { bottom: calc(100% + 8px); left: 50%; transform: translateX(-50%); }
.dd-tt-content.bottom { top: calc(100% + 8px); left: 50%; transform: translateX(-50%); }
`);

export function Modal({ open, onClose, title, children, primaryAction, secondaryAction, accentColor = '#2d6cff' }) {
  if (!open) return null;
  return (
    <div className="dd-scrim" onClick={onClose}>
      <div className="dd-modal" style={{ borderColor: accentColor }} onClick={e => e.stopPropagation()}>
        <div className="dd-modal-hd">
          <h3 className="dd-modal-title">{title}</h3>
          <button type="button" className="dd-modal-x" onClick={onClose}>✕</button>
        </div>
        <div className="dd-modal-bd">{children}</div>
        {(primaryAction || secondaryAction) && (
          <div className="dd-modal-ft">
            {secondaryAction && (
              <button
                type="button"
                onClick={secondaryAction.onClick}
                style={{ padding: '6px 12px', background: 'transparent', border: '1px solid rgba(255,255,255,.25)', color: '#fff', fontSize: 10, cursor: 'pointer' }}
              >
                {secondaryAction.label}
              </button>
            )}
            {primaryAction && (
              <button
                type="button"
                onClick={primaryAction.onClick}
                style={{ padding: '6px 14px', background: primaryAction.variant === 'danger' ? '#ff0066' : accentColor, border: 'none', color: '#000', fontSize: 10, fontWeight: 700, cursor: 'pointer' }}
              >
                {primaryAction.label}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function Toast({ status = 'ok', title, message, onDismiss, id }) {
  const icon = status === 'ok' ? '▶' : status === 'warn' ? '▲' : status === 'err' ? '▲' : '◈';
  return (
    <div className={`dd-toast ${status}`}>
      <span className="dd-toast-ic">{icon}</span>
      <div style={{ flex: 1 }}>
        <div className="dd-toast-title">{title}</div>
        {message && <div className="dd-toast-msg">{message}</div>}
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={() => onDismiss(id)}
          style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,.3)', cursor: 'pointer', fontSize: 11 }}
        >
          ✕
        </button>
      )}
    </div>
  );
}

export function Tooltip({ content, position = 'top', children, accent = '#2d6cff' }) {
  const [show, setShow] = useState(false);
  return (
    <div
      className="dd-tt-wrapper"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
    >
      {children}
      {show && (
        <div className={`dd-tt-content ${position}`} style={{ background: accent }}>
          {content}
        </div>
      )}
    </div>
  );
}
