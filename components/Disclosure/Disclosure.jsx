import React, { useState } from 'react';
import { MONO, injectCSS } from '../core.js';

injectCSS('dd-disclosure', `
.dd-acc { border: 1px solid rgba(255,255,255,.12); font-family: ${MONO}; }
.dd-acc-item { border-bottom: 1px solid rgba(255,255,255,.08); }
.dd-acc-item:last-child { border-bottom: none; }
.dd-acc-h { display: flex; align-items: center; gap: 10px; padding: 11px 14px; cursor: pointer; font-size: 11px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: rgba(255,255,255,.65); transition: color .12s, background .12s; background: none; border: none; width: 100%; text-align: left; }
.dd-acc-h:hover { color: #fff; background: #111110; }
.dd-acc-item.open .dd-acc-h { color: #ff5a00; background: #111110; }
.dd-acc-cv { width: 12px; flex-shrink: 0; font-size: 10px; transition: transform .18s ease; display: inline-block; }
.dd-acc-item.open .dd-acc-cv { transform: rotate(90deg); }
.dd-acc-bd { padding: 0 14px 14px 36px; font-size: 11px; line-height: 1.6; color: rgba(255,255,255,.55); }
.dd-tree { border: 1px solid rgba(255,255,255,.12); background: #080808; padding: 6px 0; font-size: 11px; font-family: ${MONO}; }
.dd-tn { display: flex; align-items: center; gap: 8px; padding: 6px 12px; cursor: pointer; color: rgba(255,255,255,.6); transition: all 100ms; }
.dd-tn:hover { color: #fff; background: #141412; }
.dd-tn.selected { background: #ff5a00; color: #000; font-weight: 700; }
.dd-drawer-scrim { position: fixed; inset: 0; background: rgba(0,0,0,.75); z-index: 1000; }
.dd-drawer { position: fixed; top: 0; right: 0; bottom: 0; width: 320px; background: #111110; border-left: 1px solid #ff5a00; z-index: 1001; font-family: ${MONO}; display: flex; flex-direction: column; box-shadow: -10px 0 40px rgba(0,0,0,.9); }
`);

export function Accordion({ items, defaultOpenId, allowMultiple = false }) {
  const [openIds, setOpenIds] = useState(defaultOpenId ? [defaultOpenId] : []);

  const toggle = id => {
    if (allowMultiple) {
      setOpenIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    } else {
      setOpenIds(prev => prev.includes(id) ? [] : [id]);
    }
  };

  return (
    <div className="dd-acc">
      {items.map(it => {
        const isOpen = openIds.includes(it.id);
        return (
          <div key={it.id} className={`dd-acc-item ${isOpen ? 'open' : ''}`}>
            <button type="button" className="dd-acc-h" onClick={() => toggle(it.id)}>
              <span className="dd-acc-cv">▶</span>
              <span style={{ flex: 1 }}>{it.title}</span>
              {it.badge && <span style={{ fontSize: 9, opacity: 0.6 }}>[{it.badge}]</span>}
            </button>
            {isOpen && <div className="dd-acc-bd">{it.content}</div>}
          </div>
        );
      })}
    </div>
  );
}

export function TreeView({ data, selectedId, onSelect }) {
  const [expanded, setExpanded] = useState({});

  const toggleExpand = id => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const renderNodes = (nodes, level = 0) => {
    return nodes.map(n => {
      const hasChildren = n.children && n.children.length > 0;
      const isExpanded = !!expanded[n.id];
      const isSelected = n.id === selectedId;

      return (
        <React.Fragment key={n.id}>
          <div
            className={`dd-tn ${isSelected ? 'selected' : ''}`}
            style={{ paddingLeft: 12 + level * 16 }}
            onClick={() => {
              if (hasChildren) toggleExpand(n.id);
              if (onSelect) onSelect(n.id);
            }}
          >
            {hasChildren ? (
              <span style={{ width: 10, fontSize: 9 }}>{isExpanded ? '▼' : '▶'}</span>
            ) : (
              <span style={{ width: 10, fontSize: 8, opacity: 0.4 }}>•</span>
            )}
            <span style={{ color: isSelected ? '#000' : '#00d9ff' }}>{n.icon || (hasChildren ? '📁' : '📄')}</span>
            <span>{n.label}</span>
          </div>
          {hasChildren && isExpanded && renderNodes(n.children, level + 1)}
        </React.Fragment>
      );
    });
  };

  return <div className="dd-tree">{renderNodes(data)}</div>;
}
