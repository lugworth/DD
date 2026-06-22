/* digidelic glitch driver v2 — fine, intermittent micro-tears */
(function () {
  // Inject the psychedelic liquid-warp SVG filter (#psyGoo) once, so any
  // element with class .psy-liquid can melt organically. Runs regardless of
  // reduced-motion (the animate inside is cheap; CSS handles motion-reduce).
  if (!document.getElementById('psyGoo')) {
    var ns = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('width', '0'); svg.setAttribute('height', '0');
    svg.setAttribute('aria-hidden', 'true');
    svg.style.cssText = 'position:absolute;width:0;height:0';
    svg.innerHTML =
      '<defs>' +
      '<filter id="psyGoo">' +
        '<feTurbulence type="fractalNoise" baseFrequency="0.008 0.014" numOctaves="3" seed="7" result="n">' +
          '<animate attributeName="baseFrequency" dur="14s" values="0.008 0.014;0.018 0.006;0.008 0.014" repeatCount="indefinite"/>' +
        '</feTurbulence>' +
        '<feDisplacementMap in="SourceGraphic" in2="n" scale="34" xChannelSelector="R" yChannelSelector="G">' +
          '<animate attributeName="scale" dur="9s" values="22;46;22" repeatCount="indefinite"/>' +
        '</feDisplacementMap>' +
      '</filter>' +
      '<filter id="psyWave">' +
        '<feTurbulence type="turbulence" baseFrequency="0.002 0.02" numOctaves="3" seed="3" result="w">' +
          '<animate attributeName="baseFrequency" dur="9s" values="0.002 0.02;0.008 0.05;0.002 0.02" repeatCount="indefinite"/>' +
        '</feTurbulence>' +
        '<feDisplacementMap in="SourceGraphic" in2="w" scale="70" xChannelSelector="R" yChannelSelector="G">' +
          '<animate attributeName="scale" dur="7s" values="40;88;40" repeatCount="indefinite"/>' +
        '</feDisplacementMap>' +
      '</filter>' +
      '<filter id="psyWaveXL">' +
        '<feTurbulence type="turbulence" baseFrequency="0.0015 0.012" numOctaves="2" seed="9" result="wx">' +
          '<animate attributeName="baseFrequency" dur="13s" values="0.0015 0.012;0.005 0.03;0.0015 0.012" repeatCount="indefinite"/>' +
        '</feTurbulence>' +
        '<feDisplacementMap in="SourceGraphic" in2="wx" scale="120" xChannelSelector="R" yChannelSelector="G">' +
          '<animate attributeName="scale" dur="10s" values="70;150;70" repeatCount="indefinite"/>' +
        '</feDisplacementMap>' +
      '</filter>' +
      '</defs>';
    (document.body || document.documentElement).appendChild(svg);
  }

  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var stage = document.querySelector('.gl-stage') || document.body;
  var slices = document.querySelectorAll('.gl-slice');

  function rand(a, b) { return a + Math.random() * (b - a); }

  function burst() {
    stage.setAttribute('data-gl-tear', '1');
    slices.forEach(function (el) {
      el.style.setProperty('--gl-slice-top',  rand(12, 80).toFixed(1) + '%');
      el.style.setProperty('--gl-slice-top2', rand(12, 80).toFixed(1) + '%');
      el.style.setProperty('--gl-slice-x',  rand(-4, 4).toFixed(1) + 'px');
      el.style.setProperty('--gl-slice-x2', rand(-3, 3).toFixed(1) + 'px');
      el.setAttribute('data-gl-tear', '1');
    });
    // very short flash so it reads as a fine artifact, not a block
    setTimeout(function () {
      stage.removeAttribute('data-gl-tear');
      slices.forEach(function (el) { el.removeAttribute('data-gl-tear'); });
    }, 70 + Math.random() * 80);

    // occasional quick double-tap for a stutter feel
    if (Math.random() < 0.35) {
      setTimeout(function () {
        stage.setAttribute('data-gl-tear', '1');
        setTimeout(function () { stage.removeAttribute('data-gl-tear'); }, 50);
      }, 140);
    }
    schedule();
  }
  function schedule() {
    setTimeout(burst, 2600 + Math.random() * 5000);
  }
  schedule();
})();
