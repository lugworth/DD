/**
 * history-manager.js — undo/redo with content restore for digidelic tools
 * Stores full state snapshots; coalesces rapid slider changes.
 */
export function createHistoryManager(getState, applyState, maxSize = 50) {
  let history = [], index = -1, suppressed = false;

  function push() {
    if (suppressed) return;
    const snap = getState();
    const encoded = encodeState(snap);
    if (history[index] === encoded) return;
    history = history.slice(0, index + 1);
    history.push(encoded);
    if (history.length > maxSize) history.shift();
    index = history.length - 1;
  }

  function undo() {
    if (index <= 0) return false;
    index--; suppressed = true;
    applyState(decodeState(history[index]));
    suppressed = false;
    return true;
  }

  function redo() {
    if (index >= history.length - 1) return false;
    index++; suppressed = true;
    applyState(decodeState(history[index]));
    suppressed = false;
    return true;
  }

  function canUndo() { return index > 0; }
  function canRedo() { return index < history.length - 1; }
  function clear() { history = []; index = -1; }

  // Base64 URL-safe encode/decode (shared with permalink)
  function encodeState(s) {
    const json = JSON.stringify(s);
    return btoa(unescape(encodeURIComponent(json))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  function decodeState(str) {
    try {
      const b64 = str.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(decodeURIComponent(escape(atob(b64))));
    } catch { return null; }
  }

  return { push, undo, redo, canUndo, canRedo, clear, encodeState, decodeState };
}