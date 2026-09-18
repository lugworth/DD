/**
 * Digidelic Design System - Emblem Badge Component (Browser UMD / Standalone)
 * Graphic category rosettes, planetary armillaries, clovers, starbursts & stepped glyphs.
 * Digidelic print registration marks, chromatic aberration hover & code-only identifiers.
 * 1A: Psychedelic Fluid Melt, 2C: Radial Rim Stencil, 3B: Colorways Matrix.
 */
(function (global) {
  'use strict';

  const React = global.React;
  if (!React) {
    console.error('[digidelic] React must be loaded before Emblem.js');
    return;
  }
  const h = React.createElement;

  // Inject CSS once
  if (typeof document !== 'undefined' && !document.querySelector('style[data-dd="dd-emblem"]')) {
    const st = document.createElement('style');
    st.setAttribute('data-dd', 'dd-emblem');
    st.textContent = `
.dd-emblem{
  display:inline-flex;flex-direction:column;align-items:center;vertical-align:middle;
  font-family:'Geist Mono','Red Hat Mono',monospace;text-decoration:none;user-select:none;
}
.dd-emblem-svg{
  display:block;overflow:visible;
  transition:transform 140ms steps(4,end),filter 90ms steps(1,end);
  shape-rendering:geometricPrecision;
  transform-origin:center center;
}

/* Digidelic Stepped Tactile Hover & Chromatic Aberration */
.dd-emblem-interactive{cursor:pointer}
.dd-emblem-interactive:hover .dd-emblem-svg{
  transform:rotate(45deg) translate(-2px,-2px);
  filter:drop-shadow(3px 3px 0px #000000) drop-shadow(2px 2px 0px #2d6cff) drop-shadow(-2px -2px 0px #ff2d87);
}
.dd-emblem-interactive:active .dd-emblem-svg{
  transform:rotate(90deg) translate(0,0);
  filter:drop-shadow(1px 1px 0px #000000);
}

/* 1A: Psychedelic Fluid Melt Mode */
.dd-emblem-melt.dd-emblem-interactive:hover .dd-emblem-svg,
.dd-emblem-melt.is-melted .dd-emblem-svg{
  filter:url(#dd-psyGoo) drop-shadow(3px 3px 0px #000000) drop-shadow(2px 2px 0px #2d6cff) drop-shadow(-2px -2px 0px #ff2d87);
  animation:dd-melt-pulse 2.2s ease-in-out infinite alternate;
}
.dd-emblem-melt.dd-emblem-interactive:active .dd-emblem-svg{
  filter:url(#dd-psyWave) drop-shadow(1px 1px 0px #000000);
  transform:scale(0.96) rotate(18deg);
}
@keyframes dd-melt-pulse{
  0%{transform:rotate(0deg) scale(1);}
  50%{transform:rotate(18deg) scale(1.04);}
  100%{transform:rotate(45deg) scale(1.02);}
}

/* Micro-chip Digidelic Monospace Code Badge */
.dd-emblem-code{
  font-family:'Geist Mono','Red Hat Mono',monospace;font-size:10px;font-weight:700;letter-spacing:0.2em;
  text-transform:uppercase;color:inherit;opacity:0.85;margin-top:7px;
  padding:2px 7px;background:rgba(0,0,0,0.55);border:1px solid rgba(255,255,255,0.18);
  line-height:1.2;display:inline-block;transition:all 120ms steps(2,end);
}
.dd-emblem-interactive:hover .dd-emblem-code{
  opacity:1;color:#00d9ff;border-color:rgba(0,217,255,0.6);
  box-shadow:2px 2px 0px #ff2d87;transform:translate(-1px,-1px);
}
.dd-emblem-interactive:active .dd-emblem-code{
  transform:translate(0,0);box-shadow:none;
}

/* Surface variants for code pill */
.dd-emblem-cream .dd-emblem-code{
  background:rgba(0,0,0,0.06);border-color:rgba(10,10,10,0.22);color:#0a0a0a;
}
.dd-emblem-cream.dd-emblem-interactive:hover .dd-emblem-code{
  color:#2c6afb;border-color:#2c6afb;box-shadow:2px 2px 0px rgba(10,10,10,0.3);
}

/* Cluster / 3D Overlapping Fan Array / Cascading Stack / Orbit (2B) */
.dd-emblem-cluster{
  position:relative;display:inline-flex;align-items:center;justify-content:center;
  perspective:1000px;
  transform-style:preserve-3d;
}
.dd-emblem-cluster-item{
  position:absolute;
  transition:transform 220ms cubic-bezier(.16,1,.3,1),box-shadow 180ms ease,z-index 90ms;
  transform-origin:50% 115%;
  will-change:transform;
}
.dd-emblem-cluster-item:hover{
  z-index:90 !important;
  transform:translateY(-14px) translateZ(50px) scale(1.16) rotate(0deg) !important;
  filter:drop-shadow(0 14px 24px rgba(0,0,0,0.7));
}
.dd-emblem-cluster-fan .dd-emblem-cluster-item{
  transform-origin:50% 120%;
}
.dd-emblem-cluster-fan .dd-emblem-cluster-item:hover{
  transform:translateY(-18px) translateZ(70px) scale(1.2) rotate(0deg) !important;
  filter:drop-shadow(0 18px 28px rgba(0,0,0,0.85));
}
.dd-emblem-cluster-orbit .dd-emblem-cluster-item{
  transform-origin:50% 50%;
}
.dd-emblem-cluster-orbit .dd-emblem-cluster-item:hover{
  transform:scale(1.22) translateZ(50px) rotate(0deg) !important;
  filter:drop-shadow(0 14px 22px rgba(0,0,0,0.7));
}

/* Emblem Grid */
.dd-emblem-grid{
  display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));
  gap:28px 18px;align-items:start;justify-items:center;
}
`;
    document.head.appendChild(st);
  }

  // Inject global SVG turbulence filters for standalone Psychedelic Fluid Melt
  if (typeof document !== 'undefined' && !document.getElementById('dd-emblem-global-filters')) {
    const mountFilters = function () {
      if (document.getElementById('dd-emblem-global-filters')) return;
      const svgFilters = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svgFilters.id = 'dd-emblem-global-filters';
      svgFilters.setAttribute('style', 'position:absolute;width:0;height:0;overflow:hidden;pointer-events:none;');
      svgFilters.innerHTML = `
        <defs>
          <filter id="dd-psyGoo" x="-25%" y="-25%" width="150%" height="150%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="dd-psyWave" x="-25%" y="-25%" width="150%" height="150%">
            <feTurbulence type="turbulence" baseFrequency="0.065" numOctaves="2" result="turb" />
            <feDisplacementMap in="SourceGraphic" in2="turb" scale="16" xChannelSelector="G" yChannelSelector="B" />
          </filter>
        </defs>
      `;
      if (document.body) document.body.appendChild(svgFilters);
      else document.documentElement.appendChild(svgFilters);
    };
    if (document.body) mountFilters();
    else document.addEventListener('DOMContentLoaded', mountFilters);
  }

  const SIZES = {
    xs: 24,
    sm: 36,
    md: 54,
    lg: 84,
    xl: 120,
    hero: 180
  };

  const EMBLEM_MOTIFS = {
    '0x01': { id: '0x01', code: '0x01', glyph: 'propeller', base: '#ff5a00', accent: '#7bc5ff', contrast: '#8c472a', aperture: '#ffffff', desc: 'Propeller quad-sectors with sky-blue quadrant blades and aperture core.' },
    '0x02': { id: '0x02', code: '0x02', glyph: 'orbit', base: '#c6ff3a', accent: '#1f8b3c', contrast: '#8fd6a6', aperture: '#ff2d87', desc: 'Concentric orbit ring with cardinal satellite pips, 4-petal blossom and pink dot.' },
    '0x03': { id: '0x03', code: '0x03', glyph: 'capsule', base: '#b5bdc6', accent: '#d8dde3', contrast: '#ffffff', aperture: '#000000', desc: 'Split-hemisphere silver disc with white dual-prong capsule and obsidian aperture.' },
    '0x04': { id: '0x04', code: '0x04', glyph: 'clover', base: '#1c3218', accent: '#39ff6a', contrast: '#000000', aperture: '#ffffff', desc: 'Deep olive ground, neon emerald clover loops, jet black cross, white dot.' },
    '0x05': { id: '0x05', code: '0x05', glyph: 'pod', base: '#eb2612', accent: '#ff6050', contrast: '#8fa68c', aperture: '#ffffff', desc: 'Vermilion disc with horizontal sage capsule pod and aperture ring.' },
    '0x06': { id: '0x06', code: '0x06', glyph: 'starburst', base: '#ff5a00', accent: '#ff2d87', contrast: '#ff6050', aperture: '#ffffff', desc: 'Solar orange disc with 16-point astral rosette starburst and aperture center.' },
    '0x07': { id: '0x07', code: '0x07', glyph: 'crystal', base: '#c800ff', accent: '#ff66d0', contrast: '#ff2d87', aperture: '#ffffff', desc: 'Orchid magenta field with faceted geometric 8-point crystal star.' },
    '0x08': { id: '0x08', code: '0x08', glyph: 'armillary', base: '#8cb498', accent: '#ff2d87', contrast: '#ff2600', aperture: '#ffffff', desc: 'Celadon green ground with neon pink armillary globe wireframes and red pod.' },
    '0x09': { id: '0x09', code: '0x09', glyph: 'clover2', base: '#c6ff3a', accent: '#b8bfc6', contrast: '#000000', aperture: '#ffffff', desc: 'Chartreuse lime field with cool grey petals and black clover core.' },
    '0x0A': { id: '0x0A', code: '0x0A', glyph: 'stepped', base: '#9c8e7e', accent: '#dde0dc', contrast: '#857868', aperture: '#ffffff', desc: 'Taupe ground with stepped pixelated notched diamond cross and center dot.' },
    '0x0B': { id: '0x0B', code: '0x0B', glyph: 'radial', base: '#ff2d87', accent: '#ff9bc2', contrast: '#00d9ff', aperture: '#ffffff', desc: 'Cyber pink field with 8-sector perimeter notches, cyan armillary ring and white dot.' },
    '0x0C': { id: '0x0C', code: '0x0C', glyph: 'astral', base: '#4653e8', accent: '#00d9ff', contrast: '#0a1640', aperture: '#c6ff3a', desc: 'Hero cobalt disc with 8-ray quadrant astral star, deep navy disc and chartreuse eye.' },

    // Backwards compatibility
    ai: { id: '0x01', code: '0x01', glyph: 'propeller', base: '#ff5a00', accent: '#7bc5ff', contrast: '#8c472a', aperture: '#ffffff', desc: 'Propeller quad-sectors with sky-blue quadrant blades.' },
    realestate: { id: '0x02', code: '0x02', glyph: 'orbit', base: '#c6ff3a', accent: '#1f8b3c', contrast: '#8fd6a6', aperture: '#ff2d87', desc: 'Concentric orbit ring with satellite pips.' },
    health: { id: '0x03', code: '0x03', glyph: 'capsule', base: '#b5bdc6', accent: '#d8dde3', contrast: '#ffffff', aperture: '#000000', desc: 'Split-hemisphere silver disc with capsule.' },
    banking: { id: '0x04', code: '0x04', glyph: 'clover', base: '#1c3218', accent: '#39ff6a', contrast: '#000000', aperture: '#ffffff', desc: 'Deep olive ground, neon emerald clover.' },
    entertainment: { id: '0x05', code: '0x05', glyph: 'pod', base: '#eb2612', accent: '#ff6050', contrast: '#8fa68c', aperture: '#ffffff', desc: 'Vermilion disc with capsule pod.' },
    manufacturing: { id: '0x06', code: '0x06', glyph: 'starburst', base: '#ff5a00', accent: '#ff2d87', contrast: '#ff6050', aperture: '#ffffff', desc: 'Solar orange disc with 16-point astral rosette.' },
    food: { id: '0x07', code: '0x07', glyph: 'crystal', base: '#c800ff', accent: '#ff66d0', contrast: '#ff2d87', aperture: '#ffffff', desc: 'Orchid magenta field with 8-point crystal star.' },
    finance: { id: '0x08', code: '0x08', glyph: 'armillary', base: '#8cb498', accent: '#ff2d87', contrast: '#ff2600', aperture: '#ffffff', desc: 'Celadon green ground with neon pink armillary.' },
    legal: { id: '0x09', code: '0x09', glyph: 'clover2', base: '#c6ff3a', accent: '#b8bfc6', contrast: '#000000', aperture: '#ffffff', desc: 'Chartreuse lime field with black clover core.' },
    education: { id: '0x0A', code: '0x0A', glyph: 'stepped', base: '#9c8e7e', accent: '#dde0dc', contrast: '#857868', aperture: '#ffffff', desc: 'Taupe ground with stepped notched diamond.' },
    saas: { id: '0x0B', code: '0x0B', glyph: 'radial', base: '#ff2d87', accent: '#ff9bc2', contrast: '#00d9ff', aperture: '#ffffff', desc: 'Cyber pink field with cyan armillary ring.' },
    ecommerce: { id: '0x0C', code: '0x0C', glyph: 'astral', base: '#4653e8', accent: '#00d9ff', contrast: '#0a1640', aperture: '#c6ff3a', desc: 'Hero cobalt disc with 8-ray quadrant astral star.' }
  };

  const CANONICAL_CODES = [
    '0x01', '0x02', '0x03', '0x04',
    '0x05', '0x06', '0x07', '0x08',
    '0x09', '0x0A', '0x0B', '0x0C'
  ];

  /* 3B: Digidelic Colorways & Palette Spectral Stops */
  const RAMP_STOPS = [
    { name: 'Cobalt', hex: '#2d6cff' },
    { name: 'Cyber Pink', hex: '#ff2d87' },
    { name: 'Solar Orange', hex: '#ff5a00' },
    { name: 'Acid Lime', hex: '#c6ff3a' },
    { name: 'Neon Green', hex: '#39ff6a' },
    { name: 'Cyan', hex: '#00d9ff' },
    { name: 'Orchid Magenta', hex: '#c800ff' },
    { name: 'Coral', hex: '#ff6050' },
    { name: 'Oxblood', hex: '#962c38' },
    { name: 'Deep Space', hex: '#0a1640' },
    { name: 'Botanical', hex: '#1c3218' },
    { name: 'Pure White', hex: '#ffffff' },
    { name: 'Obsidian', hex: '#000000' }
  ];

  const COLORWAYS = {
    cyber: { name: 'Cyber Neon', base: '#2d6cff', accent: '#ff2d87', contrast: '#00d9ff', aperture: '#ffffff' },
    toxic: { name: 'Acid Toxic', base: '#c6ff3a', accent: '#000000', contrast: '#39ff6a', aperture: '#ffffff' },
    solar: { name: 'Solar Flare', base: '#ff5a00', accent: '#ff6050', contrast: '#ff2d87', aperture: '#ffffff' },
    abyss: { name: 'Deep Abyss', base: '#4653e8', accent: '#00d9ff', contrast: '#0a1640', aperture: '#c6ff3a' },
    orchid: { name: 'Orchid Pulse', base: '#c800ff', accent: '#ff66d0', contrast: '#ff2d87', aperture: '#ffffff' },
    oxblood: { name: 'Oxblood Void', base: '#962c38', accent: '#d798a7', contrast: '#000000', aperture: '#ffffff' },
    botanical: { name: 'Botanical Eco', base: '#1c3218', accent: '#39ff6a', contrast: '#8fd6a6', aperture: '#ffffff' },
    infrared: { name: 'Infrared Matrix', base: '#ff0026', accent: '#ff6050', contrast: '#000000', aperture: '#ffffff' }
  };

  let emblemUid = 0;

  function renderGlyph(glyph, c) {
    switch (glyph) {
      case 'propeller':
        return h('g', null,
          h('circle', { cx: 50, cy: 50, r: 48, fill: c.base }),
          h('path', { d: 'M 50 50 L 50 2 A 48 48 0 0 0 2 50 Z', fill: c.accent }),
          h('path', { d: 'M 50 50 L 50 98 A 48 48 0 0 0 98 50 Z', fill: c.accent }),
          h('line', { x1: 50, y1: 2, x2: 50, y2: 98, stroke: 'rgba(255,255,255,0.4)', strokeWidth: 1 }),
          h('line', { x1: 2, y1: 50, x2: 98, y2: 50, stroke: 'rgba(255,255,255,0.4)', strokeWidth: 1 }),
          h('g', { transform: 'rotate(45 50 50)' },
            h('rect', { x: 44, y: 16, width: 12, height: 68, rx: 6, fill: c.contrast }),
            h('rect', { x: 16, y: 44, width: 68, height: 12, rx: 6, fill: c.contrast }),
            h('circle', { cx: 50, cy: 50, r: 10, fill: c.contrast })
          ),
          h('circle', { cx: 50, cy: 50, r: 5, fill: c.aperture })
        );

      case 'orbit':
        return h('g', null,
          h('circle', { cx: 50, cy: 50, r: 48, fill: c.base }),
          h('circle', { cx: 50, cy: 50, r: 38, stroke: c.accent, strokeWidth: 3, fill: 'none' }),
          h('circle', { cx: 50, cy: 12, r: 2.5, fill: '#0f2a14' }),
          h('circle', { cx: 88, cy: 50, r: 2.5, fill: '#0f2a14' }),
          h('circle', { cx: 50, cy: 88, r: 2.5, fill: '#0f2a14' }),
          h('circle', { cx: 12, cy: 50, r: 2.5, fill: '#0f2a14' }),
          h('path', {
            d: 'M 50 22 C 59 22 64 36 64 42 C 64 46 68 46 72 46 C 78 46 78 50 78 50 C 78 50 78 54 72 54 C 68 54 64 54 64 58 C 64 64 59 78 50 78 C 41 78 36 64 36 58 C 36 54 32 54 28 54 C 22 54 22 50 22 50 C 22 50 22 46 28 46 C 32 46 36 46 36 42 C 36 36 41 22 50 22 Z',
            fill: c.contrast
          }),
          h('circle', { cx: 50, cy: 50, r: 4.5, fill: c.aperture })
        );

      case 'capsule':
        return h('g', null,
          h('path', { d: 'M 50 2 A 48 48 0 0 0 50 98 Z', fill: c.base }),
          h('path', { d: 'M 50 2 A 48 48 0 0 1 50 98 Z', fill: c.accent }),
          h('path', { d: 'M 50 2 A 48 48 0 0 1 98 50 L 50 50 Z', fill: '#cad2d9', opacity: 0.45 }),
          h('path', {
            d: 'M 37 72 C 37 78 43 80 50 80 C 57 80 63 78 63 72 L 63 53 C 63 49 67 46 71 46 C 74 46 76 43 76 39 L 76 30 C 76 25 71 22 66 22 C 61 22 57 25 57 30 L 57 40 L 43 40 L 43 30 C 43 25 39 22 34 22 C 29 22 24 25 24 30 L 24 39 C 24 43 26 46 29 46 C 33 46 37 49 37 53 Z',
            fill: c.contrast
          }),
          h('circle', { cx: 50, cy: 50, r: 4.5, fill: c.aperture })
        );

      case 'clover':
        return h('g', null,
          h('circle', { cx: 50, cy: 50, r: 48, fill: c.base }),
          h('circle', { cx: 50, cy: 30, r: 14, fill: c.accent }),
          h('circle', { cx: 70, cy: 50, r: 14, fill: c.accent }),
          h('circle', { cx: 50, cy: 70, r: 14, fill: c.accent }),
          h('circle', { cx: 30, cy: 50, r: 14, fill: c.accent }),
          h('circle', { cx: 50, cy: 50, r: 8, fill: c.contrast }),
          h('path', { d: 'M 45 20 L 55 20 L 55 80 L 45 80 Z', fill: c.contrast }),
          h('path', { d: 'M 20 45 L 80 45 L 80 55 L 20 55 Z', fill: c.contrast }),
          h('circle', { cx: 50, cy: 50, r: 4.5, fill: c.aperture })
        );

      case 'pod':
        return h('g', null,
          h('circle', { cx: 50, cy: 50, r: 48, fill: c.base }),
          h('line', { x1: 2, y1: 50, x2: 98, y2: 50, stroke: c.accent, strokeWidth: 2.5 }),
          h('rect', { x: 22, y: 38, width: 56, height: 24, rx: 12, fill: c.contrast }),
          h('circle', { cx: 34, cy: 50, r: 6, fill: c.accent }),
          h('circle', { cx: 66, cy: 50, r: 6, fill: c.accent }),
          h('circle', { cx: 50, cy: 50, r: 7, fill: c.aperture }),
          h('circle', { cx: 50, cy: 50, r: 3, fill: '#eb2612' })
        );

      case 'starburst':
        return h('g', null,
          h('circle', { cx: 50, cy: 50, r: 48, fill: c.base }),
          Array.from({ length: 16 }).map(function (_, i) {
            return h('path', {
              key: i,
              d: 'M 50 16 L 53 44 L 50 50 L 47 44 Z',
              fill: i % 2 === 0 ? c.accent : c.contrast,
              transform: `rotate(${i * 22.5} 50 50)`
            });
          }),
          h('circle', { cx: 50, cy: 50, r: 13, fill: '#000000' }),
          h('circle', { cx: 50, cy: 50, r: 9, fill: c.accent }),
          h('circle', { cx: 50, cy: 50, r: 4, fill: c.aperture })
        );

      case 'crystal':
        return h('g', null,
          h('circle', { cx: 50, cy: 50, r: 48, fill: c.base }),
          h('circle', { cx: 50, cy: 50, r: 36, fill: 'none', stroke: 'rgba(255,255,255,0.25)', strokeWidth: 1 }),
          Array.from({ length: 8 }).map(function (_, i) {
            return h('polygon', {
              key: i,
              points: '50,18 56,38 50,45 44,38',
              fill: c.accent,
              transform: `rotate(${i * 45} 50 50)`
            });
          }),
          h('polygon', { points: '50,28 62,38 66,50 62,62 50,72 38,62 34,50 38,38', fill: c.contrast }),
          h('circle', { cx: 50, cy: 50, r: 5.5, fill: c.aperture })
        );

      case 'armillary':
        return h('g', null,
          h('circle', { cx: 50, cy: 50, r: 48, fill: c.base }),
          h('circle', { cx: 50, cy: 50, r: 40, fill: 'none', stroke: c.accent, strokeWidth: 2.5 }),
          h('ellipse', { cx: 50, cy: 50, rx: 39, ry: 18, fill: 'none', stroke: c.accent, strokeWidth: 1.8 }),
          h('ellipse', { cx: 50, cy: 50, rx: 18, ry: 39, fill: 'none', stroke: c.accent, strokeWidth: 1.8 }),
          h('circle', { cx: 50, cy: 50, r: 16, fill: c.contrast }),
          h('circle', { cx: 50, cy: 50, r: 7, fill: c.accent }),
          h('circle', { cx: 50, cy: 50, r: 3.5, fill: c.aperture })
        );

      case 'clover2':
        return h('g', null,
          h('circle', { cx: 50, cy: 50, r: 48, fill: c.base }),
          h('path', { d: 'M 50 8 C 65 8 72 26 72 38 C 72 46 64 50 50 50 C 36 50 28 46 28 38 C 28 26 35 8 50 8 Z', fill: c.accent }),
          h('path', { d: 'M 50 92 C 65 92 72 74 72 62 C 72 54 64 50 50 50 C 36 50 28 54 28 62 C 28 74 35 92 50 92 Z', fill: c.accent }),
          h('path', { d: 'M 8 50 C 8 35 26 28 38 28 C 46 28 50 36 50 50 C 50 64 46 72 38 72 C 26 72 8 65 8 50 Z', fill: c.accent }),
          h('path', { d: 'M 92 50 C 92 35 74 28 62 28 C 54 28 50 36 50 50 C 50 64 54 72 62 72 C 74 72 92 65 92 50 Z', fill: c.accent }),
          h('circle', { cx: 50, cy: 50, r: 13, fill: c.contrast }),
          h('circle', { cx: 50, cy: 50, r: 4.5, fill: c.aperture })
        );

      case 'stepped':
        return h('g', null,
          h('circle', { cx: 50, cy: 50, r: 48, fill: c.base }),
          h('path', {
            d: 'M 50 14 L 60 24 L 60 36 L 72 36 L 82 46 L 82 54 L 72 64 L 60 64 L 60 76 L 50 86 L 40 76 L 40 64 L 28 64 L 18 54 L 18 46 L 28 36 L 40 36 L 40 24 Z',
            fill: c.accent
          }),
          h('polygon', { points: '50,30 64,44 64,56 50,70 36,56 36,44', fill: c.contrast }),
          h('rect', { x: 45, y: 45, width: 10, height: 10, fill: c.aperture }),
          h('rect', { x: 48, y: 48, width: 4, height: 4, fill: '#000000' })
        );

      case 'radial':
        return h('g', null,
          h('circle', { cx: 50, cy: 50, r: 48, fill: c.base }),
          Array.from({ length: 8 }).map(function (_, i) {
            return h('rect', {
              key: i,
              x: 48.5,
              y: 3,
              width: 3,
              height: 10,
              fill: c.accent,
              transform: `rotate(${i * 45} 50 50)`
            });
          }),
          h('circle', { cx: 50, cy: 50, r: 32, fill: 'none', stroke: c.contrast, strokeWidth: 2.5 }),
          h('circle', { cx: 50, cy: 50, r: 21, fill: c.accent }),
          h('circle', { cx: 50, cy: 50, r: 9, fill: c.contrast }),
          h('circle', { cx: 50, cy: 50, r: 4, fill: c.aperture })
        );

      case 'astral':
        return h('g', null,
          h('circle', { cx: 50, cy: 50, r: 48, fill: c.base }),
          Array.from({ length: 4 }).map(function (_, i) {
            return h('g', { key: i, transform: `rotate(${i * 90} 50 50)` },
              h('polygon', { points: '50,8 55,36 50,42 45,36', fill: c.accent }),
              h('circle', { cx: 50, cy: 22, r: 2.5, fill: '#ffffff' })
            );
          }),
          h('circle', { cx: 50, cy: 50, r: 26, fill: c.contrast }),
          h('circle', { cx: 50, cy: 50, r: 14, fill: '#1b2a60' }),
          h('circle', { cx: 50, cy: 50, r: 7, fill: c.accent }),
          h('circle', { cx: 50, cy: 50, r: 3.5, fill: c.aperture })
        );

      default:
        return h('g', null,
          h('circle', { cx: 50, cy: 50, r: 48, fill: c.base }),
          h('circle', { cx: 50, cy: 50, r: 24, fill: c.accent }),
          h('circle', { cx: 50, cy: 50, r: 8, fill: c.aperture })
        );
    }
  }

  function renderMotif(type, colors, registrationMarks, rimConfig) {
    const meta = EMBLEM_MOTIFS[type] || EMBLEM_MOTIFS['0x01'];
    const c = Object.assign({}, meta, colors);
    const glyph = meta.glyph || 'propeller';

    const rimFill = (c.contrast && c.contrast !== '#000000' && c.contrast !== '#0a1640')
      ? c.contrast
      : (c.accent || '#ffffff');

    return h('g', null,
      renderGlyph(glyph, c),

      // 2C: Radial Rim Stencil (3C: Inverted top perimeter curve vs bottom arc)
      rimConfig && rimConfig.showRim ? h('g', { className: 'dd-emblem-rim-stencil', pointerEvents: 'none' },
        h('defs', null,
          h('path', {
            id: rimConfig.pathId,
            d: rimConfig.rimPosition === 'bottom'
              ? 'M 14 50 A 36 36 0 0 0 86 50'
              : 'M 14 50 A 36 36 0 0 1 86 50',
            fill: 'none'
          })
        ),
        h('text', {
          fill: rimFill,
          opacity: 0.92,
          fontFamily: "'Geist Mono', monospace",
          fontSize: '5.2',
          fontWeight: '700',
          letterSpacing: '0.25em',
          style: { userSelect: 'none' }
        },
          h('textPath', { href: `#${rimConfig.pathId}`, startOffset: '50%', textAnchor: 'middle' },
            `// ${rimConfig.code} //`
          )
        )
      ) : null,

      // Digidelic Technical Print Registration Marks & Coordinate Ring
      registrationMarks !== false ? h('g', { className: 'dd-emblem-registration', pointerEvents: 'none' },
        h('circle', {
          cx: 50, cy: 50, r: 47.2,
          fill: 'none',
          stroke: 'rgba(255,255,255,0.26)',
          strokeWidth: 0.6,
          strokeDasharray: '1.5 2.5'
        }),
        h('line', { x1: 50, y1: 1, x2: 50, y2: 4.5, stroke: 'rgba(255,255,255,0.45)', strokeWidth: 0.8 }),
        h('line', { x1: 50, y1: 95.5, x2: 50, y2: 99, stroke: 'rgba(255,255,255,0.45)', strokeWidth: 0.8 }),
        h('line', { x1: 1, y1: 50, x2: 4.5, y2: 50, stroke: 'rgba(255,255,255,0.45)', strokeWidth: 0.8 }),
        h('line', { x1: 95.5, y1: 50, x2: 99, y2: 50, stroke: 'rgba(255,255,255,0.45)', strokeWidth: 0.8 }),
        h('circle', { cx: 16.5, cy: 16.5, r: 0.75, fill: 'rgba(255,255,255,0.4)' }),
        h('circle', { cx: 83.5, cy: 16.5, r: 0.75, fill: 'rgba(255,255,255,0.4)' }),
        h('circle', { cx: 83.5, cy: 83.5, r: 0.75, fill: 'rgba(255,255,255,0.4)' }),
        h('circle', { cx: 16.5, cy: 83.5, r: 0.75, fill: 'rgba(255,255,255,0.4)' })
      ) : null
    );
  }

  /**
   * Pure SVG string generator for vanilla HTML/JS contexts
   */
  function renderEmblemSvgString(motif, options) {
    const opts = options || {};
    const size = opts.size || 24;
    const meta = EMBLEM_MOTIFS[motif] || EMBLEM_MOTIFS['0x01'];
    const displayCode = opts.code != null ? opts.code : meta.code;
    const activeColors = Object.assign({},
      opts.colorway && COLORWAYS[opts.colorway] ? COLORWAYS[opts.colorway] : {},
      opts.colors || {}
    );
    const c = Object.assign({}, meta, activeColors);
    const uid = Math.floor(Math.random() * 1000000);
    const showRim = opts.codeLayout === 'rim' || opts.codeLayout === 'both';
    const rimFill = (c.contrast && c.contrast !== '#000000' && c.contrast !== '#0a1640')
      ? c.contrast
      : (c.accent || '#ffffff');

    return `
      <svg class="dd-emblem-svg ${opts.melt ? 'is-melted' : ''}" viewBox="0 0 100 100" width="${size}" height="${size}" role="img" aria-label="Emblem ${displayCode}" style="shape-rendering:geometricPrecision;overflow:visible;">
        <title>Emblem ${displayCode}</title>
        <circle cx="50" cy="50" r="48" fill="${c.base}" />
        <circle cx="50" cy="50" r="22" fill="${c.accent}" />
        <circle cx="50" cy="50" r="6" fill="${c.aperture}" />
        ${showRim ? `
          <defs><path id="dd-str-rim-${uid}" d="${opts.rimPosition === 'bottom' ? 'M 14 50 A 36 36 0 0 0 86 50' : 'M 14 50 A 36 36 0 0 1 86 50'}" fill="none" /></defs>
          <text fill="${rimFill}" opacity="0.9" font-family="'Geist Mono',monospace" font-size="5.2" font-weight="700" letter-spacing="0.25em">
            <textPath href="#dd-str-rim-${uid}" startOffset="50%" text-anchor="middle">// ${displayCode} //</textPath>
          </text>
        ` : ''}
        ${opts.registrationMarks !== false ? `
          <circle cx="50" cy="50" r="47.2" fill="none" stroke="rgba(255,255,255,0.26)" stroke-width="0.6" stroke-dasharray="1.5 2.5" />
          <line x1="50" y1="1" x2="50" y2="4.5" stroke="rgba(255,255,255,0.45)" stroke-width="0.8" />
          <line x1="50" y1="95.5" x2="50" y2="99" stroke="rgba(255,255,255,0.45)" stroke-width="0.8" />
          <line x1="1" y1="50" x2="4.5" y2="50" stroke="rgba(255,255,255,0.45)" stroke-width="0.8" />
          <line x1="95.5" y1="50" x2="99" y2="50" stroke="rgba(255,255,255,0.45)" stroke-width="0.8" />
        ` : ''}
      </svg>
    `.trim();
  }

  function Emblem(props) {
    const motif = props.motif || '0x01';
    const size = props.size || 'md';
    const meta = EMBLEM_MOTIFS[motif] || EMBLEM_MOTIFS['0x01'];
    const dimension = typeof size === 'number' ? size : (SIZES[size] || SIZES.md);
    const surface = props.surface || 'black';
    const isMelt = Boolean(props.melt || props.fluid);

    const activeColors = Object.assign({},
      props.colorway && COLORWAYS[props.colorway] ? COLORWAYS[props.colorway] : {},
      props.colors || {}
    );

    const displayCode = props.code != null ? props.code : meta.code;

    // Resolve code layout
    let resolvedLayout = props.codeLayout;
    if (!resolvedLayout) {
      if (props.showRimCode) resolvedLayout = 'rim';
      else if (props.showCode || props.showLabel) resolvedLayout = 'pill';
      else resolvedLayout = 'none';
    }

    const showRim = resolvedLayout === 'rim' || resolvedLayout === 'both';
    const showPill = resolvedLayout === 'pill' || resolvedLayout === 'both';

    // Stable ID
    const idRef = React.useRef(null);
    if (!idRef.current) {
      emblemUid = (emblemUid + 1) % 1000000;
      idRef.current = `dd-e-${emblemUid}`;
    }
    const instanceId = idRef.current;
    const rimConfig = {
      showRim: showRim,
      code: displayCode,
      pathId: `${instanceId}-rim`,
      rimPosition: props.rimPosition || 'top'
    };

    return h('div', {
      className: `dd-emblem dd-emblem-${surface} ${props.interactive ? 'dd-emblem-interactive' : ''} ${isMelt ? 'dd-emblem-melt' : ''} ${props.className || ''}`,
      onClick: props.onClick,
      style: props.style
    },
      h('svg', {
        className: 'dd-emblem-svg',
        viewBox: '0 0 100 100',
        width: dimension,
        height: dimension,
        role: 'img',
        'aria-label': `Emblem ${displayCode}`
      },
        h('title', null, `Emblem ${displayCode}`),
        renderMotif(motif, activeColors, props.registrationMarks, rimConfig)
      ),
      showPill ? h('span', { className: 'dd-emblem-code' }, displayCode) : null
    );
  }

  function EmblemCluster(props) {
    const motifs = props.motifs || ['0x08', '0x0B', '0x04', '0x0A', '0x01', '0x02'];
    const layout = props.layout || 'fan';
    const size = props.size || 120;
    const spread = props.spread || 42;
    const interactive = props.interactive !== false;
    const registrationMarks = props.registrationMarks !== false;
    const codeLayout = props.codeLayout || 'none';
    const rimPosition = props.rimPosition || 'top';
    const melt = Boolean(props.melt);

    const count = motifs.length;
    let totalWidth;
    let totalHeight;

    if (layout === 'fan') {
      const stepX = spread * 1.05;
      totalWidth = size + (count - 1) * stepX + 32;
      totalHeight = size + 44;
    } else if (layout === 'orbit') {
      const diameter = spread * 3.2 + size;
      totalWidth = diameter;
      totalHeight = diameter;
    } else {
      totalWidth = size + (count - 1) * spread;
      totalHeight = size + (count - 1) * spread * 1.05;
    }

    return h('div', {
      className: `dd-emblem-cluster dd-emblem-cluster-${layout} ${props.className || ''}`,
      style: Object.assign({
        width: totalWidth,
        height: totalHeight
      }, props.style)
    },
      motifs.map(function (motif, i) {
        let left, top, zIndex, transform, itemSize = size;

        if (layout === 'fan') {
          const mid = (count - 1) / 2;
          const diff = i - mid;
          const stepX = spread * 1.05;
          const angle = diff * (42 / (count - 1 || 1));
          const arcY = Math.pow(diff, 2) * 3.4;
          left = ((totalWidth - size) / 2) + (diff * stepX);
          top = 16 + arcY;
          zIndex = i + 1;
          transform = `rotate(${angle.toFixed(1)}deg) translateZ(${i * 10}px)`;
        } else if (layout === 'orbit') {
          const radius = spread * 1.5;
          const angleRad = (i / count) * 2 * Math.PI - Math.PI / 2;
          const centerX = totalWidth / 2;
          const centerY = totalHeight / 2;
          itemSize = Math.round(size * 0.88);
          left = centerX + Math.cos(angleRad) * radius - itemSize / 2;
          top = centerY + Math.sin(angleRad) * radius - itemSize / 2;
          zIndex = i + 1;
          transform = `rotate(${(i * (360 / count)).toFixed(1)}deg)`;
        } else {
          // cascade
          const scale = 1 - (i * 0.08);
          itemSize = Math.round(size * scale);
          left = i * spread * 0.9;
          top = i * spread * 1.08;
          zIndex = count - i;
          transform = 'none';
        }

        return h('div', {
          key: `${motif}-${i}`,
          className: 'dd-emblem-cluster-item',
          style: {
            left: left,
            top: top,
            zIndex: zIndex,
            transform: transform
          }
        },
          h(Emblem, {
            motif: motif,
            size: itemSize,
            interactive: interactive,
            registrationMarks: registrationMarks,
            codeLayout: codeLayout,
            rimPosition: rimPosition,
            melt: melt
          })
        );
      })
    );
  }

  function EmblemGrid(props) {
    const motifs = props.motifs || CANONICAL_CODES;
    const size = props.size || 'lg';
    const showCodes = props.showCodes !== false && props.showLabels !== false;
    const resolvedLayout = props.codeLayout || (showCodes ? 'pill' : 'none');
    const interactive = props.interactive !== false;
    const registrationMarks = props.registrationMarks !== false;
    const melt = Boolean(props.melt);

    return h('div', {
      className: `dd-emblem-grid ${props.className || ''}`,
      style: props.style
    },
      motifs.map(function (m) {
        return h('div', {
          key: m,
          style: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
          onClick: function () { if (props.onSelect) props.onSelect(m); }
        },
          h(Emblem, {
            motif: m,
            size: size,
            codeLayout: resolvedLayout,
            interactive: interactive,
            registrationMarks: registrationMarks,
            melt: melt
          })
        );
      })
    );
  }

  // Exports
  const exports = {
    Emblem: Emblem,
    EmblemBadge: Emblem,
    EmblemCluster: EmblemCluster,
    EmblemGrid: EmblemGrid,
    EMBLEM_MOTIFS: EMBLEM_MOTIFS,
    CANONICAL_CODES: CANONICAL_CODES,
    COLORWAYS: COLORWAYS,
    RAMP_STOPS: RAMP_STOPS,
    SIZES: SIZES,
    renderEmblemSvgString: renderEmblemSvgString
  };

  // Register onto global window
  global.Emblem = Emblem;
  global.EmblemBadge = Emblem;
  global.EmblemCluster = EmblemCluster;
  global.EmblemGrid = EmblemGrid;
  global.EMBLEM_MOTIFS = EMBLEM_MOTIFS;
  global.CANONICAL_CODES = CANONICAL_CODES;
  global.COLORWAYS = COLORWAYS;
  global.RAMP_STOPS = RAMP_STOPS;
  global.SIZES = SIZES;
  global.renderEmblemSvgString = renderEmblemSvgString;

  // Register onto window.DigidelicDesignSystem_da5439 namespace if present
  if (global.DigidelicDesignSystem_da5439) {
    Object.assign(global.DigidelicDesignSystem_da5439, exports);
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = exports;
  }
})(typeof window !== 'undefined' ? window : globalThis);
