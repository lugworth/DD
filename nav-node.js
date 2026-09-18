/**
 * digidelic Floating Navigation Node Card
 *
 * Implements a persistent, floating NodeCard that stays in view across all pages
 * and can be minimized to a small, sleek action button.
 * Adheres strictly to the Digidelic Design System:
 * - Pure black canvas / black-panel surface (#111110)
 * - Zero border-radius universal
 * - Solid color blocks (cobalt #2d6cff, green #39ff6a, hot pink #ff2d87)
 * - Space Grotesk headlines + Geist Mono telemetry
 * - Tabular key/value rows & status indicator
 * - Full list of generative tools, components, UI kits, and preview cards
 */

(function () {
  'use strict';

  if (window.__DIGIDELIC_NAV_NODE_MOUNTED__) return;
  window.__DIGIDELIC_NAV_NODE_MOUNTED__ = true;

  // Navigation catalog of all digidelic tools, components, and kits
  const DESTINATIONS = [
    // Primary Hubs
    { id: 'hub-tools', cat: 'tools', name: 'TOOLS RACK', desc: 'Generative instrument suite (14 builds)', path: '/tools/index.html', code: '0xTL' },
    { id: 'hub-comps', cat: 'comps', name: 'COMPONENTS HUB', desc: 'Design system exports & demos', path: '/components/index.html', code: '0xCP' },
    { id: 'hub-pantry', cat: 'kits', name: 'PANTRY.EXE', desc: 'Desktop mission OS UI Kit demo', path: '/ui_kits/pantry/index.html', code: '0xOS' },
    { id: 'hub-digidelic', cat: 'kits', name: 'MISSION CONTROL', desc: 'Digidelic interactive node grid', path: '/ui_kits/digidelic/index.html', code: '0xMC' },
    { id: 'hub-tailwind', cat: 'kits', name: 'TAILWIND KIT', desc: 'Tailwind CDN UI system', path: '/ui_kits/digidelic-tailwind/index.html', code: '0xTW' },

    // Generative Tools
    { id: 'tool-patchwork', cat: 'tools', name: 'PATCHWORK GENERATOR', desc: 'Recursive patch grid parameter rack', path: '/tools/patchwork-generator/index.html', code: '0x01' },
    { id: 'tool-cosmogram', cat: 'tools', name: 'COSMOGRAM GENERATOR', desc: 'Orbital diagram & glyph borders', path: '/tools/cosmogram-generator/index.html', code: '0x02' },
    { id: 'tool-reaction', cat: 'tools', name: 'REACTION FIELD', desc: 'Gray-Scott 3D relief diffusion', path: '/tools/reaction-field/index.html', code: '0x03' },
    { id: 'tool-glyph', cat: 'tools', name: 'GLYPH FOUNDRY', desc: 'Specimens of invented letterforms', path: '/tools/glyph-foundry/index.html', code: '0x04' },
    { id: 'tool-colony', cat: 'tools', name: 'COLONY DISPLAY', desc: 'Dot-matrix life colonies & phosphor', path: '/tools/colony-display/index.html', code: '0x05' },
    { id: 'tool-circuit', cat: 'tools', name: 'CIRCUIT MATRIX', desc: 'Acid circuit-patch layout generator', path: '/tools/circuit-matrix/index.html', code: '0x06' },
    { id: 'tool-readout', cat: 'tools', name: 'TELEMETRY READOUT', desc: 'Stream analysis & signal monitors', path: '/tools/readout/index.html', code: '0x07' },
    { id: 'tool-echo', cat: 'tools', name: 'PIXEL ECHO', desc: 'Temporal feedback & video dither', path: '/tools/pixel-echo/index.html', code: '0x08' },
    { id: 'tool-knit', cat: 'tools', name: 'PIXEL KNIT', desc: 'Jacquard textile pattern generator', path: '/tools/pixel-knit/index.html', code: '0x09' },
    { id: 'tool-scope', cat: 'tools', name: 'SIGNAL SCOPE', desc: 'Oscilloscope audio-visual harmonics', path: '/tools/signal-scope/index.html', code: '0x0A' },
    { id: 'tool-tension', cat: 'tools', name: 'SURFACE TENSION', desc: 'Interactive fluid simulation', path: '/tools/surface-tension/index.html', code: '0x0B' },
    { id: 'tool-culture', cat: 'tools', name: 'CULTURE DISH', desc: 'Petri dish bacterial colony growth', path: '/tools/culture/index.html', code: '0x0C' },
    { id: 'tool-overprint', cat: 'tools', name: 'OVERPRINT RISOGRAPH', desc: 'CMYK ink duotone offset plate', path: '/tools/overprint/index.html', code: '0x0D' },

    // Components
    { id: 'comp-emblem', cat: 'comps', name: 'EMBLEM BADGES', desc: 'Graphic category rosettes & cosmograms', path: '/components/Emblem/Emblem.html', code: '0xEM' },
    { id: 'comp-nodecard', cat: 'comps', name: 'NODECARD SPEC', desc: 'Node panels & tabular readouts', path: '/components/NodeCard/NodeCard.html', code: '0xNC' },
    { id: 'comp-button', cat: 'comps', name: 'BUTTON SPEC', desc: 'Variants, sizes & flat textures', path: '/components/Button/Button.html', code: '0xBT' },
    { id: 'comp-card', cat: 'comps', name: 'CARD SPEC', desc: 'Panel, raised, checker trim', path: '/components/Card/Card.html', code: '0xCD' },
    { id: 'comp-field', cat: 'comps', name: 'FIELD SPEC', desc: 'Inputs, selects, checkboxes', path: '/components/Field/Field.html', code: '0xFD' },
    { id: 'comp-badge', cat: 'comps', name: 'BADGE SPEC', desc: 'Status chips & coordinate tags', path: '/components/Badge/Badge.html', code: '0xBG' },
    { id: 'comp-progress', cat: 'comps', name: 'PROGRESS SPEC', desc: 'Bars, segments & block ramps', path: '/components/Progress/Progress.html', code: '0xPG' },

    // Foundations & Docs
    { id: 'fnd-motifs', cat: 'docs', name: 'MOTIFS & TEXTURES', desc: 'Stripes, checker, dither, ASCII', path: '/preview/brand-motifs.html', code: '0xMT' },
    { id: 'fnd-palette', cat: 'docs', name: 'COLOR PALETTE', desc: 'Cobalt hero + neon spectrum', path: '/preview/colors-palette.html', code: '0xPL' },
    { id: 'fnd-access', cat: 'docs', name: 'ACCESSIBILITY AUDIT', desc: 'Verified contrast pairings', path: '/preview/foundations-accessibility.html', code: '0xAA' },
    { id: 'fnd-nav', cat: 'docs', name: 'NAVIGATION SPEC', desc: 'Bars, rails, tabs, breadcrumbs', path: '/preview/components-nav.html', code: '0xNV' }
  ];

  // Detect current location
  function getCurrentInfo() {
    const p = window.location.pathname;
    const match = DESTINATIONS.find(d => p.endsWith(d.path) || p === d.path);
    if (match) return match;
    if (p.includes('/patchwork-generator')) return { name: 'PATCHWORK', code: '0x01' };
    if (p.includes('/cosmogram-generator')) return { name: 'COSMOGRAM', code: '0x02' };
    if (p.includes('/reaction-field')) return { name: 'REACTION FIELD', code: '0x03' };
    if (p.includes('/glyph-foundry')) return { name: 'GLYPH FOUNDRY', code: '0x04' };
    if (p.includes('/colony-display')) return { name: 'COLONY DISPLAY', code: '0x05' };
    if (p.includes('/circuit-matrix')) return { name: 'CIRCUIT MATRIX', code: '0x06' };
    if (p.includes('/components/Emblem')) return { name: 'EMBLEM BADGE', code: '0xEM' };
    if (p.includes('/components/')) return { name: 'COMPONENTS', code: '0xCP' };
    if (p.includes('/tools')) return { name: 'TOOLS RACK', code: '0xTL' };
    return { name: 'DIGIDELIC', code: '0xSYS' };
  }

  // Mini vector emblem insignia generator for Nav-Node
  function getNavEmblemSvg(code, size) {
    const s = size || 16;
    const EMBLEM_COLORS = {
      '0x01': { base: '#ff5a00', accent: '#7bc5ff', core: '#fff' },
      '0x02': { base: '#c6ff3a', accent: '#1f8b3c', core: '#ff2d87' },
      '0x03': { base: '#b5bdc6', accent: '#ffffff', core: '#000' },
      '0x04': { base: '#1c3218', accent: '#39ff6a', core: '#fff' },
      '0x05': { base: '#eb2612', accent: '#ff6050', core: '#fff' },
      '0x06': { base: '#ff5a00', accent: '#ff2d87', core: '#fff' },
      '0x07': { base: '#c800ff', accent: '#ff66d0', core: '#fff' },
      '0x08': { base: '#8cb498', accent: '#ff2d87', core: '#ff2600' },
      '0x09': { base: '#c6ff3a', accent: '#b8bfc6', core: '#000' },
      '0x0A': { base: '#9c8e7e', accent: '#dde0dc', core: '#fff' },
      '0x0B': { base: '#ff2d87', accent: '#ff9bc2', core: '#00d9ff' },
      '0x0C': { base: '#4653e8', accent: '#00d9ff', core: '#c6ff3a' },
      '0x0D': { base: '#ff2d87', accent: '#00d9ff', core: '#ff5a00' },
      '0xEM': { base: '#8cb498', accent: '#ff2d87', core: '#fff' },
      '0xTL': { base: '#ff5a00', accent: '#7bc5ff', core: '#fff' },
      '0xCP': { base: '#c6ff3a', accent: '#1f8b3c', core: '#ff2d87' },
      '0xOS': { base: '#4653e8', accent: '#00d9ff', core: '#c6ff3a' },
      '0xMC': { base: '#ff2d87', accent: '#ff9bc2', core: '#00d9ff' },
      '0xTW': { base: '#00d9ff', accent: '#2d6cff', core: '#fff' },
      '0xNC': { base: '#9c8e7e', accent: '#dde0dc', core: '#fff' },
      '0xBT': { base: '#2d6cff', accent: '#ff2d87', core: '#fff' },
      '0xCD': { base: '#1c3218', accent: '#39ff6a', core: '#fff' },
      '0xFD': { base: '#b5bdc6', accent: '#ffffff', core: '#000' },
      '0xBG': { base: '#ff5a00', accent: '#ff6050', core: '#fff' },
      '0xPG': { base: '#c800ff', accent: '#ff66d0', core: '#fff' },
      '0xMT': { base: '#ff2d87', accent: '#00d9ff', core: '#fff' },
      '0xPL': { base: '#2d6cff', accent: '#ff2d87', core: '#c6ff3a' },
      '0xAA': { base: '#c6ff3a', accent: '#000000', core: '#fff' },
      '0xNV': { base: '#4653e8', accent: '#00d9ff', core: '#fff' }
    };
    const c = EMBLEM_COLORS[code] || { base: '#2d6cff', accent: '#ff2d87', core: '#ffffff' };
    return `<svg class="dd-nav-insignia" viewBox="0 0 24 24" width="${s}" height="${s}" aria-hidden="true" style="overflow:visible;flex-shrink:0;">
      <circle cx="12" cy="12" r="10" fill="${c.base}" />
      <circle cx="12" cy="12" r="5" fill="${c.accent}" />
      <circle cx="12" cy="12" r="1.8" fill="${c.core}" />
      <circle cx="12" cy="12" r="9.5" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="0.5" stroke-dasharray="1 1.5" />
      <line x1="12" y1="1" x2="12" y2="3" stroke="rgba(255,255,255,0.6)" stroke-width="0.6" />
      <line x1="12" y1="21" x2="12" y2="23" stroke="rgba(255,255,255,0.6)" stroke-width="0.6" />
    </svg>`;
  }

  // Inject Styles
  function injectStyles() {
    if (document.getElementById('dd-nav-styles')) return;
    const style = document.createElement('style');
    style.id = 'dd-nav-styles';
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700;900&display=swap');

      /* Floating Navigation Container */
      #dd-floating-nav-root {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 100000;
        font-family: 'Geist Mono', 'Red Hat Mono', 'Courier New', monospace;
        font-size: 11px;
        color: #ffffff;
        box-sizing: border-box;
        line-height: 1.4;
      }
      #dd-floating-nav-root *,
      #dd-floating-nav-root *::before,
      #dd-floating-nav-root *::after {
        box-sizing: border-box;
        border-radius: 0 !important;
      }

      /* ── Minimized Floating Button ── */
      #dd-nav-min-btn {
        display: flex;
        align-items: center;
        gap: 9px;
        position: relative;
        overflow: hidden;
        background: linear-gradient(#000000, #000000) padding-box,
                    linear-gradient(135deg, #2d6cff 0%, #ff2d87 100%) border-box;
        color: #ffffff;
        border: 1px solid transparent;
        padding: 9px 14px;
        font-family: 'Geist Mono', 'Red Hat Mono', monospace;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        cursor: pointer;
        box-shadow: 0 8px 28px rgba(0, 0, 0, 0.95), 0 0 0 1px rgba(45, 108, 255, 0.25);
        transition: background 120ms cubic-bezier(0.2, 0, 0, 1),
                    color 120ms cubic-bezier(0.2, 0, 0, 1),
                    transform 80ms linear,
                    box-shadow 120ms ease;
        user-select: none;
      }
      #dd-nav-min-btn .dd-nav-min-ascii {
        position: absolute;
        inset: 0;
        background-image: url('/assets/tex-ascii-dense.png');
        background-size: 180px;
        mix-blend-mode: hard-light;
        opacity: 0.16;
        filter: contrast(180%) brightness(130%);
        pointer-events: none;
      }
      #dd-nav-min-btn > *:not(.dd-nav-min-ascii) {
        position: relative;
        z-index: 1;
      }
      #dd-nav-min-btn:hover {
        background: #2d6cff;
        color: #000000;
        border-color: #2d6cff;
        transform: translateY(-2px);
        box-shadow: 0 10px 32px rgba(45, 108, 255, 0.45);
      }
      #dd-nav-min-btn:active {
        transform: translateY(0);
      }
      #dd-nav-min-btn .dd-min-pip {
        width: 6px;
        height: 6px;
        background: #39ff6a;
        display: inline-block;
        animation: dd-nav-pulse 1.2s steps(8, end) infinite;
      }
      #dd-nav-min-btn:hover .dd-min-pip {
        background: #000000;
      }
      #dd-nav-min-btn .dd-min-code {
        color: #00d9ff;
        font-size: 9px;
        letter-spacing: 0.08em;
      }
      #dd-nav-min-btn:hover .dd-min-code {
        color: #000000;
        opacity: 0.85;
      }

      /* ── Expanded Floating NodeCard ── */
      #dd-nav-card {
        width: 324px;
        background: #111110;
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0 16px 48px rgba(0, 0, 0, 0.96), 0 0 0 1px rgba(45, 108, 255, 0.2);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        position: relative;
        animation: dd-nav-appear 140ms cubic-bezier(0.16, 1, 0.3, 1);
      }

      /* Ambient Hard-Light ASCII Texture Overlay */
      .dd-nav-tex-ascii {
        position: absolute;
        inset: 0;
        background-image: url('/assets/tex-ascii-dense.png');
        background-size: 340px;
        background-repeat: repeat;
        mix-blend-mode: hard-light;
        opacity: 0.15;
        filter: contrast(180%) brightness(125%);
        pointer-events: none;
        z-index: 1;
      }
      #dd-nav-card > *:not(.dd-nav-tex-ascii) {
        position: relative;
        z-index: 2;
      }

      /* Top Checkerboard Trim + Blue-Pink Gradient Hairline */
      .dd-nav-checker {
        height: 6px;
        flex: none;
        background-color: #ff6050;
        background-image: linear-gradient(45deg, #2d6cff 25%, transparent 25%, transparent 75%, #2d6cff 75%),
                          linear-gradient(45deg, #2d6cff 25%, transparent 25%, transparent 75%, #2d6cff 75%);
        background-size: 10px 10px;
        background-position: 0 0, 5px 5px;
      }
      .dd-nav-checker-gradient {
        height: 2px;
        background: linear-gradient(90deg, #2d6cff 0%, #a82fff 50%, #ff2d87 100%);
        flex: none;
      }

      /* Card Header */
      .dd-nav-hd {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 9px 12px;
        background: rgba(0, 0, 0, 0.92);
        border-bottom: 1px solid rgba(255, 255, 255, 0.12);
        cursor: grab;
        user-select: none;
      }
      .dd-nav-hd:active {
        cursor: grabbing;
      }
      .dd-nav-title-wrap {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .dd-nav-title {
        font-family: 'Space Grotesk', sans-serif;
        font-weight: 900;
        font-size: 15px;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: #ffffff;
      }
      .dd-nav-title em {
        font-style: normal;
        background: linear-gradient(90deg, #2d6cff 0%, #ff2d87 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .dd-nav-hd-actions {
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .dd-nav-badge-code {
        font-size: 9px;
        letter-spacing: 0.12em;
        color: #ffffff;
        padding: 1px 5px;
        border: 1px solid transparent;
        background: linear-gradient(#000,#000) padding-box, linear-gradient(135deg, #2d6cff, #ff2d87) border-box;
      }
      .dd-nav-btn-minimize {
        background: transparent;
        color: #ffffff;
        border: 1px solid rgba(255, 255, 255, 0.22);
        font-family: inherit;
        font-size: 9px;
        font-weight: 700;
        letter-spacing: 0.12em;
        padding: 2px 7px;
        cursor: pointer;
        text-transform: uppercase;
        transition: background 90ms linear, color 90ms linear, border-color 90ms linear;
      }
      .dd-nav-btn-minimize:hover {
        background: #ff2d87;
        color: #000000;
        border-color: #ff2d87;
      }

      /* Telemetry Tabular Rows */
      .dd-nav-telemetry {
        padding: 8px 12px;
        background: #0a0a0a;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .dd-nav-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 10px;
      }
      .dd-nav-k {
        font-size: 8.5px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.45);
      }
      .dd-nav-v {
        font-size: 10px;
        letter-spacing: 0.06em;
        font-variant-numeric: tabular-nums;
        color: #ffffff;
      }
      .dd-nav-status-nominal {
        color: #39ff6a;
        display: flex;
        align-items: center;
        gap: 5px;
      }
      .dd-nav-status-pip {
        width: 5px;
        height: 5px;
        background: #39ff6a;
        animation: dd-nav-pulse 1.2s steps(8, end) infinite;
      }

      /* Filter & Category Controls */
      .dd-nav-controls {
        padding: 8px 12px;
        background: #111110;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        display: flex;
        flex-direction: column;
        gap: 7px;
      }
      .dd-nav-search {
        width: 100%;
        background: #000000;
        border: 1px solid rgba(255, 255, 255, 0.16);
        color: #ffffff;
        font-family: inherit;
        font-size: 10px;
        letter-spacing: 0.08em;
        padding: 5px 8px;
        outline: none;
        transition: border-color 100ms linear;
      }
      .dd-nav-search:focus {
        border-color: #2d6cff;
      }
      .dd-nav-search::placeholder {
        color: rgba(255, 255, 255, 0.32);
        text-transform: lowercase;
      }

      .dd-nav-cats {
        display: flex;
        gap: 3px;
      }
      .dd-nav-cat-btn {
        flex: 1;
        background: #000000;
        border: 1px solid rgba(255, 255, 255, 0.12);
        color: rgba(255, 255, 255, 0.55);
        font-family: inherit;
        font-size: 8.5px;
        font-weight: 700;
        letter-spacing: 0.1em;
        padding: 4px 2px;
        cursor: pointer;
        text-align: center;
        text-transform: uppercase;
        transition: all 90ms linear;
      }
      .dd-nav-cat-btn:hover {
        color: #ffffff;
        border-color: rgba(255, 255, 255, 0.3);
      }
      .dd-nav-cat-btn.is-active {
        background: #2d6cff;
        color: #000000;
        border-color: #2d6cff;
        font-weight: 700;
      }

      /* Destination List */
      .dd-nav-list {
        max-height: 200px;
        overflow-y: auto;
        padding: 4px 0;
        background: #111110;
      }
      .dd-nav-list::-webkit-scrollbar {
        width: 3px;
      }
      .dd-nav-list::-webkit-scrollbar-track {
        background: #0a0a0a;
      }
      .dd-nav-list::-webkit-scrollbar-thumb {
        background: #2d6cff;
      }

      .dd-nav-item {
        display: flex;
        align-items: center;
        gap: 9px;
        padding: 6px 12px;
        color: rgba(255, 255, 255, 0.72);
        text-decoration: none;
        border-left: 2px solid transparent;
        transition: background 80ms linear, color 80ms linear, border-color 80ms linear;
      }
      .dd-nav-item:hover {
        background: #2d6cff;
        color: #000000;
        border-left-color: #00d9ff;
      }
      .dd-nav-item.is-current {
        background: rgba(45, 108, 255, 0.16);
        border-left: 3px solid #ff2d87;
        color: #ffffff;
      }
      .dd-nav-item-code {
        font-size: 8.5px;
        letter-spacing: 0.08em;
        color: rgba(255, 255, 255, 0.35);
        width: 28px;
        flex-shrink: 0;
      }
      .dd-nav-item:hover .dd-nav-item-code {
        color: rgba(0, 0, 0, 0.6);
      }
      .dd-nav-item-info {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
      }
      .dd-nav-item-name {
        font-size: 10.5px;
        font-weight: 600;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .dd-nav-item-desc {
        font-size: 8.5px;
        color: rgba(255, 255, 255, 0.4);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .dd-nav-item:hover .dd-nav-item-desc {
        color: rgba(0, 0, 0, 0.65);
      }
      .dd-nav-item-badge {
        font-size: 8px;
        padding: 1px 5px;
        background: #ff2d87;
        color: #000000;
        font-weight: 700;
        border: none;
        text-transform: uppercase;
        letter-spacing: 0.1em;
      }
      .dd-nav-empty {
        padding: 16px;
        text-align: center;
        font-size: 10px;
        color: rgba(255, 255, 255, 0.35);
        letter-spacing: 0.1em;
      }

      /* Quick-Jump Tool Rack */
      .dd-nav-rack {
        padding: 7px 12px;
        background: #0a0a0a;
        border-top: 1px solid rgba(255, 255, 255, 0.08);
      }
      .dd-nav-rack-label {
        font-size: 8px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.35);
        margin-bottom: 5px;
        display: flex;
        justify-content: space-between;
      }
      .dd-nav-rack-chips {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: 3px;
      }
      .dd-nav-chip {
        display: block;
        padding: 4px 1px;
        text-align: center;
        background: #000000;
        border: 1px solid rgba(255, 255, 255, 0.14);
        color: #ffffff;
        font-size: 8px;
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        text-decoration: none;
        transition: all 80ms linear;
      }
      .dd-nav-chip:hover {
        background: #2d6cff;
        color: #000000;
        border-color: #2d6cff;
      }

      /* Card Footer */
      .dd-nav-ft {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 6px 12px;
        background: #000000;
        border-top: 1px solid rgba(255, 255, 255, 0.12);
        font-size: 8.5px;
        letter-spacing: 0.14em;
        color: rgba(255, 255, 255, 0.4);
        text-transform: uppercase;
      }
      .dd-nav-ft-key {
        color: #2d6cff;
        font-weight: 700;
      }

      @keyframes dd-nav-pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.3; transform: scale(1.4); }
      }
      @keyframes dd-nav-appear {
        from { opacity: 0; transform: translateY(6px); }
        to { opacity: 1; transform: translateY(0); }
      }

      /* 4A: Emblem Insignias (1C: 90° spin with chromatic aberration flash) */
      @keyframes dd-chroma-flash {
        0% {
          filter: drop-shadow(0 0 0 transparent);
        }
        25% {
          filter: drop-shadow(2.5px 0 0 #ff2d87) drop-shadow(-2.5px 0 0 #00d9ff) drop-shadow(0 1.5px 0 #2d6cff);
        }
        60% {
          filter: drop-shadow(-2px 0 0 #ff2d87) drop-shadow(2px 0 0 #c6ff3a) drop-shadow(0 -1.5px 0 #ff5a00);
        }
        100% {
          filter: drop-shadow(1.5px 0 0 rgba(255,45,135,0.8)) drop-shadow(-1.5px 0 0 rgba(0,217,255,0.8));
        }
      }

      .dd-nav-insignia {
        display: inline-block;
        vertical-align: middle;
        flex-shrink: 0;
        transition: transform 160ms steps(6, end), filter 140ms ease-out;
      }
      .dd-nav-item:hover .dd-nav-insignia,
      #dd-nav-min-btn:hover .dd-nav-insignia,
      .dd-nav-cat-btn:hover .dd-nav-insignia {
        transform: rotate(90deg);
        filter: drop-shadow(2px 0 0 #ff2d87) drop-shadow(-2px 0 0 #00d9ff) drop-shadow(0 1.5px 0 #2d6cff);
        animation: dd-chroma-flash 200ms steps(4, end);
      }
      .dd-nav-hd-insignia {
        display: inline-flex;
        align-items: center;
        transition: transform 180ms steps(6, end), filter 160ms ease-out;
      }
      .dd-nav-hd:hover .dd-nav-hd-insignia {
        transform: rotate(90deg);
        filter: drop-shadow(3px 0 0 #ff2d87) drop-shadow(-3px 0 0 #00d9ff) drop-shadow(0 2px 0 #2d6cff);
        animation: dd-chroma-flash 220ms steps(4, end);
      }
      .dd-nav-cat-btn .dd-nav-insignia {
        margin-right: 4px;
        vertical-align: -1px;
      }

      /* Responsive on narrow screens */
      @media (max-width: 480px) {
        #dd-floating-nav-root {
          bottom: 10px;
          right: 10px;
        }
        #dd-nav-card {
          width: calc(100vw - 20px);
          max-width: 340px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Create and mount floating nav
  function initFloatingNav() {
    injectStyles();

    const root = document.createElement('div');
    root.id = 'dd-floating-nav-root';
    root.setAttribute('role', 'region');
    root.setAttribute('aria-label', 'Floating Navigation Node');

    const current = getCurrentInfo();
    let isMinimized = localStorage.getItem('digidelic_nav_minimized') === 'true';
    let currentFilter = 'all';
    let searchQuery = '';

    // Render inner content
    function render() {
      root.innerHTML = '';

      if (isMinimized) {
        // Render Minimized Button
        const minBtn = document.createElement('button');
        minBtn.id = 'dd-nav-min-btn';
        minBtn.setAttribute('title', 'Expand Navigation Node Card (Alt+N)');
        minBtn.innerHTML = `
          <span class="dd-nav-min-ascii" aria-hidden="true"></span>
          <span style="display:inline-flex;align-items:center;margin-right:2px;">${getNavEmblemSvg(current.code || '0x04', 14)}</span>
          <span class="dd-min-pip" aria-hidden="true"></span>
          <span>NAV // NODE</span>
          <span class="dd-min-code">${current.code || '0xNAV'}</span>
          <span aria-hidden="true" style="margin-left:2px;font-size:9px;">[+]</span>
        `;
        minBtn.addEventListener('click', () => {
          isMinimized = false;
          localStorage.setItem('digidelic_nav_minimized', 'false');
          render();
        });
        root.appendChild(minBtn);
      } else {
        // Render Expanded NodeCard
        const card = document.createElement('div');
        card.id = 'dd-nav-card';

        // Filter destinations
        const filtered = DESTINATIONS.filter(d => {
          if (currentFilter !== 'all' && d.cat !== currentFilter) return false;
          if (searchQuery) {
            const q = searchQuery.toLowerCase();
            return d.name.toLowerCase().includes(q) ||
                   d.desc.toLowerCase().includes(q) ||
                   d.code.toLowerCase().includes(q);
          }
          return true;
        });

        card.innerHTML = `
          <div class="dd-nav-tex-ascii" aria-hidden="true"></div>
          <div class="dd-nav-checker" aria-hidden="true"></div>
          <div class="dd-nav-checker-gradient" aria-hidden="true"></div>

          <!-- Header -->
          <div class="dd-nav-hd" id="dd-nav-drag-handle">
            <div class="dd-nav-title-wrap">
              <span class="dd-nav-hd-insignia">${getNavEmblemSvg(current.code || '0x08', 18)}</span>
              <span class="dd-nav-title">NAV <em>//</em> NODE</span>
              <span class="dd-nav-badge-code">0xNAV-01</span>
            </div>
            <div class="dd-nav-hd-actions">
              <button class="dd-nav-btn-minimize" id="dd-nav-minimize-trigger" title="Minimize to small button (Alt+N or Esc)">
                [ — ] MIN
              </button>
            </div>
          </div>

          <!-- Telemetry Readout -->
          <div class="dd-nav-telemetry">
            <div class="dd-nav-row">
              <span class="dd-nav-k">SYSTEM</span>
              <span class="dd-nav-v">DIGIDELIC v2.5</span>
            </div>
            <div class="dd-nav-row">
              <span class="dd-nav-k">LOCATION</span>
              <span class="dd-nav-v" style="color:#00d9ff">${current.name} [${current.code || 'SYS'}]</span>
            </div>
            <div class="dd-nav-row">
              <span class="dd-nav-k">TELEPORT</span>
              <span class="dd-nav-v dd-nav-status-nominal">
                <span class="dd-nav-status-pip" aria-hidden="true"></span>
                <span>ONLINE // READY</span>
              </span>
            </div>
          </div>

          <!-- Controls: Filter & Search -->
          <div class="dd-nav-controls">
            <input type="search" class="dd-nav-search" id="dd-nav-search-input"
              placeholder="filter destinations [alt+n to min]" value="${searchQuery.replace(/"/g, '&quot;')}" spellcheck="false">
            <div class="dd-nav-cats" role="tablist">
              <button class="dd-nav-cat-btn ${currentFilter === 'all' ? 'is-active' : ''}" data-cat="all">${getNavEmblemSvg('0x0C', 10)} ALL</button>
              <button class="dd-nav-cat-btn ${currentFilter === 'tools' ? 'is-active' : ''}" data-cat="tools">${getNavEmblemSvg('0x01', 10)} TOOLS</button>
              <button class="dd-nav-cat-btn ${currentFilter === 'comps' ? 'is-active' : ''}" data-cat="comps">${getNavEmblemSvg('0x04', 10)} COMPS</button>
              <button class="dd-nav-cat-btn ${currentFilter === 'kits' ? 'is-active' : ''}" data-cat="kits">${getNavEmblemSvg('0x06', 10)} KITS</button>
              <button class="dd-nav-cat-btn ${currentFilter === 'docs' ? 'is-active' : ''}" data-cat="docs">${getNavEmblemSvg('0x0B', 10)} DOCS</button>
            </div>
          </div>

          <!-- Scrollable Teleport Destination List -->
          <div class="dd-nav-list" id="dd-nav-items-list">
            ${filtered.length === 0 ? `
              <div class="dd-nav-empty">no destinations match query_</div>
            ` : filtered.map(d => {
              const isCurr = window.location.pathname.endsWith(d.path) || window.location.pathname === d.path;
              return `
                <a href="${d.path}" class="dd-nav-item ${isCurr ? 'is-current' : ''}">
                  ${getNavEmblemSvg(d.code, 15)}
                  <span class="dd-nav-item-code">${d.code}</span>
                  <div class="dd-nav-item-info">
                    <span class="dd-nav-item-name">${d.name}</span>
                    <span class="dd-nav-item-desc">${d.desc}</span>
                  </div>
                  ${isCurr ? '<span class="dd-nav-item-badge">LIVE</span>' : ''}
                </a>
              `;
            }).join('')}
          </div>

          <!-- Quick-Jump Primary Tools Rack -->
          <div class="dd-nav-rack">
            <div class="dd-nav-rack-label">
              <span>QUICK TELEPORT</span>
              <span>1-CLICK</span>
            </div>
            <div class="dd-nav-rack-chips">
              <a href="/tools/patchwork-generator/index.html" class="dd-nav-chip" title="Patchwork Generator">PATCH</a>
              <a href="/tools/cosmogram-generator/index.html" class="dd-nav-chip" title="Cosmogram Generator">COSMO</a>
              <a href="/tools/reaction-field/index.html" class="dd-nav-chip" title="Reaction Field">REACT</a>
              <a href="/tools/glyph-foundry/index.html" class="dd-nav-chip" title="Glyph Foundry">GLYPH</a>
              <a href="/tools/colony-display/index.html" class="dd-nav-chip" title="Colony Display">COLONY</a>
              <a href="/tools/circuit-matrix/index.html" class="dd-nav-chip" title="Circuit Matrix">CIRCUIT</a>
            </div>
          </div>

          <!-- Footer -->
          <div class="dd-nav-ft">
            <span>NODE // ACTIVE</span>
            <span>HOTKEY <span class="dd-nav-ft-key">ALT+N</span></span>
          </div>
        `;

        root.appendChild(card);

        // Bind Card Event Handlers
        const minTrigger = card.querySelector('#dd-nav-minimize-trigger');
        if (minTrigger) {
          minTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            isMinimized = true;
            localStorage.setItem('digidelic_nav_minimized', 'true');
            render();
          });
        }

        const searchInput = card.querySelector('#dd-nav-search-input');
        if (searchInput) {
          searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            renderListOnly();
          });
          // Focus search when typing if explicitly desired
          searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
              if (searchQuery) {
                searchQuery = '';
                searchInput.value = '';
                renderListOnly();
                e.stopPropagation();
              }
            }
          });
        }

        const catBtns = card.querySelectorAll('.dd-nav-cat-btn');
        catBtns.forEach(btn => {
          btn.addEventListener('click', () => {
            currentFilter = btn.getAttribute('data-cat');
            catBtns.forEach(b => b.classList.toggle('is-active', b === btn));
            renderListOnly();
          });
        });

        // Draggable Card functionality
        setupDragging(card);
      }
    }

    // Fast list re-render without tearing down input focus
    function renderListOnly() {
      const listEl = root.querySelector('#dd-nav-items-list');
      if (!listEl) return;

      const filtered = DESTINATIONS.filter(d => {
        if (currentFilter !== 'all' && d.cat !== currentFilter) return false;
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          return d.name.toLowerCase().includes(q) ||
                 d.desc.toLowerCase().includes(q) ||
                 d.code.toLowerCase().includes(q);
        }
        return true;
      });

      if (filtered.length === 0) {
        listEl.innerHTML = '<div class="dd-nav-empty">no destinations match query_</div>';
      } else {
        listEl.innerHTML = filtered.map(d => {
          const isCurr = window.location.pathname.endsWith(d.path) || window.location.pathname === d.path;
          return `
            <a href="${d.path}" class="dd-nav-item ${isCurr ? 'is-current' : ''}">
              ${getNavEmblemSvg(d.code, 15)}
              <span class="dd-nav-item-code">${d.code}</span>
              <div class="dd-nav-item-info">
                <span class="dd-nav-item-name">${d.name}</span>
                <span class="dd-nav-item-desc">${d.desc}</span>
              </div>
              ${isCurr ? '<span class="dd-nav-item-badge">LIVE</span>' : ''}
            </a>
          `;
        }).join('');
      }
    }

    // Drag-to-reposition logic
    function setupDragging(card) {
      const handle = card.querySelector('#dd-nav-drag-handle');
      if (!handle) return;

      let startX = 0, startY = 0, initialLeft = 0, initialTop = 0;
      let isDragging = false;

      handle.addEventListener('pointerdown', (e) => {
        if (e.target.closest('#dd-nav-minimize-trigger')) return;
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;

        const rect = root.getBoundingClientRect();
        initialLeft = rect.left;
        initialTop = rect.top;

        root.style.right = 'auto';
        root.style.bottom = 'auto';
        root.style.left = initialLeft + 'px';
        root.style.top = initialTop + 'px';

        handle.setPointerCapture(e.pointerId);
        e.preventDefault();
      });

      handle.addEventListener('pointermove', (e) => {
        if (!isDragging) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        const maxX = window.innerWidth - root.offsetWidth - 8;
        const maxY = window.innerHeight - root.offsetHeight - 8;

        const newX = Math.max(8, Math.min(maxX, initialLeft + dx));
        const newY = Math.max(8, Math.min(maxY, initialTop + dy));

        root.style.left = newX + 'px';
        root.style.top = newY + 'px';
      });

      function stopDrag(e) {
        if (!isDragging) return;
        isDragging = false;
        try {
          handle.releasePointerCapture(e.pointerId);
        } catch (_) {}
      }

      handle.addEventListener('pointerup', stopDrag);
      handle.addEventListener('pointercancel', stopDrag);

      // Double-click header resets to bottom-right dock
      handle.addEventListener('dblclick', () => {
        root.style.left = 'auto';
        root.style.top = 'auto';
        root.style.right = '20px';
        root.style.bottom = '20px';
      });
    }

    // Global Keybindings: Alt+N toggles minimize/restore, Escape minimizes
    window.addEventListener('keydown', (e) => {
      if (e.altKey && (e.key === 'n' || e.key === 'N')) {
        e.preventDefault();
        isMinimized = !isMinimized;
        localStorage.setItem('digidelic_nav_minimized', isMinimized ? 'true' : 'false');
        render();
      } else if (e.key === 'Escape' && !isMinimized) {
        isMinimized = true;
        localStorage.setItem('digidelic_nav_minimized', 'true');
        render();
      }
    });

    render();
    document.body.appendChild(root);
  }

  // Mount when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFloatingNav);
  } else {
    initFloatingNav();
  }
})();
