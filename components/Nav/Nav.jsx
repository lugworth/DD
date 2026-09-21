import React from 'react';
import { MONO, hueOf, surfaceOf, geometryStyle, signalFilter, glitchClass, checkerFill, injectCSS, LABEL_CSS } from '../core.js';

injectCSS('dd-nav', `
.dd-topbar { display: flex; align-items: stretch; height: 46px; background: #000; border: 1px solid rgba(255,255,255,.12); font-family: ${MONO}; }
.dd-brand { display: flex; align-items: center; gap: 9px; padding: 0 16px; border-right: 1px solid rgba(255,255,255,.12); flex-shrink: 0; }
.dd-navitem { position: relative; display: flex; align-items: center; gap: 7px; padding: 0 16px; font-size: 11px; font-weight: 600; letter-spacing: .16em; text-transform: uppercase; color: rgba(255,255,255,.55); cursor: pointer; border-right: 1px solid rgba(255,255,255,.12); transition: color 120ms linear, background 120ms linear; background: transparent; border-top: none; border-bottom: none; border-left: none; }
.dd-navitem:hover { color: #fff; background: #1a1a18; }
.dd-navitem.active { background: #2d6cff; color: #000; }
.dd-sidebar { background: #000; border: 1px solid rgba(255,255,255,.12); font-family: ${MONO}; display: flex; flex-direction: column; }
.dd-sidelink { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-bottom: 1px solid rgba(255,255,255,.06); cursor: pointer; color: rgba(255,255,255,.55); transition: color 120ms, background 120ms; }
.dd-sidelink:hover { color: #fff; background: #1a1a18; }
.dd-sidelink.active { color: #2d6cff; background: rgba(45,108,255,.08); border-left: 2px solid #2d6cff; }
.dd-tabs { display: inline-flex; align-items: center; gap: 4px; font-family: ${MONO}; }
.dd-tab-pill { padding: 6px 14px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .12em; cursor: pointer; border: 1px solid rgba(255,255,255,.15); background: transparent; color: rgba(255,255,255,.6); transition: all 120ms ease; }
.dd-tab-pill:hover { color: #fff; border-color: rgba(255,255,255,.35); }
.dd-tab-pill.active { background: #00d9ff; color: #000; border-color: #00d9ff; }
.dd-tab-bar { padding: 8px 16px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .14em; cursor: pointer; border: none; background: transparent; color: rgba(255,255,255,.5); border-bottom: 2px solid transparent; transition: all 120ms ease; }
.dd-tab-bar:hover { color: #fff; }
.dd-tab-bar.active { color: #00d9ff; border-bottom: 2px solid #00d9ff; }
.dd-bc { display: flex; align-items: center; gap: 8px; font-size: 11px; font-family: ${MONO}; }
.dd-bc-item { color: rgba(255,255,255,.5); cursor: pointer; transition: color 100ms; }
.dd-bc-item:hover { color: #fff; }
.dd-bc-item.current { color: #00d9ff; font-weight: 700; cursor: default; }
.dd-bc-sep { color: rgba(255,255,255,.25); }
.dd-stepper { display: flex; align-items: center; gap: 12px; font-family: ${MONO}; }
.dd-step { display: flex; align-items: center; gap: 8px; font-size: 10px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: rgba(255,255,255,.4); }
.dd-step-num { width: 22px; height: 22px; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(255,255,255,.2); font-size: 10px; }
.dd-step.active { color: #00d9ff; }
.dd-step.active .dd-step-num { background: #00d9ff; color: #000; border-color: #00d9ff; font-weight: 900; }
.dd-step.done { color: #39ff6a; }
.dd-step.done .dd-step-num { border-color: #39ff6a; color: #39ff6a; }
.dd-pagination { display: flex; align-items: center; gap: 6px; font-family: ${MONO}; }
.dd-pg-btn { min-width: 28px; height: 28px; padding: 0 6px; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(255,255,255,.18); background: transparent; color: rgba(255,255,255,.7); font-size: 11px; cursor: pointer; transition: all 100ms; }
.dd-pg-btn:hover:not(:disabled) { border-color: #00d9ff; color: #fff; }
.dd-pg-btn.active { background: #00d9ff; color: #000; border-color: #00d9ff; font-weight: 700; }
.dd-pg-btn:disabled { opacity: .25; cursor: not-allowed; }
`);

export function TopBar({ brand, children, statusText = 'SYS_NOMINAL', ctaText = 'DEPLOY ▶', onCtaClick, surface = 'black', style }) {
  const s = surfaceOf(surface);
  return (
    <header className="dd-topbar" style={{ background: s.panel, borderColor: s.rule, ...style }}>
      <div className="dd-brand" style={{ borderColor: s.rule }}>
        <div style={{ width: 10, height: 10, ...checkerFill('#ff6050', '#2d6cff', 6) }} />
        {brand || <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 900, letterSpacing: '-0.02em', fontSize: 16 }}>DIGIDELIC</span>}
      </div>
      <div style={{ display: 'flex', flex: 1, alignItems: 'stretch' }}>
        {children}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px', fontSize: 10, letterSpacing: '.12em', color: s.dim, borderLeft: `1px solid ${s.rule}` }}>
        <span style={{ width: 6, height: 6, background: '#39ff6a', display: 'inline-block' }} />
        <span>{statusText}</span>
      </div>
      {ctaText && (
        <button
          type="button"
          onClick={onCtaClick}
          style={{
            display: 'flex', alignItems: 'center', padding: '0 16px', background: '#ff2d87', color: '#000',
            font: '700 11px/1 "Geist Mono", monospace', letterSpacing: '.16em', textTransform: 'uppercase',
            border: 'none', cursor: 'pointer'
          }}
        >
          {ctaText}
        </button>
      )}
    </header>
  );
}

export function NavItem({ label, code, active, onClick, glitch = true }) {
  return (
    <button
      type="button"
      className={`dd-navitem ${active ? 'active' : ''}`}
      onClick={onClick}
    >
      {code && <span style={{ fontSize: 9, opacity: 0.6, marginRight: 4 }}>[{code}]</span>}
      <span>{label}</span>
    </button>
  );
}

export function Tabs({ items, activeId, onChange, variant = 'pill' }) {
  return (
    <div className="dd-tabs">
      {items.map(it => {
        const isActive = it.id === activeId;
        const cls = variant === 'pill' ? 'dd-tab-pill' : 'dd-tab-bar';
        return (
          <button
            key={it.id}
            type="button"
            className={`${cls} ${isActive ? 'active' : ''}`}
            onClick={() => onChange(it.id)}
          >
            {it.label}
            {it.count !== undefined && (
              <span style={{ marginLeft: 6, fontSize: 9, opacity: isActive ? 0.8 : 0.4 }}>
                ({it.count})
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export function Breadcrumbs({ items, separator = '/', onSelect }) {
  return (
    <nav className="dd-bc" aria-label="Breadcrumb">
      {items.map((it, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <React.Fragment key={it.id || idx}>
            <span
              className={`dd-bc-item ${isLast ? 'current' : ''}`}
              onClick={() => !isLast && onSelect && onSelect(it.id)}
              role={isLast ? undefined : 'button'}
            >
              {it.label}
            </span>
            {!isLast && <span className="dd-bc-sep">{separator}</span>}
          </React.Fragment>
        );
      })}
    </nav>
  );
}

export function Stepper({ steps, currentStep, onStepClick }) {
  return (
    <div className="dd-stepper">
      {steps.map((st, idx) => {
        const isDone = idx < currentStep;
        const isActive = idx === currentStep;
        return (
          <React.Fragment key={st.id || idx}>
            <div
              className={`dd-step ${isDone ? 'done' : isActive ? 'active' : ''}`}
              style={{ cursor: onStepClick ? 'pointer' : 'default' }}
              onClick={() => onStepClick && onStepClick(idx)}
            >
              <div className="dd-step-num">{isDone ? '✓' : `0${idx + 1}`}</div>
              <span>{st.label}</span>
            </div>
            {idx < steps.length - 1 && (
              <div style={{ width: 24, height: 1, background: isDone ? '#39ff6a' : 'rgba(255,255,255,.15)' }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export function Pagination({ currentPage, totalPages, onPageChange, totalItems }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="dd-pagination">
      <button
        type="button"
        className="dd-pg-btn"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        ◀
      </button>
      {pages.map(p => (
        <button
          key={p}
          type="button"
          className={`dd-pg-btn ${p === currentPage ? 'active' : ''}`}
          onClick={() => onPageChange(p)}
        >
          {p}
        </button>
      ))}
      <button
        type="button"
        className="dd-pg-btn"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        ▶
      </button>
      {totalItems && (
        <span style={{ marginLeft: 12, fontSize: 10, color: 'rgba(255,255,255,.4)', letterSpacing: '.1em' }}>
          PAGE {currentPage} OF {totalPages} // {totalItems} NODES
        </span>
      )}
    </div>
  );
}
