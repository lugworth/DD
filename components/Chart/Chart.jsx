import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import {
  MONO,
  RAMP,
  hueOf,
  surfaceOf,
  geometryStyle,
  checkerFill,
  injectCSS,
  LABEL_CSS
} from '../core.js';

injectCSS('dd-chart', `
.dd-chart-box {
  background: #080808;
  border: 1px solid rgba(255,255,255,.14);
  font-family: ${MONO};
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
}
.dd-chart-hd {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: #0f0f0e;
  border-bottom: 1px solid rgba(255,255,255,.12);
  font-size: 10px;
  letter-spacing: .16em;
  text-transform: uppercase;
  color: rgba(255,255,255,.7);
}
.dd-chart-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  color: #fff;
}
.dd-chart-status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 9px;
  color: rgba(255,255,255,.45);
}
.dd-chart-hud {
  position: absolute;
  top: 40px;
  right: 12px;
  background: rgba(0,0,0,.85);
  border: 1px solid rgba(255,255,255,.2);
  padding: 6px 10px;
  font-size: 10px;
  line-height: 1.5;
  pointer-events: none;
  font-variant-numeric: tabular-nums;
  z-index: 10;
}
.dd-chart-crosshair {
  pointer-events: none;
  stroke: rgba(255,255,255,.4);
  stroke-dasharray: 2 2;
}
.dd-spark-block {
  display: inline-block;
  font-family: ${MONO};
  line-height: 1;
  letter-spacing: .02em;
  font-variant-numeric: tabular-nums;
}
.dd-gauge-tick {
  transition: opacity 120ms ease;
}
`);

// Canonical 10-stop spectral palette hexes
const COLOR_RAMP_HEX = [
  '#c800ff', // magenta
  '#ff2d87', // pink
  '#ff6050', // coral
  '#ff5a00', // orange
  '#c6ff3a', // lime
  '#39ff6a', // green
  '#00d9ff', // cyan
  '#2d6cff', // cobalt
  '#4653e8', // indigo
  '#8a3fb0'  // violet
];

/**
 * 1. WATERFALL SPECTROGRAM
 * Cascading frequency/time matrix representing spectral energy density.
 * Discrete color quantization through the Digidelic canonical ramp.
 */
export function WaterfallSpectrogram({
  width = 640,
  height = 240,
  bins = 64,
  speed = 40,
  gain = 1.0,
  freeze = false,
  preset = 'pulsar',
  accent = '#00d9ff',
  title = 'SPECTROGRAM // RF MESH FREQ CASCADE',
  subtitle = '433.92 MHz BANDWIDTH',
  surface = 'black'
}) {
  const canvasRef = useRef(null);
  const [hoverInfo, setHoverInfo] = useState(null);
  const [peakFreq, setPeakFreq] = useState(4.32);
  const s = surfaceOf(surface);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    // Buffer for history
    const historyRows = Math.floor(h);
    const rowData = [];

    // Precalculate palette RGB
    const palette = COLOR_RAMP_HEX.map(hex => {
      const c = d3.color(hex);
      return [c.r, c.g, c.b];
    });

    function sampleColor(val) {
      if (val <= 0.05) return [10, 10, 10];
      const idx = Math.min(palette.length - 1, Math.floor(val * palette.length));
      return palette[idx];
    }

    let phase = 0;
    let animId;

    function render() {
      if (!freeze) {
        phase += 0.08;
        // Generate spectral frame
        const frame = new Float32Array(bins);
        let maxVal = 0;
        let maxBin = 0;

        for (let i = 0; i < bins; i++) {
          const normX = i / bins;
          let val = 0;
          if (preset === 'pulsar') {
            const harmonic1 = Math.sin(normX * 12 + phase) * Math.cos(normX * 4);
            const harmonic2 = Math.sin(normX * 32 - phase * 1.5) * 0.5;
            const carrier = Math.exp(-Math.pow((normX - 0.42 - Math.sin(phase * 0.2) * 0.15) * 14, 2));
            const noise = (Math.random() - 0.5) * 0.18;
            val = Math.max(0, (carrier * 1.2 + harmonic1 * 0.3 + harmonic2 * 0.2 + noise) * gain);
          } else if (preset === 'carrier_sweep') {
            const sweepCenter = (Math.sin(phase * 0.3) * 0.5 + 0.5);
            const beam = Math.exp(-Math.pow((normX - sweepCenter) * 22, 2));
            const sidebandL = Math.exp(-Math.pow((normX - (sweepCenter - 0.12)) * 34, 2)) * 0.6;
            const sidebandR = Math.exp(-Math.pow((normX - (sweepCenter + 0.12)) * 34, 2)) * 0.6;
            const noise = Math.random() * 0.12;
            val = Math.max(0, (beam + sidebandL + sidebandR + noise) * gain);
          } else if (preset === 'harmonic') {
            const f1 = Math.exp(-Math.pow((normX - 0.2) * 28, 2));
            const f2 = Math.exp(-Math.pow((normX - 0.4) * 28, 2)) * 0.8;
            const f3 = Math.exp(-Math.pow((normX - 0.6) * 28, 2)) * 0.5;
            const f4 = Math.exp(-Math.pow((normX - 0.8) * 28, 2)) * 0.3;
            const pulse = (Math.sin(phase * 2) > 0.3 ? 1 : 0.2);
            val = Math.max(0, ((f1 + f2 + f3 + f4) * pulse + Math.random() * 0.1) * gain);
          } else {
            // Cosmic noise
            val = Math.max(0, (Math.random() * 0.8 + Math.sin(normX * 8 + phase) * 0.2) * gain);
          }

          val = Math.min(1.0, val);
          frame[i] = val;
          if (val > maxVal) {
            maxVal = val;
            maxBin = i;
          }
        }

        setPeakFreq(+((maxBin / bins) * 12.8 + 0.1).toFixed(2));

        // Push to history
        rowData.unshift(frame);
        if (rowData.length > historyRows) rowData.pop();

        // Draw waterfall
        const imgData = ctx.createImageData(w, h);
        const data = imgData.data;

        for (let y = 0; y < rowData.length; y++) {
          const row = rowData[y];
          for (let x = 0; x < w; x++) {
            const binIdx = Math.floor((x / w) * bins);
            const val = row[binIdx] || 0;
            const rgb = sampleColor(val);
            const px = (y * w + x) * 4;
            data[px] = rgb[0];
            data[px + 1] = rgb[1];
            data[px + 2] = rgb[2];
            data[px + 3] = 255;
          }
        }
        ctx.putImageData(imgData, 0, 0);

        // Draw grid overlay
        ctx.strokeStyle = 'rgba(255,255,255,0.08)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let i = 1; i < 8; i++) {
          const gx = (w / 8) * i;
          ctx.moveTo(gx, 0);
          ctx.lineTo(gx, h);
        }
        for (let j = 1; j < 4; j++) {
          const gy = (h / 4) * j;
          ctx.moveTo(0, gy);
          ctx.lineTo(w, gy);
        }
        ctx.stroke();
      }

      animId = setTimeout(() => {
        requestAnimationFrame(render);
      }, speed);
    }

    render();

    return () => {
      clearTimeout(animId);
    };
  }, [bins, speed, gain, freeze, preset]);

  const handleMouseMove = e => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const freq = ((x / width) * 12.8 + 0.1).toFixed(2);
    const dbm = (-12 - (1 - y / height) * 80).toFixed(1);
    setHoverInfo({ x, y, freq, dbm });
  };

  const handleMouseLeave = () => setHoverInfo(null);

  return (
    <div className="dd-chart-box" style={{ width, background: s.bg, borderColor: s.rule }}>
      <div className="dd-chart-hd" style={{ background: s.panel, borderColor: s.rule }}>
        <div className="dd-chart-title">
          <span style={{ width: 8, height: 8, background: accent }} />
          <span>{title}</span>
        </div>
        <div className="dd-chart-status">
          <span>PEAK: <b>{peakFreq} kHz</b></span>
          <span>·</span>
          <span>{subtitle}</span>
          <span>·</span>
          <span style={{ color: freeze ? '#ff6050' : '#39ff6a' }}>
            {freeze ? '● PAUSED' : '▶ CAPTURING'}
          </span>
        </div>
      </div>

      <div style={{ position: 'relative', width, height }} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
        <canvas ref={canvasRef} width={width} height={height} style={{ display: 'block', width: '100%', height: '100%' }} />

        {/* HUD Crosshair */}
        {hoverInfo && (
          <>
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
              <line x1={hoverInfo.x} y1={0} x2={hoverInfo.x} y2={height} className="dd-chart-crosshair" />
              <line x1={0} y1={hoverInfo.y} x2={width} y2={hoverInfo.y} className="dd-chart-crosshair" />
            </svg>
            <div className="dd-chart-hud" style={{ top: 10, left: Math.min(hoverInfo.x + 10, width - 150) }}>
              <div>FREQ: <span style={{ color: accent, fontWeight: 700 }}>{hoverInfo.freq} kHz</span></div>
              <div>PWR: <span style={{ color: '#ff2d87', fontWeight: 700 }}>{hoverInfo.dbm} dBm</span></div>
              <div style={{ color: 'rgba(255,255,255,.4)', fontSize: 9 }}>SAMPLE #0x{Math.floor(hoverInfo.x).toString(16).toUpperCase()}</div>
            </div>
          </>
        )}
      </div>

      {/* Axis Scale */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 10px', fontSize: 9, color: 'rgba(255,255,255,.35)', borderTop: '1px solid rgba(255,255,255,.08)', background: '#050505' }}>
        <span>0.10 kHz</span>
        <span>3.20 kHz</span>
        <span>6.40 kHz</span>
        <span>9.60 kHz</span>
        <span>12.80 kHz</span>
      </div>
    </div>
  );
}

/**
 * 2. COSMORADAR
 * Decagonal / Polar multi-vector phase-space constellation.
 * Raw hex tick markers, multiple vector envelopes, wandering trajectory point, and centroid calculation.
 */
export function CosmoRadar({
  size = 360,
  metrics = [
    { key: 'lat', label: 'LATENCY', value: 0.78, hex: '0xC7' },
    { key: 'qrm', label: 'QUORUM', value: 0.92, hex: '0xEB' },
    { key: 'ent', label: 'ENTROPY', value: 0.45, hex: '0x73' },
    { key: 'bw',  label: 'BANDWIDTH', value: 0.88, hex: '0xE1' },
    { key: 'jit', label: 'JITTER', value: 0.24, hex: '0x3D' },
    { key: 'par', label: 'PARITY', value: 0.95, hex: '0xF3' },
    { key: 'flx', label: 'FLUX', value: 0.62, hex: '0x9E' },
    { key: 'vlt', label: 'VOLTAGE', value: 0.84, hex: '0xD7' }
  ],
  secondaryMetrics = null,
  accent = '#2d6cff',
  secondaryAccent = '#ff2d87',
  title = 'COSMORADAR // PHASE CONSTELLATION',
  showTrajectory = true,
  surface = 'black'
}) {
  const s = surfaceOf(surface);
  const center = size / 2;
  const radius = (size - 80) / 2;
  const numAxes = metrics.length;
  const [activeMetric, setActiveMetric] = useState(null);
  const [trajectoryPoint, setTrajectoryPoint] = useState({ x: center, y: center, angle: 0, r: 0 });

  // Compute ring polygons (decagon/polygon stepped concentric rings)
  const rings = [0.25, 0.5, 0.75, 1.0];
  const ringLabels = ['0x40', '0x80', '0xC0', '0xFF'];

  function getPolygonPoints(r) {
    return Array.from({ length: numAxes }).map((_, i) => {
      const angle = (Math.PI * 2 * i) / numAxes - Math.PI / 2;
      const x = center + Math.cos(angle) * r;
      const y = center + Math.sin(angle) * r;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');
  }

  // Primary data polygon
  const primaryPolygon = metrics.map((m, i) => {
    const angle = (Math.PI * 2 * i) / numAxes - Math.PI / 2;
    const r = radius * Math.max(0.05, Math.min(1.0, m.value));
    const x = center + Math.cos(angle) * r;
    const y = center + Math.sin(angle) * r;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  // Secondary data polygon (if provided)
  const secondaryPolygon = secondaryMetrics ? secondaryMetrics.map((m, i) => {
    const angle = (Math.PI * 2 * i) / numAxes - Math.PI / 2;
    const r = radius * Math.max(0.05, Math.min(1.0, m.value));
    const x = center + Math.cos(angle) * r;
    const y = center + Math.sin(angle) * r;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ') : null;

  // Animate trajectory wandering point
  useEffect(() => {
    if (!showTrajectory) return;
    let t = 0;
    const timer = setInterval(() => {
      t += 0.05;
      const angle = t * 1.3;
      const dist = (0.35 + Math.sin(t * 2.1) * 0.25 + Math.cos(t * 0.8) * 0.15) * radius;
      const x = center + Math.cos(angle) * dist;
      const y = center + Math.sin(angle) * dist;
      const deg = ((angle * 180 / Math.PI) % 360 + 360) % 360;
      setTrajectoryPoint({ x, y, angle: deg.toFixed(1), r: (dist / radius).toFixed(2) });
    }, 60);
    return () => clearInterval(timer);
  }, [showTrajectory, radius, center]);

  return (
    <div className="dd-chart-box" style={{ width: size, background: s.bg, borderColor: s.rule }}>
      <div className="dd-chart-hd" style={{ background: s.panel, borderColor: s.rule }}>
        <div className="dd-chart-title">
          <span style={{ width: 8, height: 8, background: accent }} />
          <span>{title}</span>
        </div>
        <div className="dd-chart-status">
          <span>NODES: <b>0x08</b></span>
        </div>
      </div>

      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ display: 'block' }}>
          {/* Concentric Polygonal Grid Rings */}
          {rings.map((ring, idx) => (
            <g key={ring}>
              <polygon
                points={getPolygonPoints(radius * ring)}
                fill="none"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1"
                strokeDasharray={idx === 3 ? 'none' : '2 2'}
              />
              <text
                x={center + 4}
                y={center - radius * ring - 3}
                fill="rgba(255,255,255,0.3)"
                fontSize="8"
                fontFamily={MONO}
              >
                {ringLabels[idx]}
              </text>
            </g>
          ))}

          {/* Spokes & Axis labels */}
          {metrics.map((m, i) => {
            const angle = (Math.PI * 2 * i) / numAxes - Math.PI / 2;
            const x2 = center + Math.cos(angle) * radius;
            const y2 = center + Math.sin(angle) * radius;
            const labelDist = radius + 22;
            const lx = center + Math.cos(angle) * labelDist;
            const ly = center + Math.sin(angle) * labelDist;

            return (
              <g key={m.key}>
                <line
                  x1={center}
                  y1={center}
                  x2={x2}
                  y2={y2}
                  stroke="rgba(255,255,255,0.18)"
                  strokeWidth="1"
                />
                {/* Spoke tick marker */}
                <circle cx={x2} cy={y2} r="2" fill="rgba(255,255,255,0.4)" />
                {/* Metric Label */}
                <text
                  x={lx}
                  y={ly + 3}
                  textAnchor="middle"
                  fill={activeMetric === m.key ? '#fff' : 'rgba(255,255,255,0.5)'}
                  fontSize="9"
                  fontFamily={MONO}
                  fontWeight={activeMetric === m.key ? '700' : '400'}
                  style={{ cursor: 'pointer', transition: 'fill 100ms' }}
                  onMouseEnter={() => setActiveMetric(m.key)}
                  onMouseLeave={() => setActiveMetric(null)}
                >
                  {m.label}
                </text>
              </g>
            );
          })}

          {/* Crosshair cardinal guides */}
          <line x1={center - radius - 10} y1={center} x2={center + radius + 10} y2={center} stroke="rgba(255,255,255,0.06)" />
          <line x1={center} y1={center - radius - 10} x2={center} y2={center + radius + 10} stroke="rgba(255,255,255,0.06)" />

          {/* Secondary Polygon */}
          {secondaryPolygon && (
            <polygon
              points={secondaryPolygon}
              fill={secondaryAccent}
              fillOpacity="0.15"
              stroke={secondaryAccent}
              strokeWidth="1.5"
              strokeDasharray="4 2"
            />
          )}

          {/* Primary Polygon */}
          <polygon
            points={primaryPolygon}
            fill={accent}
            fillOpacity="0.25"
            stroke={accent}
            strokeWidth="2"
          />

          {/* Polygon Node Vertices */}
          {metrics.map((m, i) => {
            const angle = (Math.PI * 2 * i) / numAxes - Math.PI / 2;
            const r = radius * Math.max(0.05, Math.min(1.0, m.value));
            const x = center + Math.cos(angle) * r;
            const y = center + Math.sin(angle) * r;
            const isActive = activeMetric === m.key;

            return (
              <g key={m.key} onMouseEnter={() => setActiveMetric(m.key)} onMouseLeave={() => setActiveMetric(null)}>
                <rect
                  x={x - (isActive ? 5 : 3)}
                  y={y - (isActive ? 5 : 3)}
                  width={isActive ? 10 : 6}
                  height={isActive ? 10 : 6}
                  fill={isActive ? '#fff' : accent}
                  stroke="#000"
                  strokeWidth="1.5"
                  style={{ cursor: 'pointer', transition: 'all 120ms' }}
                />
              </g>
            );
          })}

          {/* Dynamic trajectory wanderer */}
          {showTrajectory && (
            <g>
              <line x1={center} y1={center} x2={trajectoryPoint.x} y2={trajectoryPoint.y} stroke="rgba(255,96,80,0.5)" strokeWidth="1" strokeDasharray="2 2" />
              <circle cx={trajectoryPoint.x} cy={trajectoryPoint.y} r="3.5" fill="#ff6050" />
              <circle cx={trajectoryPoint.x} cy={trajectoryPoint.y} r="7" fill="none" stroke="#ff6050" strokeWidth="1" />
            </g>
          )}

          {/* Center Origin Reticle */}
          <circle cx={center} cy={center} r="3" fill="#fff" />
          <circle cx={center} cy={center} r="6" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
        </svg>

        {/* Phase Readout Badge */}
        {showTrajectory && (
          <div className="dd-chart-hud" style={{ bottom: 10, left: 10, top: 'auto', right: 'auto' }}>
            <div>PHASE: <span style={{ color: '#ff6050' }}>θ={trajectoryPoint.angle}°</span></div>
            <div>MAGNITUDE: <span style={{ color: '#fff' }}>r={trajectoryPoint.r}</span></div>
          </div>
        )}

        {/* Hovered metric inspector */}
        {activeMetric && (
          <div className="dd-chart-hud" style={{ top: 10, right: 10 }}>
            {(() => {
              const met = metrics.find(m => m.key === activeMetric);
              if (!met) return null;
              return (
                <div>
                  <div style={{ color: accent, fontWeight: 700 }}>{met.label}</div>
                  <div>LEVEL: <b>{Math.round(met.value * 100)}%</b> ({met.hex})</div>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * 3. BRAIDED HORIZON OSCILLOSCOPE
 * Stepped multi-trace strip chart with differential channel mode, dither hatch fills, and glitch triggers.
 */
export function BraidedHorizon({
  width = 640,
  height = 200,
  pointsCount = 60,
  accentA = '#00d9ff',
  accentB = '#ff2d87',
  threshold = 0.82,
  title = 'BRAIDED HORIZON // DUAL-TRACE DIFFERENTIAL',
  glitchActive = false,
  surface = 'black'
}) {
  const s = surfaceOf(surface);
  const [dataA, setDataA] = useState([]);
  const [dataB, setDataB] = useState([]);
  const [scrubIndex, setScrubIndex] = useState(null);

  // Generate continuous or live signals
  useEffect(() => {
    let t = 0;
    const interval = setInterval(() => {
      t += 0.12;
      const newA = [];
      const newB = [];

      for (let i = 0; i < pointsCount; i++) {
        const x = i / pointsCount;
        let vA = Math.sin(x * 12 + t) * 0.35 + Math.cos(x * 24 - t * 0.8) * 0.2 + 0.45;
        let vB = Math.sin(x * 8 - t * 1.2) * 0.4 + Math.sin(x * 16 + t) * 0.15 + 0.45;

        // Glitch disturbance spike
        if (glitchActive && i > pointsCount * 0.4 && i < pointsCount * 0.6) {
          vA = Math.random() > 0.5 ? 0.98 : 0.05;
          vB = Math.random() > 0.5 ? 0.92 : 0.1;
        }

        newA.push(Math.max(0.02, Math.min(0.98, vA)));
        newB.push(Math.max(0.02, Math.min(0.98, vB)));
      }

      setDataA(newA);
      setDataB(newB);
    }, 50);

    return () => clearInterval(interval);
  }, [pointsCount, glitchActive]);

  // Construct stepped SVG path commands (L x1 y1 -> L x2 y1 -> L x2 y2)
  const stepScaleX = width / (pointsCount - 1);
  const yScale = height - 30;

  function buildSteppedPath(arr) {
    if (!arr.length) return '';
    let p = `M 0 ${(height - arr[0] * yScale).toFixed(1)}`;
    for (let i = 1; i < arr.length; i++) {
      const prevX = (i - 1) * stepScaleX;
      const currX = i * stepScaleX;
      const currY = height - arr[i] * yScale;
      // Stepped transition
      p += ` H ${currX.toFixed(1)} V ${currY.toFixed(1)}`;
    }
    return p;
  }

  function buildSteppedArea(arr) {
    if (!arr.length) return '';
    let p = `M 0 ${height}`;
    p += ` L 0 ${(height - arr[0] * yScale).toFixed(1)}`;
    for (let i = 1; i < arr.length; i++) {
      const currX = i * stepScaleX;
      const currY = height - arr[i] * yScale;
      p += ` H ${currX.toFixed(1)} V ${currY.toFixed(1)}`;
    }
    p += ` L ${(arr.length - 1) * stepScaleX} ${height} Z`;
    return p;
  }

  const pathA = useMemo(() => buildSteppedPath(dataA), [dataA]);
  const areaA = useMemo(() => buildSteppedArea(dataA), [dataA]);
  const pathB = useMemo(() => buildSteppedPath(dataB), [dataB]);

  const threshY = height - threshold * yScale;

  const handleMouseMove = e => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const idx = Math.max(0, Math.min(pointsCount - 1, Math.round(x / stepScaleX)));
    setScrubIndex(idx);
  };

  return (
    <div className="dd-chart-box" style={{ width, background: s.bg, borderColor: s.rule }}>
      <div className="dd-chart-hd" style={{ background: s.panel, borderColor: s.rule }}>
        <div className="dd-chart-title">
          <span style={{ width: 8, height: 8, background: accentA }} />
          <span>{title}</span>
        </div>
        <div className="dd-chart-status">
          <span style={{ color: accentA }}>CH-A</span>
          <span>·</span>
          <span style={{ color: accentB }}>CH-B</span>
          <span>·</span>
          <span style={{ color: '#ff6050' }}>THRESH {Math.round(threshold * 100)}%</span>
        </div>
      </div>

      <div
        style={{ position: 'relative', width, height, cursor: 'crosshair' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setScrubIndex(null)}
      >
        <svg width={width} height={height} style={{ display: 'block' }}>
          <defs>
            {/* Flat texture dither pattern for under-curve infill */}
            <pattern id="dd-hatch-stripe" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="8" stroke={accentA} strokeWidth="1.5" strokeOpacity="0.4" />
            </pattern>
            <pattern id="dd-hatch-dots" width="6" height="6" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill={accentB} fillOpacity="0.45" />
            </pattern>
          </defs>

          {/* Background horizontal rule ticks */}
          {[0.25, 0.5, 0.75].map(frac => (
            <line
              key={frac}
              x1="0"
              y1={height - frac * yScale}
              x2={width}
              y2={height - frac * yScale}
              stroke="rgba(255,255,255,0.08)"
              strokeDasharray="3 3"
            />
          ))}

          {/* Threshold alert limit gate */}
          <line
            x1="0"
            y1={threshY}
            x2={width}
            y2={threshY}
            stroke="#ff6050"
            strokeWidth="1"
            strokeDasharray="6 3"
          />
          <text x={width - 70} y={threshY - 4} fill="#ff6050" fontSize="8" fontFamily={MONO}>
            LIMIT GATE
          </text>

          {/* Hatch filled under-area for channel A */}
          <path d={areaA} fill="url(#dd-hatch-stripe)" />

          {/* Trace A (Stepped) */}
          <path d={pathA} fill="none" stroke={accentA} strokeWidth="2" />

          {/* Trace B (Stepped) */}
          <path d={pathB} fill="none" stroke={accentB} strokeWidth="1.5" strokeDasharray="3 2" />

          {/* Active scrub crosshair cursor */}
          {scrubIndex !== null && dataA[scrubIndex] !== undefined && (
            <g>
              <line
                x1={scrubIndex * stepScaleX}
                y1={0}
                x2={scrubIndex * stepScaleX}
                y2={height}
                stroke="#fff"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
              <circle
                cx={scrubIndex * stepScaleX}
                cy={height - dataA[scrubIndex] * yScale}
                r="4"
                fill={accentA}
                stroke="#000"
                strokeWidth="1.5"
              />
              <circle
                cx={scrubIndex * stepScaleX}
                cy={height - dataB[scrubIndex] * yScale}
                r="4"
                fill={accentB}
                stroke="#000"
                strokeWidth="1.5"
              />
            </g>
          )}
        </svg>

        {/* Scrub inspection HUD */}
        {scrubIndex !== null && dataA[scrubIndex] !== undefined && (
          <div className="dd-chart-hud" style={{ top: 10, left: Math.min(scrubIndex * stepScaleX + 12, width - 160) }}>
            <div style={{ color: 'rgba(255,255,255,.4)', fontSize: 9 }}>T+{(scrubIndex * 0.05).toFixed(2)}s // STEP #{scrubIndex}</div>
            <div style={{ color: accentA }}>CH-A: <b>{(dataA[scrubIndex] * 100).toFixed(1)}%</b></div>
            <div style={{ color: accentB }}>CH-B: <b>{(dataB[scrubIndex] * 100).toFixed(1)}%</b></div>
            <div style={{ color: '#fff', borderTop: '1px solid rgba(255,255,255,.2)', marginTop: 3, paddingTop: 2 }}>
              DIFF Δ: <b>{((dataA[scrubIndex] - dataB[scrubIndex]) * 100).toFixed(1)}%</b>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * 4. SECTOR TREEMAP
 * Recursive partitioned sector mosaic with digidelic texture hatching.
 */
export function SectorTreemap({
  width = 640,
  height = 240,
  sectors = [
    { code: 'SEC-A1', label: 'NEURAL WEIGHTS', bytes: '4.18 GB', value: 42, accent: '#2d6cff', texture: 'stripe' },
    { code: 'SEC-B4', label: 'TELEMETRY BUFFER', bytes: '2.40 GB', value: 24, accent: '#00d9ff', texture: 'dot' },
    { code: 'SEC-C0', label: 'FRAME PARITY', bytes: '1.60 GB', value: 16, accent: '#39ff6a', texture: 'scan' },
    { code: 'SEC-D8', label: 'PACKET QUORUM', bytes: '1.00 GB', value: 10, accent: '#c6ff3a', texture: 'checker' },
    { code: 'SEC-E2', label: 'CRYPTO ROOT', bytes: '0.80 GB', value: 8, accent: '#ff2d87', texture: 'none' }
  ],
  onSectorSelect,
  title = 'SECTOR TREEMAP // PARTITION ALLOCATION',
  surface = 'black'
}) {
  const s = surfaceOf(surface);
  const [hoveredCode, setHoveredCode] = useState(null);

  // Compute D3 Treemap layout
  const rootNode = useMemo(() => {
    const data = {
      name: 'root',
      children: sectors.map(sec => ({ ...sec }))
    };
    const hierarchy = d3.hierarchy(data).sum(d => d.value);
    const treemapLayout = d3.treemap().size([width, height]).padding(2).round(true);
    return treemapLayout(hierarchy);
  }, [sectors, width, height]);

  const leaves = rootNode.leaves();

  return (
    <div className="dd-chart-box" style={{ width, background: s.bg, borderColor: s.rule }}>
      <div className="dd-chart-hd" style={{ background: s.panel, borderColor: s.rule }}>
        <div className="dd-chart-title">
          <span style={{ width: 8, height: 8, background: '#39ff6a' }} />
          <span>{title}</span>
        </div>
        <div className="dd-chart-status">
          <span>PARTITIONS: <b>{sectors.length}</b></span>
          <span>·</span>
          <span>TOTAL: <b>9.98 GB</b></span>
        </div>
      </div>

      <div style={{ position: 'relative', width, height }}>
        <svg width={width} height={height} style={{ display: 'block' }}>
          <defs>
            <pattern id="tm-stripe" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="8" stroke="#fff" strokeWidth="1" strokeOpacity="0.25" />
            </pattern>
            <pattern id="tm-dot" width="6" height="6" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#fff" fillOpacity="0.3" />
            </pattern>
            <pattern id="tm-scan" width="4" height="4" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="4" y2="0" stroke="#fff" strokeWidth="1" strokeOpacity="0.35" />
            </pattern>
            <pattern id="tm-checker" width="10" height="10" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="5" height="5" fill="#fff" fillOpacity="0.2" />
              <rect x="5" y="5" width="5" height="5" fill="#fff" fillOpacity="0.2" />
            </pattern>
          </defs>

          {leaves.map(leaf => {
            const d = leaf.data;
            const w = leaf.x1 - leaf.x0;
            const h = leaf.y1 - leaf.y0;
            const isHovered = hoveredCode === d.code;

            return (
              <g
                key={d.code}
                transform={`translate(${leaf.x0}, ${leaf.y0})`}
                onMouseEnter={() => setHoveredCode(d.code)}
                onMouseLeave={() => setHoveredCode(null)}
                onClick={() => onSectorSelect && onSectorSelect(d)}
                style={{ cursor: 'pointer' }}
              >
                {/* Background colored rect */}
                <rect
                  width={w}
                  height={h}
                  fill={d.accent}
                  fillOpacity={isHovered ? 0.35 : 0.18}
                  stroke={isHovered ? '#fff' : d.accent}
                  strokeWidth={isHovered ? 2 : 1}
                  style={{ transition: 'all 120ms' }}
                />

                {/* Flat texture overlay */}
                {d.texture !== 'none' && (
                  <rect
                    width={w}
                    height={h}
                    fill={`url(#tm-${d.texture})`}
                    pointerEvents="none"
                  />
                )}

                {/* Tile Text Header */}
                {w > 60 && h > 40 && (
                  <g pointerEvents="none">
                    <text
                      x="8"
                      y="16"
                      fill="#fff"
                      fontSize="10"
                      fontFamily={MONO}
                      fontWeight="700"
                    >
                      {d.code}
                    </text>
                    <text
                      x="8"
                      y="30"
                      fill="rgba(255,255,255,0.6)"
                      fontSize="9"
                      fontFamily={MONO}
                    >
                      {d.label}
                    </text>
                    <text
                      x="8"
                      y={h - 10}
                      fill={d.accent}
                      fontSize="10"
                      fontFamily={MONO}
                      fontWeight="700"
                    >
                      {d.bytes} // {d.value}%
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>

        {/* Hover Inspector HUD */}
        {hoveredCode && (
          <div className="dd-chart-hud" style={{ top: 10, right: 10 }}>
            {(() => {
              const sec = sectors.find(s => s.code === hoveredCode);
              if (!sec) return null;
              return (
                <div>
                  <div style={{ color: sec.accent, fontWeight: 700 }}>{sec.code} // {sec.label}</div>
                  <div>CAPACITY: <b>{sec.bytes}</b> ({sec.value}% ALLOCATED)</div>
                  <div>HATCHING: <span style={{ textTransform: 'uppercase', color: 'rgba(255,255,255,.5)' }}>{sec.texture}</span></div>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * 5. SIGNAL FLUX CHORD
 * Cybernetic node-link topology with directed packet flows and bandwidth arcs.
 */
export function SignalFluxChord({
  size = 360,
  nodes = [
    { id: 'ALPHA', label: '0xAL', color: '#2d6cff' },
    { id: 'BETA',  label: '0xBT', color: '#00d9ff' },
    { id: 'GAMMA', label: '0xGM', color: '#39ff6a' },
    { id: 'DELTA', label: '0xDL', color: '#ff5a00' },
    { id: 'EPSIL', label: '0xEP', color: '#ff2d87' },
    { id: 'OMEGA', label: '0xOM', color: '#c800ff' }
  ],
  links = [
    { source: 'ALPHA', target: 'BETA', bandwidth: 88, status: 'ok' },
    { source: 'ALPHA', target: 'GAMMA', bandwidth: 42, status: 'ok' },
    { source: 'BETA', target: 'DELTA', bandwidth: 65, status: 'warn' },
    { source: 'GAMMA', target: 'EPSIL', bandwidth: 94, status: 'ok' },
    { source: 'DELTA', target: 'OMEGA', bandwidth: 76, status: 'ok' },
    { source: 'EPSIL', target: 'OMEGA', bandwidth: 52, status: 'warn' },
    { source: 'OMEGA', target: 'ALPHA', bandwidth: 98, status: 'ok' }
  ],
  title = 'SIGNAL FLUX // BUS TOPOLOGY',
  surface = 'black'
}) {
  const s = surfaceOf(surface);
  const center = size / 2;
  const radius = (size - 90) / 2;
  const [selectedNode, setSelectedNode] = useState(null);
  const [packetOffset, setPacketOffset] = useState(0);

  // Position nodes along perimeter
  const nodePositions = useMemo(() => {
    const pos = {};
    nodes.forEach((node, i) => {
      const angle = (Math.PI * 2 * i) / nodes.length - Math.PI / 2;
      pos[node.id] = {
        x: center + Math.cos(angle) * radius,
        y: center + Math.sin(angle) * radius,
        angle
      };
    });
    return pos;
  }, [nodes, center, radius]);

  // Stepped packet animation
  useEffect(() => {
    const timer = setInterval(() => {
      setPacketOffset(prev => (prev + 0.04) % 1.0);
    }, 40);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="dd-chart-box" style={{ width: size, background: s.bg, borderColor: s.rule }}>
      <div className="dd-chart-hd" style={{ background: s.panel, borderColor: s.rule }}>
        <div className="dd-chart-title">
          <span style={{ width: 8, height: 8, background: '#c800ff' }} />
          <span>{title}</span>
        </div>
        <div className="dd-chart-status">
          <span>NODES: <b>{nodes.length}</b></span>
          <span>·</span>
          <span>LINKS: <b>{links.length}</b></span>
        </div>
      </div>

      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ display: 'block' }}>
          {/* Background orbital guide ring */}
          <circle cx={center} cy={center} r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />

          {/* Links & Chords */}
          {links.map((link, idx) => {
            const p1 = nodePositions[link.source];
            const p2 = nodePositions[link.target];
            if (!p1 || !p2) return null;

            // Quadratic bezier curve bending toward center
            const midX = center * 0.4 + (p1.x + p2.x) * 0.3;
            const midY = center * 0.4 + (p1.y + p2.y) * 0.3;
            const d = `M ${p1.x} ${p1.y} Q ${midX} ${midY} ${p2.x} ${p2.y}`;

            const isHighlighted = !selectedNode || selectedNode === link.source || selectedNode === link.target;
            const strokeColor = link.status === 'warn' ? '#ff5a00' : '#2d6cff';

            // Calculate animated packet point along quadratic bezier
            const t = (packetOffset + idx * 0.15) % 1.0;
            const px = Math.pow(1 - t, 2) * p1.x + 2 * (1 - t) * t * midX + Math.pow(t, 2) * p2.x;
            const py = Math.pow(1 - t, 2) * p1.y + 2 * (1 - t) * t * midY + Math.pow(t, 2) * p2.y;

            return (
              <g key={`${link.source}-${link.target}`}>
                <path
                  d={d}
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth={Math.max(1.5, link.bandwidth / 30)}
                  strokeOpacity={isHighlighted ? 0.6 : 0.1}
                />
                {/* Traveling packet dot */}
                {isHighlighted && (
                  <circle cx={px} cy={py} r="3" fill="#fff" />
                )}
              </g>
            );
          })}

          {/* Nodes */}
          {nodes.map(node => {
            const p = nodePositions[node.id];
            const isSelected = selectedNode === node.id;

            return (
              <g
                key={node.id}
                transform={`translate(${p.x}, ${p.y})`}
                onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
                style={{ cursor: 'pointer' }}
              >
                {/* Outer halo if selected */}
                {isSelected && (
                  <rect x="-18" y="-18" width="36" height="36" fill="none" stroke="#fff" strokeWidth="1" strokeDasharray="3 2" />
                )}
                <rect
                  x="-13"
                  y="-13"
                  width="26"
                  height="26"
                  fill="#000"
                  stroke={node.color}
                  strokeWidth="2"
                />
                <text
                  x="0"
                  y="4"
                  textAnchor="middle"
                  fill="#fff"
                  fontSize="9"
                  fontFamily={MONO}
                  fontWeight="700"
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Selected Node Inspector HUD */}
        {selectedNode && (
          <div className="dd-chart-hud" style={{ bottom: 10, right: 10, top: 'auto' }}>
            <div style={{ color: '#fff', fontWeight: 700 }}>NODE // {selectedNode}</div>
            <div style={{ color: 'rgba(255,255,255,.5)' }}>
              ACTIVE LINKS: <b>{links.filter(l => l.source === selectedNode || l.target === selectedNode).length}</b>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * 6. ASCII SPARKLINE
 * Micro-telemetry sparklines rendered using block characters ( ▂▃▄▅▆▇█) or Braille dots.
 */
export function AsciiSparkline({
  values = [12, 18, 25, 42, 38, 55, 68, 74, 90, 85, 96, 62, 48, 70],
  mode = 'blocks', // 'blocks' | 'braille'
  accent = '#39ff6a',
  label = null,
  showMinMax = false
}) {
  const BLOCKS = [' ', '▂', '▃', '▄', '▅', '▆', '▇', '█'];
  const BRAILLE = ['⠁', '⠃', '⠇', '⡇', '⡧', '⡷', '⣷', '⣿'];

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const sparkStr = values.map(v => {
    const norm = Math.max(0, Math.min(1, (v - min) / range));
    const chars = mode === 'braille' ? BRAILLE : BLOCKS;
    const idx = Math.min(chars.length - 1, Math.floor(norm * chars.length));
    return chars[idx];
  }).join('');

  return (
    <span className="dd-spark-block">
      {label && <span style={{ color: 'rgba(255,255,255,.4)', marginRight: 6, fontSize: 10 }}>{label}:</span>}
      <span style={{ color: accent }}>{sparkStr}</span>
      {showMinMax && (
        <span style={{ color: 'rgba(255,255,255,.4)', fontSize: 9, marginLeft: 6 }}>
          [{min}..{max}]
        </span>
      )}
    </span>
  );
}

/**
 * 7. RADIAL TACHOMETER / SECTOR GAUGE
 * Segmented arc meter with discrete LED segments, alert redline, and peak hold needle.
 */
export function RadialTachometer({
  value = 74,
  max = 100,
  size = 180,
  unit = 'MB/S',
  label = 'BUS FLUX',
  accent = '#00d9ff',
  dangerThreshold = 85,
  surface = 'black'
}) {
  const s = surfaceOf(surface);
  const center = size / 2;
  const radius = size * 0.38;
  const numSegments = 32;
  const startAngle = -Math.PI * 1.25;
  const sweepAngle = Math.PI * 1.5;

  const pct = Math.max(0, Math.min(1, value / max));
  const activeSegments = Math.round(pct * numSegments);

  const segments = Array.from({ length: numSegments }).map((_, i) => {
    const frac = i / numSegments;
    const angle = startAngle + frac * sweepAngle;
    const isDanger = (frac * max) >= dangerThreshold;
    const isActive = i < activeSegments;
    const rIn = radius - 8;
    const rOut = radius + 8;

    const x1 = center + Math.cos(angle) * rIn;
    const y1 = center + Math.sin(angle) * rIn;
    const x2 = center + Math.cos(angle) * rOut;
    const y2 = center + Math.sin(angle) * rOut;

    const stroke = isDanger ? (isActive ? '#ff0066' : 'rgba(255,0,102,0.2)') : (isActive ? accent : 'rgba(255,255,255,0.12)');

    return (
      <line
        key={i}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={stroke}
        strokeWidth="3.5"
        className="dd-gauge-tick"
      />
    );
  });

  return (
    <div className="dd-chart-box" style={{ width: size, height: size, background: s.bg, borderColor: s.rule }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ display: 'block' }}>
          {segments}
        </svg>
        {/* Center Digital Readout */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none'
        }}>
          <div style={{ fontSize: 8, letterSpacing: '.18em', color: 'rgba(255,255,255,.4)', textTransform: 'uppercase' }}>
            {label}
          </div>
          <div style={{
            fontSize: 22,
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 900,
            color: value >= dangerThreshold ? '#ff0066' : accent,
            letterSpacing: '-0.02em',
            margin: '2px 0'
          }}>
            {value}
          </div>
          <div style={{ fontSize: 9, color: 'rgba(255,255,255,.5)', letterSpacing: '.1em' }}>
            {unit}
          </div>
        </div>
      </div>
    </div>
  );
}
