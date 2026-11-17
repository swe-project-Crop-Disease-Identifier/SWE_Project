/* ==========================================================================
   main.js — shared boot logic for every non-auth page
   --------------------------------------------------------------------------
   Responsibilities:
     1. Auth-aware navigation (different links for guests vs logged-in users)
     2. Mobile hamburger navigation
     3. Offline / online banner
     4. Broken-image fallback
     5. Footer year
     6. Lazy-image fade-in
     7. EN ↔ Bangla language switcher
     8. Boot the page-specific module (check / result / help / dashboard)
   ========================================================================== */

import { initLang }                            from './lang.js';
import { isLoggedIn, getUser, logout,
         getHistory, saveDetection }           from './session.js';

/* --------------------------------------------------------------------------
   Page registry — maps body[data-page] to its JS module's init function.
   Lazy-loaded so the home page never downloads the check-disease code.
   -------------------------------------------------------------------------- */
const PAGES = {
  check:     () => import('./upload.js').then((m) => m.initCheckPage),
  result:    () => import('./result.js').then((m) => m.initResultPage),
  help:      () => import('./help.js').then((m)  => m.initHelpPage),
  dashboard: () => Promise.resolve(initDashboard),   // inline — no extra file needed
};

/* ==========================================================================
   1. AUTH-AWARE NAVIGATION
   Renders different nav links depending on whether the user is logged in.
   ========================================================================== */
function buildNav() {
  const desktopNav  = document.getElementById('main-nav');
  const mobileNav   = document.getElementById('mobile-nav');
  const authSlot    = document.getElementById('nav-auth-slot');
  const currentPage = document.body.dataset.page;

  /* Pages that use static nav HTML (no JS-rendered nav needed) */
  if (!desktopNav) return;

  const loggedIn = isLoggedIn();
  const user     = getUser();
  const lang     = localStorage.getItem('cdi.lang') || 'en';

  /* ── Link definitions ── */
  const L = {
    home:      { href: 'index.html',     en: 'Home',       bn: 'হোম' },
    check:     { href: 'check.html',     en: 'Check Disease', bn: 'রোগ পরীক্ষা' },
    about:     { href: 'about.html',     en: 'About',      bn: 'পরিচিতি' },
    help:      { href: 'help.html',      en: 'Help',       bn: 'সাহায্য' },
    dashboard: { href: 'dashboard.html', en: 'My Dashboard', bn: 'ড্যাশবোর্ড' },
  };

  /* Active page detection */
  const pageToLink = {
    home: 'home', check: 'check', result: 'check',
    about: 'about', help: 'help', dashboard: 'dashboard',
  };
  const activeKey = pageToLink[currentPage] || '';

  /* Choose which links to show */
  const guestLinks  = ['home', 'about', 'help'];
  const authLinks   = ['home', 'about', 'help', 'dashboard'];
  const linkKeys    = loggedIn ? authLinks : guestLinks;

  /* Build a single <a> element */
  function makeLink(key) {
    const a = document.createElement('a');
    a.href = L[key].href;
    a.textContent = lang === 'bn' ? L[key].bn : L[key].en;
    a.dataset.navKey = key;         // so applyLang can update text later
    if (key === activeKey) {
      a.classList.add('is-active');
      a.setAttribute('aria-current', 'page');
    }
    return a;
  }

  /* Render desktop nav */
  desktopNav.innerHTML = '';
  linkKeys.forEach((k) => desktopNav.appendChild(makeLink(k)));

  /* Render mobile nav */
  if (mobileNav) {
    mobileNav.innerHTML = '';
    linkKeys.forEach((k) => mobileNav.appendChild(makeLink(k)));
  }

  /* Render auth slot (Login button or user greeting + logout) */
  if (authSlot) {
    authSlot.innerHTML = '';
    if (loggedIn && user) {
      const wrap = document.createElement('div');
      wrap.style.cssText = 'display:flex;align-items:center;gap:.5rem';

      const greeting = document.createElement('span');
      greeting.style.cssText = 'font-size:.8rem;font-weight:600;color:var(--green-700);white-space:nowrap;max-width:120px;overflow:hidden;text-overflow:ellipsis';
      greeting.textContent = `👤 ${user.name}`;
      wrap.appendChild(greeting);

      const logoutBtn = document.createElement('button');
      logoutBtn.className   = 'lang-toggle';    // reuse pill style
      logoutBtn.style.cssText = 'color:#C62828;border-color:#f5c6c6;background:#fff';
      logoutBtn.textContent = lang === 'bn' ? 'লগআউট' : 'Logout';
      logoutBtn.addEventListener('click', () => {
        logout();
        window.location.href = 'index.html';
      });
      wrap.appendChild(logoutBtn);
      authSlot.appendChild(wrap);
    } else {
      const loginBtn = document.createElement('a');
      loginBtn.href      = 'login.html';
      loginBtn.className = 'nav-login-btn';
      loginBtn.textContent = lang === 'bn' ? 'লগইন' : 'Login';
      authSlot.appendChild(loginBtn);
    }
  }
}

/* ==========================================================================
   2. MOBILE HAMBURGER
   ========================================================================== */
function initNav() {
  const toggle = document.querySelector('[data-nav-toggle]');
  const menu   = document.getElementById('mobile-nav');
  if (!toggle || !menu) return;

  const close = () => {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
    menu.hidden = true;
  };

  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    toggle.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
    menu.hidden = open;
  });

  menu.addEventListener('click', (e) => { if (e.target.closest('a')) close(); });
  window.addEventListener('resize', () => { if (window.innerWidth >= 900) close(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      close(); toggle.focus();
    }
  });
}

/* ==========================================================================
   3. OFFLINE BANNER
   ========================================================================== */
function initOfflineBanner() {
  const banner = document.querySelector('[data-offline-banner]');
  if (!banner) return;
  const paint = () => {
    banner.hidden = navigator.onLine;
    document.body.classList.toggle('is-offline', !navigator.onLine);
  };
  paint();
  window.addEventListener('offline', paint);
  window.addEventListener('online',  paint);
}

/* ==========================================================================
   4. BROKEN-IMAGE FALLBACK
   ========================================================================== */
function initImageFallbacks() {
  document.querySelectorAll('img[data-fallback]').forEach((img) => {
    const tryFallback = () => {
      const fb = img.dataset.fallback;
      if (fb && !img.dataset.fallbackUsed) {
        img.dataset.fallbackUsed = 'true';
        img.src = fb;
      } else {
        img.classList.add('is-broken');
      }
    };
    img.addEventListener('error', tryFallback);
    if (img.complete && img.naturalWidth === 0 && img.src) tryFallback();
  });
}

/* ==========================================================================
   5. FOOTER YEAR
   ========================================================================== */
function initFooterYear() {
  document.querySelectorAll('[data-current-year]').forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
}

/* ==========================================================================
   6. LAZY IMAGE FADE-IN
   ========================================================================== */
function initLazyImages() {
  document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
    if (img.complete) img.classList.add('loaded');
    else img.addEventListener('load', () => img.classList.add('loaded'));
  });
}

/* ==========================================================================
   7. DASHBOARD PAGE LOGIC
   Rendered inline here — no extra file needed since it only uses
   session.js data (no server calls yet).
   ========================================================================== */
function initDashboard() {
  const user    = getUser();
  const history = getHistory();

  const guestDiv   = document.getElementById('dash-guest');
  const contentDiv = document.getElementById('dash-content');

  if (!user) {
    /* Not logged in → show guest redirect */
    if (guestDiv)   guestDiv.hidden   = false;
    if (contentDiv) contentDiv.hidden = true;
    return;
  }

  /* Show dashboard content */
  if (guestDiv)   guestDiv.hidden   = true;
  if (contentDiv) contentDiv.hidden = false;

  /* ── Fill user details ── */
  const setEl = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  };

  setEl('dash-username', user.name);
  setEl('dash-email',    user.email);
  setEl('dash-avatar',   user.name.charAt(0).toUpperCase());
  setEl('profile-name',  user.name);
  setEl('profile-email', user.email);

  const joined = user.registeredAt
    ? new Date(user.registeredAt).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })
    : '—';
  setEl('profile-since', joined);
  setEl('stat-joined',   joined);

  /* ── Stats ── */
  const now       = new Date();
  const weekAgo   = new Date(now - 7 * 24 * 60 * 60 * 1000);
  const thisWeek  = history.filter((r) => new Date(r.detectedAt) >= weekAgo).length;
  setEl('stat-total', String(history.length));
  setEl('stat-week',  String(thisWeek));

  /* ── History list ── */
  const emptyEl = document.getElementById('history-empty');
  const listEl  = document.getElementById('history-list');

  if (!history.length) {
    if (emptyEl) emptyEl.hidden = false;
    if (listEl)  listEl.hidden  = true;
    return;
  }

  if (emptyEl) emptyEl.hidden = true;
  if (listEl)  listEl.hidden  = false;

  const CROP_EMOJI = {
    Tomato:'🍅', Potato:'🥔', Rice:'🌾', Chili:'🌶️',
    Maize:'🌽',  Wheat:'🌿',  Cotton:'🪴', Soybean:'🫘',
  };
  const lang = localStorage.getItem('cdi.lang') || 'en';

  listEl.innerHTML = history.slice(0, 20).map((r) => {
    const emoji   = CROP_EMOJI[r.crop] || '🌿';
    const pct     = Math.round(r.confidence * 100);
    const disease = (lang === 'bn' && r.disease_bn) ? r.disease_bn : r.disease;
    const date    = new Date(r.detectedAt).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric',
    });
    const badgeClass = pct < 65 ? 'history-item__badge history-item__badge--low'
                                : 'history-item__badge';
    return `
      <li class="history-item">
        <div class="history-item__icon" aria-hidden="true">${emoji}</div>
        <div class="history-item__info">
          <div class="history-item__disease">${r.crop} — ${disease}</div>
          <div class="history-item__meta">${date}</div>
        </div>
        <span class="${badgeClass}">${pct}%</span>
      </li>`;
  }).join('');

  /* ── Logout button ── */
  document.getElementById('logout-btn')?.addEventListener('click', () => {
    logout();
    window.location.href = 'index.html';
  });
}

/* ==========================================================================
   8. BOOT
   ========================================================================== */
function boot() {
  buildNav();       // must run first so the nav exists before initNav wires it
  initNav();
  initOfflineBanner();
  initImageFallbacks();
  initFooterYear();
  initLazyImages();
  initLang();       // applies stored language to all [data-i18n] elements

  const page = document.body.dataset.page;
  const loadPage = PAGES[page];
  if (loadPage) {
    loadPage()
      .then((init) => init())
      .catch((err) => console.error(`Page module "${page}" failed:`, err));
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
