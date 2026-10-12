/* ==========================================================================
   main.js — shared behaviour for every page.
   --------------------------------------------------------------------------
   Responsibilities:
     1. Mobile navigation (hamburger)
     2. Offline / online banner
     3. Broken-image fallback (green gradient behind hero photos)
     4. Footer year
     5. Boot the page-specific module (upload.js) when one is declared

   ADDING A NEW PAGE (result.html, about.html, …):
     - copy the <header> and <footer> markup from index.html
     - set <body data-page="result">
     - add your page logic as a new module and register it in PAGES below.
   ========================================================================== */

/**
 * Page registry.
 * key   -> value of <body data-page>
 * load  -> dynamic import returning an init function.
 * Lazy-loaded so the Home page never downloads the upload code.
 */
import { initLang } from './lang.js';

const PAGES = {
  check:  () => import('./upload.js').then((m) => m.initCheckPage),
  result: () => import('./result.js').then((m) => m.initResultPage),
  help:   () => import('./help.js').then((m)  => m.initHelpPage),
};


/* --------------------------------------------------------------------------
   1. Mobile navigation
   -------------------------------------------------------------------------- */
function initNav() {
  const toggle = document.querySelector('[data-nav-toggle]');
  const menu = document.getElementById('mobile-nav');
  if (!toggle || !menu) return;

  const close = () => {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
    menu.hidden = true;
  };

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
    menu.hidden = isOpen;
  });

  /* Close after tapping a link, and when the viewport grows to desktop. */
  menu.addEventListener('click', (e) => {
    if (e.target.closest('a')) close();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 900) close();
  });

  /* Escape closes the drawer for keyboard users. */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      close();
      toggle.focus();
    }
  });
}


/* --------------------------------------------------------------------------
   2. Offline banner
   -------------------------------------------------------------------------- */
function initOfflineBanner() {
  const banner = document.querySelector('[data-offline-banner]');
  if (!banner) return;

  const paint = () => {
    const offline = !navigator.onLine;
    banner.hidden = !offline;
    document.body.classList.toggle('is-offline', offline);
  };

  paint();
  window.addEventListener('offline', paint);
  window.addEventListener('online', paint);
}


/* --------------------------------------------------------------------------
   3. Broken-image fallback
   Any <img data-fallback="path.svg"> that fails is hidden so the green
   gradient underneath becomes visible. If the fallback also fails, the
   element is removed so no broken-image icon is left on screen.
   -------------------------------------------------------------------------- */
function initImageFallbacks() {
  document.querySelectorAll('img[data-fallback]').forEach((img) => {
    const tryFallback = () => {
      const fallback = img.dataset.fallback;
      if (fallback && !img.dataset.fallbackUsed) {
        img.dataset.fallbackUsed = 'true';
        img.src = fallback;
      } else {
        img.classList.add('is-broken');
      }
    };
    img.addEventListener('error', tryFallback);
    // Also check immediately — src may have already failed
    if (img.complete && img.naturalWidth === 0 && img.src) tryFallback();
  });
}


/* --------------------------------------------------------------------------
   4. Footer year — keeps the footer honest without a build step.
   -------------------------------------------------------------------------- */
function initFooterYear() {
  document.querySelectorAll('[data-current-year]').forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
}


/* --------------------------------------------------------------------------
   5. Boot
   -------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------
   5b. Lazy image fade-in
   -------------------------------------------------------------------------- */
function initLazyImages() {
  document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
    if (img.complete) {
      img.classList.add('loaded');
    } else {
      img.addEventListener('load', () => img.classList.add('loaded'));
    }
  });
}

/* --------------------------------------------------------------------------
   5c. Typewriter effect — currently DISABLED
       To re-enable: uncomment initTypewriter() in boot() below,
       and add id="typewriter-text" + cursor span back in index.html
   -------------------------------------------------------------------------- */
function initTypewriter() {
  const el = document.getElementById('typewriter-text');
  if (!el) return; // safely does nothing when element is absent

  const phrases = [
    'Bigger Harvests',
    'Healthy Crops',
    'Happy Farmers',
    'Better Yields',
  ];

  let phraseIndex = 0;
  let charIndex   = 0;
  let deleting    = false;
  const TYPING_SPEED   = 80;
  const DELETING_SPEED = 45;
  const PAUSE_END      = 2200;
  const PAUSE_START    = 400;

  function tick() {
    const current = phrases[phraseIndex];
    if (!deleting) {
      el.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, PAUSE_END);
        return;
      }
      setTimeout(tick, TYPING_SPEED);
    } else {
      el.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(tick, PAUSE_START);
        return;
      }
      setTimeout(tick, DELETING_SPEED);
    }
  }
  setTimeout(tick, 800);
}

function boot() {
  initNav();
  initOfflineBanner();
  initImageFallbacks();
  initFooterYear();
  initLazyImages();
  initLang();
  // initTypewriter(); // ← uncomment this to re-enable the typewriter effect

  const page = document.body.dataset.page;
  const loadPageModule = PAGES[page];
  if (loadPageModule) {
    loadPageModule()
      .then((init) => init())
      .catch((error) => console.error(`Could not start "${page}" page:`, error));
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
