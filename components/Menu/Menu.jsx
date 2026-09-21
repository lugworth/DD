import React, { useState, useRef, useEffect } from 'react';
import { MONO, injectCSS } from '../core.js';

injectCSS('dd-menu', `
.dd-menu-wrapper { position: relative; display: inline-block; font-family: ${MONO}; }
.dd-menu-panel { position: absolute; top: calc(100% + 4px); left: 0; min-width: 210px; background: #111110; border: 1px solid rgba(255,255,255,.16); padding: 4px 0; z-index: 100; box-shadow: 0 12px 32px rgba(0,0,0,.85); }
.dd-menu-panel.right { left: auto; right: 0; }
.dd-mi { display: flex; align-items: center; gap: 9px; padding: 7px 12px; font-size: 11px; color: rgba(255,255,255,.65); cursor: pointer; transition: background 100ms, color 100ms; background: none; border: none; width: 100%; text-align: left; }
.dd-mi:hover:not(:disabled) { background: #1a1a18; color: #fff; }
.dd-mi:disabled { opacity: .3; cursor: not-allowed; }
.dd-mi.danger { color: #ff0066; }
.dd-mi.danger:hover { background: rgba(255,0,102,.12); color: #ff0066; }
.dd-mi-k { margin-left: auto; font-size: 8px; letter-spacing: .08em; color: rgba(255,255,255,.3); border: 1px solid rgba(255,255,255,.14); padding: 1px 4px; }
.dd-msep { height: 1px; background: rgba(255,255,255,.1); margin: 4px 0; }
.dd-mhd { padding: 6px 12px 3px; font-size: 8px; letter-spacing: .2em; text-transform: uppercase; color: rgba(255,255,255,.35); }
.dd-popover { width: 240px; background: #111110; border: 1px solid #00d9ff; font-family: ${MONO}; position: absolute; top: calc(100% + 8px); left: 0; z-index: 100; box-shadow: 0 12px 36px rgba(0,0,0,.9); }
.dd-popover-hd { padding: 8px 12px; border-bottom: 1px solid rgba(255,255,255,.1); font-size: 10px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: #00d9ff; }
.dd-popover-bd { padding: 12px; font-size: 11px; line-height: 1.6; color: rgba(255,255,255,.7); }
.dd-popover-ft { padding: 8px 12px; border-top: 1px solid rgba(255,255,255,.1); display: flex; gap: 6px; justify-content: flex-end; }
`);

export function DropdownMenu({ trigger, items, align = 'left' }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="dd-menu-wrapper" ref={ref}>
      <div onClick={() => setOpen(!open)}>{trigger}</div>
      {open && (
        <div className={`dd-menu-panel ${align === 'right' ? 'right' : ''}`}>
          {items.map((it, idx) => {
            if (it.divider) return <div key={idx} className="dd-msep" />;
            if (it.header) return <div key={idx} className="dd-mhd">{it.header}</div>;
            return (
              <button
                key={it.id || idx}
                type="button"
                disabled={it.disabled}
                className={`dd-mi ${it.danger ? 'danger' : ''}`}
                onClick={() => {
                  if (it.onClick) it.onClick();
                  setOpen(false);
                }}
              >
                {it.icon && <span style={{ width: 14, textAlign: 'center' }}>{it.icon}</span>}
                <span>{it.label}</span>
                {it.shortcut && <span className="dd-mi-k">{it.shortcut}</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function Popover({ trigger, title, children, open: controlledOpen, onOpenChange }) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;
  const setOpen = isControlled ? onOpenChange : setUncontrolledOpen;
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setOpen]);

  return (
    <div className="dd-menu-wrapper" ref={ref}>
      <div onClick={() => setOpen(!open)}>{trigger}</div>
      {open && (
        <div className="dd-popover">
          {title && <div className="dd-popover-hd">{title}</div>}
          <div className="dd-popover-bd">{children}</div>
        </div>
      )}
    </div>
  );
}
