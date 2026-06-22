/**
 * digidelic Design System — Tailwind config
 * v2.2 — palette retuned to coral / sky / teal duotone refs;
 *        psychedelia tokens added (brand-spectrum gradients, spin/sat/pan)
 *
 * Usage (real project):
 *   // tailwind.config.js
 *   const digidelic = require('./tailwind.config.js');
 *   module.exports = digidelic;
 *
 * Or copy the `theme.extend` block into your own config.
 * Pair with the @layer utilities in tailwind-utilities.css for
 * the checker / hazard / texture / glitch motifs.
 */
module.exports = {
  content: ['./**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    // hard-reset radius — digidelic is zero-radius everywhere
    borderRadius: {
      none: '0', DEFAULT: '0', sm: '0', md: '0', lg: '0', xl: '0', full: '0',
    },
    extend: {
      colors: {
        // base
        void:    '#000000',
        soft:    '#0a0a0a',
        panel:   '#111110',
        raised:  '#1a1a18',
        // neon heroes
        yellow:  { DEFAULT: '#eaff00', dim: '#d4e800' },
        pink:    { DEFAULT: '#ff2d87', hot: '#ff0066' },
        green:   { DEFAULT: '#39ff6a', dim: '#00d93d' },
        lime:    { DEFAULT: '#c6ff3a', dim: '#a0e600' },
        cyan:    { DEFAULT: '#00d9ff' },
        blue:    { DEFAULT: '#2d4cff', deep: '#0018cc' }, // electric
        magenta: { DEFAULT: '#c800ff' },
        orange:  { DEFAULT: '#ff5a00' },
        // duotone layer (from flower / halftone refs)
        coral:   { DEFAULT: '#ff6050' },  // was signal-red
        sky:     { DEFAULT: '#0a84e0' },  // was periwinkle
        teal:    { DEFAULT: '#12b39b' },
      },
      // text-on-color always flips to black; expose as a util color
      textColor: { ink: '#000000' },
      fontFamily: {
        mono:    ['Geist Mono', 'Red Hat Mono', 'ui-monospace', 'monospace'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['10px', '1.2'],
        xs:    ['11px', '1.3'],
        sm:    ['12px', '1.4'],
        md:    ['14px', '1.45'],
        lg:    ['16px', '1.4'],
        xl:    ['20px', '1.2'],
        '2xl': ['28px', '1.05'],
        '3xl': ['40px', '1.0'],
        '4xl': ['56px', '0.98'],
        '5xl': ['80px', '0.95'],
        '6xl': ['120px', '0.92'],
      },
      letterSpacing: {
        tight: '-0.02em', wide: '0.06em', wider: '0.12em', widest: '0.22em',
      },
      spacing: {
        // 4px base — Tailwind's default 4px scale already matches;
        // explicit aliases for the named tokens
        1: '4px', 2: '8px', 3: '12px', 4: '16px', 5: '20px',
        6: '24px', 8: '32px', 10: '40px', 12: '48px', 16: '64px',
        20: '80px', 24: '96px',
      },
      transitionTimingFunction: {
        flow: 'cubic-bezier(0.22, 1, 0.36, 1)',
        snap: 'cubic-bezier(0.16, 1, 0.3, 1)',
        linear: 'linear',
      },
      transitionDuration: { fast: '80ms', base: '140ms' },
      backgroundImage: {
        // motif gradients
        'checker': 'linear-gradient(45deg,#0a84e0 25%,transparent 25%,transparent 75%,#0a84e0 75%),linear-gradient(45deg,#0a84e0 25%,transparent 25%,transparent 75%,#0a84e0 75%)',
        'hazard-yellow': 'repeating-linear-gradient(-45deg,#eaff00 0 14px,#000 14px 28px)',
        'hazard-coral':  'repeating-linear-gradient(-45deg,#ff6050 0 14px,#000 14px 28px)',
        // psychedelia — spectrum built ONLY from brand neons (no hue-rotate)
        'psy-spectrum': 'linear-gradient(90deg,#eaff00,#39ff6a,#00d9ff,#2d4cff,#c800ff,#ff2d87,#ff6050,#ff5a00,#eaff00)',
        'psy-sun':      'conic-gradient(from 0deg,#eaff00,#39ff6a,#00d9ff,#2d4cff,#c800ff,#ff2d87,#ff6050,#ff5a00,#eaff00)',
        'psy-aura':     'linear-gradient(180deg,rgba(255,45,135,0) 0%,#ff2d87 14%,#ff5a00 28%,#eaff00 42%,#39ff6a 56%,#00d9ff 70%,#2d4cff 82%,rgba(200,0,255,0) 100%)',
        // texture overlays (image refs)
        'tex-crossgrid': "url('assets/tex-crossgrid.png')",
        'tex-flower':    "url('assets/tex-flower-duotone.png')",
        'tex-halftone':  "url('assets/tex-halftone-portrait.png')",
      },
      keyframes: {
        'psy-spin':    { to: { transform: 'rotate(360deg)' } },
        'psy-spin-ccw':{ to: { transform: 'rotate(-360deg)' } },
        // saturation breathe — hue stays fixed to the palette
        'psy-sat':     { '0%,100%': { filter: 'saturate(1)' }, '50%': { filter: 'saturate(1.4) brightness(1.08)' } },
        'psy-pan':     { '0%': { backgroundPosition: '0% 50%' }, '100%': { backgroundPosition: '300% 50%' } },
      },
      animation: {
        'psy-spin':  'psy-spin 120s linear infinite',
        'psy-spin-fast': 'psy-spin 40s linear infinite',
        'psy-sat':   'psy-sat 9s ease-in-out infinite',
        'psy-pan':   'psy-pan 5s linear infinite',
      },
    },
  },
  plugins: [],
};
