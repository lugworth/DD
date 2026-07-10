/* @ds-bundle: {"format":4,"namespace":"DigidelicDesignSystem_da5439","components":[],"sourceHashes":{"glitch.js":"a617609109f8","tailwind.config.js":"1b4caf4cf520"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.DigidelicDesignSystem_da5439 = window.DigidelicDesignSystem_da5439 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// glitch.js
try { (() => {
/* digidelic glitch driver v2 — fine, intermittent micro-tears */
(function () {
  // Inject the psychedelic liquid-warp SVG filter (#psyGoo) once, so any
  // element with class .psy-liquid can melt organically. Runs regardless of
  // reduced-motion (the animate inside is cheap; CSS handles motion-reduce).
  if (!document.getElementById('psyGoo')) {
    var ns = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('width', '0');
    svg.setAttribute('height', '0');
    svg.setAttribute('aria-hidden', 'true');
    svg.style.cssText = 'position:absolute;width:0;height:0';
    svg.innerHTML = '<defs>' + '<filter id="psyGoo">' + '<feTurbulence type="fractalNoise" baseFrequency="0.008 0.014" numOctaves="3" seed="7" result="n">' + '<animate attributeName="baseFrequency" dur="14s" values="0.008 0.014;0.018 0.006;0.008 0.014" repeatCount="indefinite"/>' + '</feTurbulence>' + '<feDisplacementMap in="SourceGraphic" in2="n" scale="34" xChannelSelector="R" yChannelSelector="G">' + '<animate attributeName="scale" dur="9s" values="22;46;22" repeatCount="indefinite"/>' + '</feDisplacementMap>' + '</filter>' + '<filter id="psyWave">' + '<feTurbulence type="turbulence" baseFrequency="0.002 0.02" numOctaves="3" seed="3" result="w">' + '<animate attributeName="baseFrequency" dur="9s" values="0.002 0.02;0.008 0.05;0.002 0.02" repeatCount="indefinite"/>' + '</feTurbulence>' + '<feDisplacementMap in="SourceGraphic" in2="w" scale="70" xChannelSelector="R" yChannelSelector="G">' + '<animate attributeName="scale" dur="7s" values="40;88;40" repeatCount="indefinite"/>' + '</feDisplacementMap>' + '</filter>' + '<filter id="psyWaveXL">' + '<feTurbulence type="turbulence" baseFrequency="0.0015 0.012" numOctaves="2" seed="9" result="wx">' + '<animate attributeName="baseFrequency" dur="13s" values="0.0015 0.012;0.005 0.03;0.0015 0.012" repeatCount="indefinite"/>' + '</feTurbulence>' + '<feDisplacementMap in="SourceGraphic" in2="wx" scale="120" xChannelSelector="R" yChannelSelector="G">' + '<animate attributeName="scale" dur="10s" values="70;150;70" repeatCount="indefinite"/>' + '</feDisplacementMap>' + '</filter>' + '</defs>';
    (document.body || document.documentElement).appendChild(svg);
  }
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var stage = document.querySelector('.gl-stage') || document.body;
  var slices = document.querySelectorAll('.gl-slice');
  function rand(a, b) {
    return a + Math.random() * (b - a);
  }
  function burst() {
    stage.setAttribute('data-gl-tear', '1');
    slices.forEach(function (el) {
      el.style.setProperty('--gl-slice-top', rand(12, 80).toFixed(1) + '%');
      el.style.setProperty('--gl-slice-top2', rand(12, 80).toFixed(1) + '%');
      el.style.setProperty('--gl-slice-x', rand(-4, 4).toFixed(1) + 'px');
      el.style.setProperty('--gl-slice-x2', rand(-3, 3).toFixed(1) + 'px');
      el.setAttribute('data-gl-tear', '1');
    });
    // very short flash so it reads as a fine artifact, not a block
    setTimeout(function () {
      stage.removeAttribute('data-gl-tear');
      slices.forEach(function (el) {
        el.removeAttribute('data-gl-tear');
      });
    }, 70 + Math.random() * 80);

    // occasional quick double-tap for a stutter feel
    if (Math.random() < 0.35) {
      setTimeout(function () {
        stage.setAttribute('data-gl-tear', '1');
        setTimeout(function () {
          stage.removeAttribute('data-gl-tear');
        }, 50);
      }, 140);
    }
    schedule();
  }
  function schedule() {
    setTimeout(burst, 2600 + Math.random() * 5000);
  }
  schedule();
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "glitch.js", error: String((e && e.message) || e) }); }

// tailwind.config.js
try { (() => {
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
      none: '0',
      DEFAULT: '0',
      sm: '0',
      md: '0',
      lg: '0',
      xl: '0',
      full: '0'
    },
    extend: {
      colors: {
        // base
        void: '#000000',
        soft: '#0a0a0a',
        panel: '#111110',
        raised: '#1a1a18',
        // neon heroes
        yellow: {
          DEFAULT: '#eaff00',
          dim: '#d4e800'
        },
        pink: {
          DEFAULT: '#ff2d87',
          hot: '#ff0066'
        },
        green: {
          DEFAULT: '#39ff6a',
          dim: '#00d93d'
        },
        lime: {
          DEFAULT: '#c6ff3a',
          dim: '#a0e600'
        },
        cyan: {
          DEFAULT: '#00d9ff'
        },
        blue: {
          DEFAULT: '#2d4cff',
          deep: '#0018cc'
        },
        // electric
        magenta: {
          DEFAULT: '#c800ff'
        },
        orange: {
          DEFAULT: '#ff5a00'
        },
        // duotone layer (from flower / halftone refs)
        coral: {
          DEFAULT: '#ff6050'
        },
        // was signal-red
        sky: {
          DEFAULT: '#0a84e0'
        },
        // was periwinkle
        teal: {
          DEFAULT: '#12b39b'
        }
      },
      // text-on-color always flips to black; expose as a util color
      textColor: {
        ink: '#000000'
      },
      fontFamily: {
        mono: ['Geist Mono', 'Red Hat Mono', 'ui-monospace', 'monospace'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif']
      },
      fontSize: {
        '2xs': ['10px', '1.2'],
        xs: ['11px', '1.3'],
        sm: ['12px', '1.4'],
        md: ['14px', '1.45'],
        lg: ['16px', '1.4'],
        xl: ['20px', '1.2'],
        '2xl': ['28px', '1.05'],
        '3xl': ['40px', '1.0'],
        '4xl': ['56px', '0.98'],
        '5xl': ['80px', '0.95'],
        '6xl': ['120px', '0.92']
      },
      letterSpacing: {
        tight: '-0.02em',
        wide: '0.06em',
        wider: '0.12em',
        widest: '0.22em'
      },
      spacing: {
        // 4px base — Tailwind's default 4px scale already matches;
        // explicit aliases for the named tokens
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        5: '20px',
        6: '24px',
        8: '32px',
        10: '40px',
        12: '48px',
        16: '64px',
        20: '80px',
        24: '96px'
      },
      transitionTimingFunction: {
        flow: 'cubic-bezier(0.22, 1, 0.36, 1)',
        snap: 'cubic-bezier(0.16, 1, 0.3, 1)',
        linear: 'linear'
      },
      transitionDuration: {
        fast: '80ms',
        base: '140ms'
      },
      backgroundImage: {
        // motif gradients
        'checker': 'linear-gradient(45deg,#0a84e0 25%,transparent 25%,transparent 75%,#0a84e0 75%),linear-gradient(45deg,#0a84e0 25%,transparent 25%,transparent 75%,#0a84e0 75%)',
        'hazard-yellow': 'repeating-linear-gradient(-45deg,#eaff00 0 14px,#000 14px 28px)',
        'hazard-coral': 'repeating-linear-gradient(-45deg,#ff6050 0 14px,#000 14px 28px)',
        // psychedelia — spectrum built ONLY from brand neons (no hue-rotate)
        'psy-spectrum': 'linear-gradient(90deg,#eaff00,#39ff6a,#00d9ff,#2d4cff,#c800ff,#ff2d87,#ff6050,#ff5a00,#eaff00)',
        'psy-sun': 'conic-gradient(from 0deg,#eaff00,#39ff6a,#00d9ff,#2d4cff,#c800ff,#ff2d87,#ff6050,#ff5a00,#eaff00)',
        'psy-aura': 'linear-gradient(180deg,rgba(255,45,135,0) 0%,#ff2d87 14%,#ff5a00 28%,#eaff00 42%,#39ff6a 56%,#00d9ff 70%,#2d4cff 82%,rgba(200,0,255,0) 100%)',
        // texture overlays (image refs)
        'tex-crossgrid': "url('assets/tex-crossgrid.png')",
        'tex-flower': "url('assets/tex-flower-duotone.png')",
        'tex-halftone': "url('assets/tex-halftone-portrait.png')"
      },
      keyframes: {
        'psy-spin': {
          to: {
            transform: 'rotate(360deg)'
          }
        },
        'psy-spin-ccw': {
          to: {
            transform: 'rotate(-360deg)'
          }
        },
        // saturation breathe — hue stays fixed to the palette
        'psy-sat': {
          '0%,100%': {
            filter: 'saturate(1)'
          },
          '50%': {
            filter: 'saturate(1.4) brightness(1.08)'
          }
        },
        'psy-pan': {
          '0%': {
            backgroundPosition: '0% 50%'
          },
          '100%': {
            backgroundPosition: '300% 50%'
          }
        }
      },
      animation: {
        'psy-spin': 'psy-spin 120s linear infinite',
        'psy-spin-fast': 'psy-spin 40s linear infinite',
        'psy-sat': 'psy-sat 9s ease-in-out infinite',
        'psy-pan': 'psy-pan 5s linear infinite'
      }
    }
  },
  plugins: []
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "tailwind.config.js", error: String((e && e.message) || e) }); }

})();
