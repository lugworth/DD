/**
 * project-store.js — optional IndexedDB local recovery for digidelic tools
 * Portable file import/export remains primary; this is best-effort cache.
 */
const DB_NAME = 'digidelic-projects';
const STORE_NAME = 'projects';
const VERSION = 1;

export async function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, VERSION);
    req.onupgradeneeded = e => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function saveProject(toolId, project) {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).put({ id: toolId, ...project, updatedAt: new Date().toISOString() });
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => reject(tx.error);
    });
  } catch { return false; } // Silently fail — portable file is primary
}

export async function loadProject(toolId) {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const req = tx.objectStore(STORE_NAME).get(toolId);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  } catch { return null; }
}

export async function deleteProject(toolId) {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).delete(toolId);
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => reject(tx.error);
    });
  } catch { return false; }
}

export function validateProject(candidate, schema) {
  // Basic structural validation before applying
  if (!candidate || typeof candidate !== 'object') return { valid: false, error: 'Not an object' };
  if (candidate.schemaVersion !== 1) return { valid: false, error: 'Unsupported schema version' };
  if (!candidate.toolId || !candidate.seed || !candidate.settings) return { valid: false, error: 'Missing required fields' };
  if (typeof candidate.seed !== 'number' || candidate.seed < 0 || candidate.seed > 0xffffffff) return { valid: false, error: 'Invalid seed' };
  // Could add AJV validation against schema here
  return { valid: true };
}