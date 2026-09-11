/**
 * accessibility.js — shared accessibility helpers for digidelic tools
 * Focus management, keyboard nav, reduced motion, status announcements
 */
export function initAccessibility(root = document) {
  // Respect prefers-reduced-motion
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  function applyReducedMotion(reduce) {
    document.documentElement.style.setProperty('--d-fast', reduce ? '0.01ms' : '100ms');
    document.documentElement.style.setProperty('--d-base', reduce ? '0.01ms' : '160ms');
  }
  applyReducedMotion(mq.matches);
  mq.addEventListener('change', e => applyReducedMotion(e.matches));

  // Visible focus for all interactive elements
  const style = document.createElement('style');
  style.textContent = `
    :where(a,button,input,select,textarea,[tabindex]):focus-visible {
      outline: 2px solid var(--yellow);
      outline-offset: 1px;
    }
  `;
  document.head.appendChild(style);

  // Status announcer for screen readers
  const announcer = document.createElement('div');
  announcer.setAttribute('role', 'status');
  announcer.setAttribute('aria-live', 'polite');
  announcer.setAttribute('aria-atomic', 'true');
  announcer.style.cssText = 'position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden';
  document.body.appendChild(announcer);

  return {
    announce(msg) { announcer.textContent = msg; },
    trapFocus(container) {
      const focusable = container.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      const first = focusable[0], last = focusable[focusable.length - 1];
      function handleTab(e) {
        if (e.key !== 'Tab') return;
        if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last.focus(); } }
        else { if (document.activeElement === last) { e.preventDefault(); first.focus(); } }
      }
      container.addEventListener('keydown', handleTab);
      return () => container.removeEventListener('keydown', handleTab);
    },
    ignoreGlobalShortcutsWhileTyping(handler) {
      return e => {
        if (e.target.closest('input, textarea, [contenteditable]')) return;
        handler(e);
      };
    }
  };
}