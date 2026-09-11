/**
 * parameter-rack.js — shared parameter rack for digidelic tools
 * Provides: sliders, segments, seed display, URL sync, presets, history, keyboard shortcuts
 * Usage: Import createParameterRack from shared/parameter-rack.js
 */
export function createParameterRack(config) {
  const {
    state,
    sliders = [],
    segments = [],
    seedDisplayIds = {},
    btnRandomId,
    btnPlayId,
    btnExportId,
    btnExportSVGId,
    btnRecordId,
    btnGifId,
    btnMp4Id,
    btnShareId,
    seedReadoutId,
    cornerSeedId,
    formatSegId,
    paletteSegId,
    syncSliderCb,
    reseedCb,
    exportPNGCb,
    recordClipCb,
    recordGIFCb,
    recordMP4Cb,
    copyPermalinkCb,
    shareArtCb,
    newSeedCb,
    togglePlayCb,
    applyStateCb,
    encodeStateCb,
    decodeStateCb,
    flashStatusCb,
    pushHistoryCb,
    undoCb,
    redoCb,
  } = config;

  // Sync slider value to CSS var and value display
  function syncSlider(el) {
    const min = parseFloat(el.min), max = parseFloat(el.max), v = parseFloat(el.value);
    el.style.setProperty('--p', ((v - min) / (max - min) * 100) + '%');
    const out = document.querySelector('.val[data-val="' + el.id + '"]');
    if (out && syncSliderCb) syncSliderCb(el, out, v);
  }

  // Wire segment (radio-group) buttons
  function wireSeg(segId, attr, onPick) {
    const seg = document.getElementById(segId);
    if (!seg) return;
    seg.addEventListener('click', e => {
      const btn = e.target.closest('button'); if (!btn) return;
      seg.querySelectorAll('button').forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      onPick(btn.dataset[attr]);
      pushHistoryCb();
    });
  }

  // Update seed display in corner and readout
  function updateSeedDisplay() {
    const hex = '0x' + state.seed.toString(16).padStart(8, '0').toUpperCase();
    if (seedDisplayIds.hex) document.getElementById(seedDisplayIds.hex).textContent = hex;
    if (cornerSeedId) document.getElementById(cornerSeedId).textContent = 'seed ' + hex.toLowerCase();
  }

  // Initialize all sliders
  sliders.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', () => { syncSlider(el); if (el.id === 'grid' && reseedCb) reseedCb(); });
    el.addEventListener('change', pushHistoryCb);
    syncSlider(el);
  });

  // Initialize segments
  if (formatSegId) wireSeg(formatSegId, 'fmt', v => { state.format = v; if (reseedCb) reseedCb(); });
  if (paletteSegId) wireSeg(paletteSegId, 'pal', v => { state.palette = v; });
  if (terminalSegId) wireSeg(terminalSegId, 'term', v => { state.terminalMode = v; });

  // Buttons
  if (btnRandomId) document.getElementById(btnRandomId).addEventListener('click', newSeedCb);
  if (btnPlayId) document.getElementById(btnPlayId).addEventListener('click', togglePlayCb);
  if (btnExportId) document.getElementById(btnExportId).addEventListener('click', exportPNGCb);
  if (btnRecordId) document.getElementById(btnRecordId).addEventListener('click', recordClipCb);
  if (btnGifId) document.getElementById(btnGifId).addEventListener('click', recordGIFCb);
  if (btnMp4Id) document.getElementById(btnMp4Id).addEventListener('click', recordMP4Cb);
  if (btnExportSVGId) document.getElementById(btnExportSVGId).addEventListener('click', exportSVGCb);
  if (seedReadoutId) document.getElementById(seedReadoutId).addEventListener('click', copyPermalinkCb);
  if (btnShareId && navigator.share) {
    document.getElementById(btnShareId).hidden = false;
    document.getElementById(btnShareId).addEventListener('click', shareArtCb);
  }

  // Keyboard shortcuts
  window.addEventListener('keydown', e => {
    if (e.target.closest('input, textarea, [contenteditable]')) return;
    if (e.key === ' ' && !e.target.closest('button')) { e.preventDefault(); newSeedCb(); }
    if (e.key === 'e') exportPNGCb();
    if (e.key === 'p' && btnPlayId) document.getElementById(btnPlayId).click();
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'z') { e.preventDefault(); e.shiftKey ? redoCb() : undoCb(); }
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'y') { e.preventDefault(); redoCb(); }
  });

  // URL sync
  function fitCanvas() { history.replaceState(null, '', '#' + encodeStateCb()); }

  // Boot from URL hash
  const fromLink = location.hash ? decodeStateCb(location.hash.slice(1)) : null;
  if (fromLink) applyStateCb(fromLink);
  updateSeedDisplay();
  pushHistoryCb();

  return { syncSlider, wireSeg, updateSeedDisplay, fitCanvas };
}