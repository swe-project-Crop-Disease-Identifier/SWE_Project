/* ==========================================================================
   help.js — FAQ accordion + category tabs for help.html
   ========================================================================== */

export function initHelpPage() {
  initTabs();
  initAccordion();
  /* Open the first item of the first visible panel automatically */
  const firstItem = document.querySelector('.help-v2-panel.is-visible .faq-v2-item');
  if (firstItem) openItem(firstItem);
}

/* ── Category tabs ── */
function initTabs() {
  const tabs   = document.querySelectorAll('.help-v2-tab');
  const panels = document.querySelectorAll('.help-v2-panel');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => { t.classList.remove('is-active'); t.setAttribute('aria-selected', 'false'); });
      panels.forEach(p => { p.classList.remove('is-visible'); p.hidden = true; });

      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');

      const target = document.getElementById(tab.getAttribute('aria-controls'));
      if (target) {
        target.hidden = false;
        target.classList.add('is-visible');
        /* Open first item in newly shown panel */
        const first = target.querySelector('.faq-v2-item');
        if (first) openItem(first);
      }
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

      /* Close all siblings in same panel */
      item.closest('.help-v2-panel')
          .querySelectorAll('.faq-v2-item.is-open')
          .forEach(o => closeItem(o));

      if (!isOpen) openItem(item);
    });
  });
}

function openItem(item) {
  item.classList.add('is-open');
  const btn  = item.querySelector('.faq-v2-btn');
  const body = item.querySelector('.faq-v2-body');
  if (btn)  btn.setAttribute('aria-expanded', 'true');
  if (body) body.style.display = 'block';
}

function closeItem(item) {
  item.classList.remove('is-open');
  const btn  = item.querySelector('.faq-v2-btn');
  const body = item.querySelector('.faq-v2-body');
  if (btn)  btn.setAttribute('aria-expanded', 'false');
  if (body) body.style.display = '';
}
