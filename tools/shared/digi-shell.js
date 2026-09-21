/**
 * digi-shell.js — Unified Digidelic Instrument Shell, HUD, & Cybernetic Audio Synthesizer
 * Connects all 13 generative instruments into an interoperable mission-control rack.
 */

(function () {
  'use strict';

  // 13 Canonical Digidelic Instruments
  const TOOLS = [
    { slug: 'patchwork-generator', code: '0x01', name: 'Patchwork Generator', cat: 'raster', color: '#ff2d87' },
    { slug: 'cosmogram-generator', code: '0x02', name: 'Cosmogram Generator', cat: 'vector', color: '#eaff00' },
    { slug: 'glyph-foundry',       code: '0x03', name: 'Glyph Foundry',       cat: 'type',   color: '#39ff6a' },
    { slug: 'reaction-field',      code: '0x04', name: 'Diffusion Field',     cat: 'physics',color: '#00d9ff' },
    { slug: 'colony-display',      code: '0x05', name: 'Colony Display',      cat: 'hud',    color: '#2d6cff' },
    { slug: 'signal-scope',        code: '0x06', name: 'Signal Scope',        cat: 'audio',  color: '#34f2a1' },
    { slug: 'circuit-matrix',      code: '0x07', name: 'Circuit Matrix',      cat: 'matrix', color: '#ffd028' },
    { slug: 'pixel-echo',          code: '0x08', name: 'Pixel Echo',          cat: 'raster', color: '#c800ff' },
    { slug: 'pixel-knit',          code: '0x09', name: 'Pixel Knit',          cat: 'texture',color: '#ff6050' },
    { slug: 'surface-tension',     code: '0x0A', name: 'Surface Tension',     cat: 'type',   color: '#c22f3a' },
    { slug: 'culture',             code: '0x0B', name: 'Culture',             cat: 'growth', color: '#1b57ff' },
    { slug: 'readout',             code: '0x0C', name: 'Readout',             cat: 'matrix', color: '#3a22ee' },
    { slug: 'overprint',           code: '0x0D', name: 'Overprint',           cat: 'print',  color: '#ff48b0' },
  ];

  /* ═══════════════════ CYBERNETIC SOUND SYNTHESIZER ═══════════════════ */
  class CyberSynth {
    constructor() {
      this.ctx = null;
      this.muted = localStorage.getItem('digi_sound_muted') === 'true';
      this.masterGain = null;
      this._boundInit = this.init.bind(this);
      window.addEventListener('pointerdown', this._boundInit, { once: true });
      window.addEventListener('keydown', this._boundInit, { once: true });
    }

    init() {
      if (this.ctx) return;
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioContext();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.muted ? 0 : 0.15, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      } catch (e) {
        console.warn('[DigiSynth] AudioContext unavailable:', e);
      }
    }

    ensureContext() {
      if (!this.ctx) this.init();
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    setMute(muted) {
      this.muted = muted;
      localStorage.setItem('digi_sound_muted', muted ? 'true' : 'false');
      if (this.masterGain && this.ctx) {
        this.masterGain.gain.setValueAtTime(muted ? 0 : 0.15, this.ctx.currentTime);
      }
      return this.muted;
    }

    toggleMute() {
      return this.setMute(!this.muted);
    }

    click(pitch = 1200) {
      if (this.muted) return;
      this.ensureContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(pitch, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.025);

      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.025);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.03);
    }

    blip(freq = 640) {
      if (this.muted) return;
      this.ensureContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.07);
    }

    glitch() {
      if (this.muted) return;
      this.ensureContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.linearRampToValueAtTime(1400, now + 0.02);
      osc.frequency.linearRampToValueAtTime(80, now + 0.06);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start();
      osc.stop(now + 0.08);
    }

    chord(base = 220, intervals = [1, 1.25, 1.5]) {
      if (this.muted) return;
      this.ensureContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      intervals.forEach(ratio => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(base * ratio, now);

        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 0.38);
      });
    }
  }

  const synth = new CyberSynth();
  window.DigiSynth = synth;

  /* ═══════════════════ HUD SHELL INJECTOR ═══════════════════ */
  function initShell() {
    // Determine current tool
    const path = window.location.pathname;
    const currentTool = TOOLS.find(t => path.includes('/' + t.slug)) || null;

    // 1. Inject Top Checkerboard Trim if not already in document
    if (!document.querySelector('.chk-strip')) {
      const strip = document.createElement('div');
      strip.className = 'chk-strip';
      strip.setAttribute('aria-hidden', 'true');
      const accent = document.createElement('div');
      accent.className = 'chk-strip-accent';
      accent.setAttribute('aria-hidden', 'true');

      if (document.body.firstChild) {
        document.body.insertBefore(accent, document.body.firstChild);
        document.body.insertBefore(strip, accent);
      } else {
        document.body.appendChild(strip);
        document.body.appendChild(accent);
      }
    }

    // 2. Inject Ambient ASCII Background if not present
    if (!document.querySelector('.ambient-ascii')) {
      const ascii = document.createElement('div');
      ascii.className = 'ambient-ascii';
      ascii.setAttribute('aria-hidden', 'true');
      document.body.appendChild(ascii);
    }

    // 3. Inject Tool Switcher & Quick Toggles into Header
    const header = document.querySelector('header');
    if (header && !header.querySelector('.tool-switcher-wrap')) {
      const switcherWrap = document.createElement('div');
      switcherWrap.className = 'tool-switcher-wrap';
      switcherWrap.id = 'digiToolSwitcher';

      const currentCode = currentTool ? currentTool.code : '0xRACK';
      const currentName = currentTool ? currentTool.name : 'ALL TOOLS';

      switcherWrap.innerHTML = `
        <button type="button" class="tool-switcher-btn" id="digiToolSwitcherBtn" aria-expanded="false" title="Switch Digidelic Instrument">
          <span class="pip"></span>
          <span>${currentCode} // ${currentName}</span>
          <span style="font-size:8px;opacity:0.6;margin-left:4px">▼</span>
        </button>
        <div class="tool-switcher-menu" id="digiToolSwitcherMenu" role="menu">
          <div class="tool-menu-hd">
            <span>DIGIDELIC INSTRUMENT RACK</span>
            <a href="/tools/index.html" style="color:#00d9ff;text-decoration:none">HUB [0xTL] →</a>
          </div>
          ${TOOLS.map(t => {
            const isCurr = currentTool && currentTool.slug === t.slug;
            return `
              <a href="/tools/${t.slug}/index.html" class="tool-menu-item ${isCurr ? 'is-current' : ''}">
                <span>${t.name}</span>
                <span class="tool-menu-code">${t.code}</span>
              </a>
            `;
          }).join('')}
          <div style="padding:6px 12px;background:#141418;border-top:1px solid rgba(255,255,255,.1);display:flex;justify-content:space-between">
            <a href="/components/index.html" style="color:#39ff6a;font-size:9.5px;letter-spacing:.12em;text-decoration:none">COMPONENTS SPEC [0xCP] →</a>
          </div>
        </div>
      `;

      // Insert switcher next to brand or title-block
      const titleBlock = header.querySelector('.title-block') || header.querySelector('.brand');
      if (titleBlock && titleBlock.nextSibling) {
        header.insertBefore(switcherWrap, titleBlock.nextSibling);
      } else {
        header.appendChild(switcherWrap);
      }

      // Wire switcher toggle
      const btn = switcherWrap.querySelector('#digiToolSwitcherBtn');
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        synth.click(900);
        const isOpen = switcherWrap.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });

      document.addEventListener('click', (e) => {
        if (!switcherWrap.contains(e.target)) {
          switcherWrap.classList.remove('is-open');
          btn.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // 4. Inject Audio & CRT Toggles into Header or Coordinate Box
    if (header && !header.querySelector('.hud-quick-toggles')) {
      const toggles = document.createElement('div');
      toggles.className = 'hud-quick-toggles';

      const audioActive = !synth.muted;
      toggles.innerHTML = `
        <button type="button" class="hud-btn ${audioActive ? 'is-active' : ''}" id="btnAudioToggle" title="Toggle cybernetic synthesized audio feedback">
          <span>🔊</span>
          <span class="lbl">${audioActive ? 'SOUND ON' : 'MUTED'}</span>
        </button>
        <button type="button" class="hud-btn" id="btnGlitchToggle" title="Toggle RGB glitch & chromatic sync shift">
          <span>⚡</span>
          <span>GLITCH</span>
        </button>
        <button type="button" class="hud-btn" id="btnCrtToggle" title="Toggle phosphor CRT scanline mask">
          <span>📺</span>
          <span>CRT</span>
        </button>
      `;

      const coords = header.querySelector('.head-coords');
      if (coords) {
        header.insertBefore(toggles, coords);
      } else {
        header.appendChild(toggles);
      }

      // Wire Toggles
      const btnAudio = toggles.querySelector('#btnAudioToggle');
      btnAudio.addEventListener('click', () => {
        const isMuted = synth.toggleMute();
        btnAudio.classList.toggle('is-active', !isMuted);
        btnAudio.querySelector('.lbl').textContent = isMuted ? 'MUTED' : 'SOUND ON';
        if (!isMuted) synth.blip(880);
      });

      const btnGlitch = toggles.querySelector('#btnGlitchToggle');
      btnGlitch.addEventListener('click', () => {
        synth.glitch();
        document.body.classList.toggle('glitch-active');
        btnGlitch.classList.toggle('is-glitching', document.body.classList.contains('glitch-active'));
      });

      const btnCrt = toggles.querySelector('#btnCrtToggle');
      btnCrt.addEventListener('click', () => {
        synth.click(1400);
        document.body.classList.toggle('crt-active');
        btnCrt.classList.toggle('is-active', document.body.classList.contains('crt-active'));
      });
    }

    // 5. Wire Interactive Slider Audio Feedback & Button Feedback
    document.querySelectorAll('input[type=range]').forEach(slider => {
      let lastVal = slider.value;
      slider.addEventListener('input', () => {
        if (Math.abs(slider.value - lastVal) > 1) {
          lastVal = slider.value;
          synth.click(600 + Math.min(1200, slider.value * 8));
        }
      });
    });

    document.querySelectorAll('button:not(.hud-btn):not(.tool-switcher-btn)').forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.classList.contains('primary') || btn.id.includes('random') || btn.id.includes('seed')) {
          synth.chord(300, [1, 1.33, 1.5, 2]);
        } else {
          synth.click(950);
        }
      });
    });

    // 6. Global Keyboard Shortcuts
    window.addEventListener('keydown', (e) => {
      // Don't intercept if user is typing in an input or textarea
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;

      // 'M' -> toggle sound
      if (e.key === 'm' || e.key === 'M') {
        const btn = document.getElementById('btnAudioToggle');
        if (btn) btn.click();
      }
      // 'G' -> toggle glitch
      if (e.key === 'g' || e.key === 'G') {
        const btn = document.getElementById('btnGlitchToggle');
        if (btn) btn.click();
      }
      // 'C' -> toggle CRT
      if (e.key === 'c' || e.key === 'C') {
        const btn = document.getElementById('btnCrtToggle');
        if (btn) btn.click();
      }
      // '[' / ']' -> Previous / Next Tool in Rack
      if (e.key === '[' && currentTool) {
        const idx = TOOLS.findIndex(t => t.slug === currentTool.slug);
        const prev = TOOLS[(idx - 1 + TOOLS.length) % TOOLS.length];
        window.location.href = `/tools/${prev.slug}/index.html`;
      }
      if (e.key === ']' && currentTool) {
        const idx = TOOLS.findIndex(t => t.slug === currentTool.slug);
        const next = TOOLS[(idx + 1) % TOOLS.length];
        window.location.href = `/tools/${next.slug}/index.html`;
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initShell);
  } else {
    initShell();
  }

  window.DigiShell = {
    tools: TOOLS,
    synth: synth,
  };
})();
