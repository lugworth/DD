import React from 'react';
import { MONO, injectCSS } from '../core.js';

injectCSS('dd-data', `
.dd-datagrid { width: 100%; border-collapse: collapse; font-family: ${MONO}; font-size: 11px; border: 1px solid rgba(255,255,255,.12); }
.dd-datagrid th { text-align: left; font-size: 9px; letter-spacing: .16em; text-transform: uppercase; color: rgba(255,255,255,.4); padding: 8px 12px; border-bottom: 1px solid rgba(255,255,255,.14); background: #080808; font-weight: 700; }
.dd-datagrid td { padding: 8px 12px; border-bottom: 1px solid rgba(255,255,255,.07); font-variant-numeric: tabular-nums; }
.dd-datagrid tr:last-child td { border-bottom: none; }
.dd-datagrid tr.selectable { cursor: pointer; transition: background 100ms; }
.dd-datagrid tr.selectable:hover td { background: #131312; }
.dd-datagrid tr.selected td { background: rgba(45,108,255,.15); color: #fff; }
.dd-metrictile { background: #0c0c0b; border: 1px solid rgba(255,255,255,.12); padding: 14px 16px; font-family: ${MONO}; display: flex; flex-direction: column; gap: 8px; }
.dd-metrictile-val { font-family: 'Space Grotesk', sans-serif; font-size: 24px; font-weight: 900; letter-spacing: -0.02em; }
.dd-kv-row { display: flex; align-items: baseline; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,.06); font-family: ${MONO}; font-size: 11px; }
.dd-kv-k { color: rgba(255,255,255,.45); letter-spacing: .1em; text-transform: uppercase; font-size: 10px; }
.dd-kv-v { color: #fff; font-weight: 700; font-variant-numeric: tabular-nums; }
.dd-avatar { position: relative; display: inline-flex; align-items: center; justify-content: center; background: #1a1a18; border: 1px solid rgba(255,255,255,.15); font-family: 'Space Grotesk', sans-serif; font-weight: 900; }
.dd-avatar.sm { width: 28px; height: 28px; font-size: 11px; }
.dd-avatar.md { width: 38px; height: 38px; font-size: 14px; }
.dd-avatar.lg { width: 50px; height: 50px; font-size: 18px; }
.dd-avatar-beacon { position: absolute; bottom: -2px; right: -2px; width: 8px; height: 8px; border: 2px solid #000; }
.dd-empty { border: 1px dashed rgba(255,255,255,.2); padding: 36px 24px; text-align: center; font-family: ${MONO}; background: rgba(255,255,255,.01); }
`);

export function DataGrid({ columns, data, onRowClick, selectedId, keyField = 'id' }) {
  return (
    <table className="dd-datagrid">
      <thead>
        <tr>
          {columns.map(c => (
            <th key={c.key} style={{ textAlign: c.align || 'left' }}>{c.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => {
          const id = row[keyField] || idx;
          const isSelected = selectedId === id;
          return (
            <tr
              key={id}
              className={`selectable ${isSelected ? 'selected' : ''}`}
              onClick={() => onRowClick && onRowClick(row)}
            >
              {columns.map(c => (
                <td key={c.key} style={{ textAlign: c.align || 'left' }}>
                  {c.render ? c.render(row) : row[c.key]}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export function MetricTile({ label, value, unit, delta, deltaType = 'pos', accent = '#2d6cff' }) {
  const deltaCol = deltaType === 'pos' ? '#39ff6a' : deltaType === 'neg' ? '#ff0066' : 'rgba(255,255,255,.5)';
  return (
    <div className="dd-metrictile">
      <div style={{ fontSize: 9, letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,.4)' }}>
        {label}
      </div>
      <div className="dd-metrictile-val" style={{ color: accent }}>
        {value}
        {unit && <span style={{ fontSize: 13, marginLeft: 4, color: 'rgba(255,255,255,.5)' }}>{unit}</span>}
      </div>
      {delta && (
        <div style={{ fontSize: 10, color: deltaCol, letterSpacing: '.06em' }}>
          {deltaType === 'pos' ? '▲ ' : deltaType === 'neg' ? '▼ ' : ''}{delta}
        </div>
      )}
    </div>
  );
}

export function KeyValueList({ items }) {
  return (
    <div>
      {items.map(it => (
        <div key={it.key} className="dd-kv-row">
          <span className="dd-kv-k">{it.key}</span>
          <span className="dd-kv-v">{it.value}</span>
        </div>
      ))}
    </div>
  );
}

export function Avatar({ initials, status, size = 'md', accent = '#2d6cff' }) {
  const beaconColor = status === 'online' ? '#39ff6a' : status === 'busy' ? '#ff5a00' : '#ff0066';
  return (
    <div className={`dd-avatar ${size}`} style={{ color: accent }}>
      {initials}
      {status && <span className="dd-avatar-beacon" style={{ background: beaconColor }} />}
    </div>
  );
}

export function EmptyState({ title, description, actionText, onAction, icon = '◈' }) {
  return (
    <div className="dd-empty">
      <div style={{ fontSize: 24, marginBottom: 10, color: '#00d9ff' }}>{icon}</div>
      <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 900, fontSize: 15, textTransform: 'uppercase', marginBottom: 6 }}>
        {title}
      </div>
      <div style={{ fontSize: 11, color: 'rgba(255,255,255,.5)', maxWidth: 420, margin: '0 auto 16px', lineHeight: 1.6 }}>
        {description}
      </div>
      {actionText && (
        <button
          type="button"
          onClick={onAction}
          style={{ padding: '7px 16px', background: '#2d6cff', border: 'none', color: '#000', fontSize: 10, fontWeight: 700, letterSpacing: '.12em', cursor: 'pointer', textTransform: 'uppercase' }}
        >
          {actionText}
        </button>
      )}
    </div>
  );
}
