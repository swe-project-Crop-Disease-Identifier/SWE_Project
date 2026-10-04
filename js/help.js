/* ==========================================================================
   help.js — FAQ accordion + category tabs for help.html
   ========================================================================== */

export function initHelpPage() {
  initTabs();
  initAccordion();
}

/* ── Category tabs ── */
function initTabs() {
  const tabs   = document.querySelectorAll('.help-v2-tab');
  const panels = document.querySelectorAll('.help-v2-panel');

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => { t.classList.remove('is-active'); t.setAttribute('aria-selected','false'); });
      panels.forEach(p => { p.classList.remove('is-visible'); p.hidden = true; });

      tab.classList.add('is-active');
      tab.setAttribute('aria-selected','true');

      const target = document.getElementById(tab.getAttribute('aria-controls'));
      if (target) { target.hidden = false; target.classList.add('is-visible'); }
    });

    tab.addEventListener('keydown', (e) => {
      const arr = Array.from(tabs);
      const idx = arr.indexOf(tab);
      if (e.key === 'ArrowRight') arr[(idx + 1) % arr.length].focus();
      if (e.key === 'ArrowLeft')  arr[(idx - 1 + arr.length) % arr.length].focus();
    });
  });
}

/* ── Accordion ── */
function initAccordion() {
  document.querySelectorAll('.faq-v2-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item   = btn.closest('.faq-v2-item');
      const isOpen = item.classList.contains('is-open');

      /* Close all in same panel */
      item.closest('.help-v2-panel')
          .querySelectorAll('.faq-v2-item.is-open')
          .forEach(o => {
            o.classList.remove('is-open');
            o.querySelector('.faq-v2-btn').setAttribute('aria-expanded','false');
          });

      if (!isOpen) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded','true');
      }
    });
  });
}
