/**
 * export-manager.js — consolidated export for digidelic tools
 * PNG, SVG, GIF, MP4, text, tile, share; dimensions, bg/transparency, progress, cancel
 */
export class ExportManager {
  constructor(canvas, getState, flashStatus) {
    this.canvas = canvas;
    this.getState = getState;
    this.flashStatus = flashStatus;
    this.recording = false;
    this.gifEncoder = null;
    this.mediaRecorder = null;
    this.chunks = [];
    this.renderFrame = null; // can be set by the tool
  }

  async exportPNG(opts = {}) {
    const { scale = 2, background = false, filename } = opts;
    const off = document.createElement('canvas');
    off.width = this.canvas.width * scale;
    off.height = this.canvas.height * scale;
    const ctx = off.getContext('2d');
    if (background) { ctx.fillStyle = '#000'; ctx.fillRect(0, 0, off.width, off.height); }
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
    if (this.renderFrame) {
      this.renderFrame(ctx, this.canvas.width, this.canvas.height);
    } else {
      ctx.drawImage(this.canvas, 0, 0);
    }
    return new Promise(resolve => off.toBlob(b => {
      if (!b) { this.flashStatus('export failed_'); resolve(null); return; }
      const a = document.createElement('a');
      a.href = URL.createObjectURL(b);
      a.download = filename || this.defaultFilename('png');
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 4000);
      this.flashStatus('png exported_');
      resolve(b);
    }, 'image/png'));
  }

  async exportSVG(opts = {}) {
    // Override in tool-specific subclass or set callback
    this.flashStatus('svg not implemented_');
  }

  async recordGIF(opts = {}) {
    const { duration = 3000, fps = 12, maxDim = 480, filename } = opts;
    if (this.recording) return;
    this.recording = true;
    const btn = document.getElementById('btnGif');
    if (btn) { btn.disabled = true; btn.classList.add('is-rec'); }

    const scale = Math.min(1, maxDim / this.canvas.width);
    const GW = Math.round(this.canvas.width * scale);
    const GH = Math.round(this.canvas.height * scale);
    const off = document.createElement('canvas');
    off.width = GW; off.height = GH;
    const octx = off.getContext('2d', { willReadFrequently: true });

    // Inlined high-fidelity LZW GIF encoder with ordered-dither
    const enc = this.createGIFEncoder(GW, GH, 8); // 8cs delay
    const total = Math.round(duration / 1000 * (100 / 8)); // Grab frames based on delay
    let n = 0;
    const interval = 80; // 8cs = 80ms

    const grab = () => {
      if (!this.recording) return;
      octx.drawImage(this.canvas, 0, 0, GW, GH);
      enc.add(octx.getImageData(0, 0, GW, GH).data);
      n++;
      if (btn) btn.textContent = '● ' + (total - n);
      if (n < total) { setTimeout(grab, interval); return; }
      if (btn) btn.textContent = '◍ packing';
      setTimeout(() => {
        const blob = new Blob([enc.finish()], { type: 'image/gif' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = filename || this.defaultFilename('gif');
        a.click();
        setTimeout(() => URL.revokeObjectURL(a.href), 4000);
        if (btn) { btn.disabled = false; btn.classList.remove('is-rec'); btn.textContent = '◉ GIF ' + (duration/1000) + 's'; }
        this.flashStatus('gif exported_');
        this.recording = false;
      }, 30);
    };
    grab();
  }

  createGIFEncoder(W, H, delayCs) {
    const B = [];
    const u8 = v => B.push(v & 255);
    const u16 = v => { B.push(v & 255); B.push((v >> 8) & 255); };
    const st = s => { for (let i = 0; i < s.length; i++) B.push(s.charCodeAt(i)); };
    const pal = [], L = [0, 51, 102, 153, 204, 255];
    for (let r = 0; r < 6; r++)
      for (let g = 0; g < 6; g++)
        for (let b = 0; b < 6; b++) pal.push([L[r], L[g], L[b]]);
    for (let i = 0; i < 40; i++) { const v = Math.round(i * 255 / 39); pal.push([v, v, v]); }
    st('GIF89a'); u16(W); u16(H); u8(0xF7); u8(0); u8(0);
    for (const c of pal) { u8(c[0]); u8(c[1]); u8(c[2]); }
    u8(0x21); u8(0xFF); u8(11); st('NETSCAPE2.0'); u8(3); u8(1); u16(0); u8(0);
    const BAY = [[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]];
    return {
      add(rgba) {
        const idx = new Uint8Array(W * H);
        for (let y = 0; y < H; y++) {
          for (let x = 0; x < W; x++) {
            const p = (y * W + x) * 4, d = (BAY[y & 3][x & 3] / 16 - 0.5) * 51;
            const r = Math.max(0, Math.min(255, rgba[p] + d));
            const g = Math.max(0, Math.min(255, rgba[p + 1] + d));
            const b = Math.max(0, Math.min(255, rgba[p + 2] + d));
            let best = Math.round(r / 51) * 36 + Math.round(g / 51) * 6 + Math.round(b / 51);
            if (Math.max(r, g, b) - Math.min(r, g, b) < 26) {
              const lum = (r + g + b) / 3, gi = 216 + Math.round(lum / 255 * 39), c = pal[best];
              if (Math.abs(pal[gi][0] - lum) < Math.abs((c[0] + c[1] + c[2]) / 3 - lum)) best = gi;
            }
            idx[y * W + x] = best;
          }
        }
        u8(0x21); u8(0xF9); u8(4); u8(4); u16(delayCs); u8(0); u8(0);
        u8(0x2C); u16(0); u16(0); u16(W); u16(H); u8(0); u8(8);
        const out = [];
        let cur = 0, bits = 0, size = 9, next = 258, dict = new Map();
        const emit = c => { cur |= c << bits; bits += size; while (bits >= 8) { out.push(cur & 255); cur >>= 8; bits -= 8; } };
        emit(256);
        let pre = idx[0];
        for (let i = 1; i < idx.length; i++) {
          const k = idx[i], key = pre * 4096 + k, f = dict.get(key);
          if (f !== undefined) { pre = f; continue; }
          emit(pre);
          if (next < 4096) { dict.set(key, next++); if (next > (1 << size) && size < 12) size++; }
          else { emit(256); dict = new Map(); next = 258; size = 9; }
          pre = k;
        }
        emit(pre); emit(257);
        if (bits > 0) out.push(cur & 255);
        for (let i = 0; i < out.length; i += 255) {
          const n = Math.min(255, out.length - i);
          u8(n);
          for (let j = 0; j < n; j++) u8(out[i + j]);
        }
        u8(0);
      },
      finish() { u8(0x3B); return new Uint8Array(B); }
    };
  }

  async recordMP4(opts = {}) {
    const { duration = 6000, fps = 30, filename } = opts;
    const btn = document.getElementById('btnMp4');
    if (btn && btn.disabled) return;
    if (typeof VideoEncoder === 'undefined') { this.flashStatus('no webcodecs in this browser_'); return; }

    const W = Math.max(2, Math.min(1280, this.canvas.width) & ~1);
    const H = Math.max(2, Math.round(W * this.canvas.height / this.canvas.width) & ~1);
    const off = document.createElement('canvas');
    off.width = W; off.height = H;
    const octx = off.getContext('2d');
    const total = Math.round(duration / 1000 * fps);
    const samples = [];
    let avcC = null, broken = false, n = 0;

    const reset = () => {
      if (btn) { btn.disabled = false; btn.classList.remove('is-rec'); btn.textContent = '▣ MP4 6s'; }
    };

    let enc;
    try {
      enc = new VideoEncoder({
        output: (chunk, meta) => {
          if (!avcC && meta && meta.decoderConfig && meta.decoderConfig.description)
            avcC = new Uint8Array(meta.decoderConfig.description);
          const d = new Uint8Array(chunk.byteLength);
          chunk.copyTo(d);
          samples.push({ data: d, key: chunk.type === 'key' });
        },
        error: () => { broken = true; }
      });
      enc.configure({ codec: 'avc1.42001f', width: W, height: H, bitrate: 8000000, framerate: fps, avc: { format: 'avc' } });
    } catch {
      this.flashStatus('h264 encoding unavailable_');
      return;
    }

    if (btn) { btn.disabled = true; btn.classList.add('is-rec'); }

    const grab = () => {
      if (broken) { reset(); this.flashStatus('encoder failed_'); return; }
      octx.drawImage(this.canvas, 0, 0, W, H);
      try {
        const frame = new VideoFrame(off, { timestamp: Math.round(n * 1000000 / fps), duration: Math.round(1000000 / fps) });
        enc.encode(frame, { keyFrame: n % fps === 0 });
        frame.close();
      } catch { broken = true; }
      n++;
      if (btn) btn.textContent = '● ' + Math.max(0, Math.ceil((total - n) / fps));
      if (n < total) { setTimeout(grab, 1000 / fps); return; }
      if (btn) btn.textContent = '◍ muxing';
      enc.flush().then(() => {
        try { enc.close(); } catch {}
        if (broken || !avcC || !samples.length) { reset(); this.flashStatus('mp4 encode failed_'); return; }
        const mp4 = this.buildMP4Mux(samples, { width: W, height: H, fps, avcC });
        const blob = new Blob([mp4], { type: 'video/mp4' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = filename || this.defaultFilename('mp4');
        a.click();
        setTimeout(() => URL.revokeObjectURL(a.href), 4000);
        reset();
        this.flashStatus('mp4 exported_');
      }).catch(() => { reset(); this.flashStatus('mp4 encode failed_'); });
    };
    grab();
  }

  buildMP4Mux(samples, opt) {
    const { width, height, fps, avcC } = opt;
    const b = (...v) => Uint8Array.from(v);
    const u16 = v => b((v >> 8) & 255, v & 255);
    const u32 = v => b((v >>> 24) & 255, (v >>> 16) & 255, (v >>> 8) & 255, v & 255);
    const s4 = s => Uint8Array.from([...s].map(c => c.charCodeAt(0)));
    const zeros = n => new Uint8Array(n);
    const cat = a => {
      let n = 0; for (const x of a) n += x.length;
      const o = new Uint8Array(n); let p = 0; for (const x of a) { o.set(x, p); p += x.length; } return o;
    };
    const mp4Box = (type, ...payload) => {
      let len = 8;
      for (const p of payload) len += p.length;
      const out = new Uint8Array(len);
      out[0] = (len >>> 24) & 255; out[1] = (len >>> 16) & 255; out[2] = (len >>> 8) & 255; out[3] = len & 255;
      for (let i = 0; i < 4; i++) out[4 + i] = type.charCodeAt(i);
      let o = 8;
      for (const p of payload) { out.set(p, o); o += p.length; }
      return out;
    };

    const TS = 90000, dur = Math.round(TS / fps), duration = dur * samples.length;
    const mdat = mp4Box('mdat', cat(samples.map(s => s.data)));
    const ftyp = mp4Box('ftyp', s4('isom'), u32(512), s4('isom'), s4('iso2'), s4('avc1'), s4('mp41'));
    const chunkOffset = ftyp.length + 8;
    const matrix = cat([u32(0x00010000), u32(0), u32(0), u32(0), u32(0x00010000), u32(0), u32(0), u32(0), u32(0x40000000)]);
    const mvhd = mp4Box('mvhd', b(0, 0, 0, 0), u32(0), u32(0), u32(TS), u32(duration),
      u32(0x00010000), u16(0x0100), zeros(10), matrix, zeros(24), u32(2));
    const tkhd = mp4Box('tkhd', b(0, 0, 0, 3), u32(0), u32(0), u32(1), u32(0), u32(duration),
      zeros(8), u16(0), u16(0), u16(0), u16(0), matrix, u32(width << 16), u32(height << 16));
    const mdhd = mp4Box('mdhd', b(0, 0, 0, 0), u32(0), u32(0), u32(TS), u32(duration), u16(0x55C4), u16(0));
    const hdlr = mp4Box('hdlr', b(0, 0, 0, 0), u32(0), s4('vide'), zeros(12), s4('VideoHandler\0'));
    const vmhd = mp4Box('vmhd', b(0, 0, 0, 1), u16(0), u16(0), u16(0), u16(0));
    const dinf = mp4Box('dinf', mp4Box('dref', b(0, 0, 0, 0), u32(1), mp4Box('url ', b(0, 0, 0, 1))));
    const avc1 = mp4Box('avc1', zeros(6), u16(1), u16(0), u16(0), zeros(12),
      u16(width), u16(height), u32(0x00480000), u32(0x00480000), u32(0),
      u16(1), new Uint8Array(32), u16(0x0018), u16(0xFFFF), mp4Box('avcC', avcC));
    const stsd = mp4Box('stsd', b(0, 0, 0, 0), u32(1), avc1);
    const stts = mp4Box('stts', b(0, 0, 0, 0), u32(1), u32(samples.length), u32(dur));
    const keys = [];
    samples.forEach((s, i) => { if (s.key) keys.push(i + 1); });
    const stss = mp4Box('stss', b(0, 0, 0, 0), u32(keys.length), cat(keys.map(u32)));
    const stsc = mp4Box('stsc', b(0, 0, 0, 0), u32(1), u32(1), u32(samples.length), u32(1));
    const stsz = mp4Box('stsz', b(0, 0, 0, 0), u32(0), u32(samples.length), cat(samples.map(s => u32(s.data.length))));
    const stco = mp4Box('stco', b(0, 0, 0, 0), u32(1), u32(chunkOffset));
    const stbl = mp4Box('stbl', stsd, stts, stss, stsc, stsz, stco);
    const moov = mp4Box('moov', mvhd, mp4Box('trak', tkhd,
      mp4Box('mdia', mdhd, hdlr, mp4Box('minf', vmhd, dinf, stbl))));
    return cat([ftyp, mdat, moov]);
  }

  async shareArt(opts = {}) {
    const { scale = 2 } = opts;
    const off = document.createElement('canvas');
    off.width = this.canvas.width * scale;
    off.height = this.canvas.height * scale;
    const ctx = off.getContext('2d');
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
    if (this.renderFrame) {
      this.renderFrame(ctx, this.canvas.width, this.canvas.height);
    } else {
      ctx.drawImage(this.canvas, 0, 0);
    }
    off.toBlob(async blob => {
      if (!blob) return;
      const file = new File([blob], this.defaultFilename('png'), { type: 'image/png' });
      try {
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({ files: [file], title: 'digidelic — ' + this.getState().toolId });
        }
      } catch { /* cancelled */ }
    }, 'image/png');
  }

  defaultFilename(ext) {
    const s = this.getState();
    const seed = s.seed.toString(16).padStart(8, '0');
    return 'digidelic-' + s.toolId + '-' + seed + '.' + ext;
  }

  stopRecording() {
    this.recording = false;
  }
}
