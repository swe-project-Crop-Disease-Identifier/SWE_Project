/* ==========================================================================
   auth.js — Login & Registration page logic
   Crop Disease Identifier
   --------------------------------------------------------------------------
   Handles:
   - EN ↔ Bangla language switching (mirrors main site lang.js)
   - Form validation (email, password, confirm, name, terms)
   - Password visibility toggle
   - Password strength meter (register page)
   - Remember Me (email persisted in localStorage — NOT password)
   - Loading / disabled state on submit buttons
   - API-ready form submission stubs (see ⚠️ API PLACEHOLDER comments)
   ========================================================================== */

/* ==========================================================================
   1. TRANSLATIONS
   ========================================================================== */
const T = {
  /* ── Shared ── */
  'auth.lang.bn':          { en: 'বাংলা',   bn: 'English' },
  'auth.brand.sub':        { en: 'Identifier', bn: 'শনাক্তকারী' },
  'auth.or':               { en: 'or',      bn: 'অথবা' },
  'auth.google':           { en: 'Continue with Google', bn: 'Google দিয়ে লগইন করুন' },
  'auth.apple':            { en: 'Continue with Apple',  bn: 'Apple দিয়ে লগইন করুন' },
  'auth.google.reg':       { en: 'Sign up with Google',  bn: 'Google দিয়ে নিবন্ধন করুন' },
  'auth.apple.reg':        { en: 'Sign up with Apple',   bn: 'Apple দিয়ে নিবন্ধন করুন' },
  'auth.back.home':        { en: 'Back to Home',          bn: 'হোমে ফিরুন' },

  /* ── Field labels ── */
  'auth.name.label':       { en: 'Full Name',         bn: 'পুরো নাম' },
  'auth.email.label':      { en: 'Email Address',     bn: 'ইমেইল ঠিকানা' },
  'auth.phone.label':      { en: 'Phone Number',      bn: 'ফোন নম্বর' },
  'auth.optional':         { en: ' (optional)',        bn: ' (ঐচ্ছিক)' },
  'auth.password.label':   { en: 'Password',          bn: 'পাসওয়ার্ড' },
  'auth.confirm.label':    { en: 'Confirm Password',  bn: 'পাসওয়ার্ড নিশ্চিত করুন' },

  /* ── Placeholders ── */
  'auth.name.placeholder':    { en: 'Rahim Uddin',          bn: 'রহিম উদ্দিন' },
  'auth.email.placeholder':   { en: 'you@example.com',      bn: 'you@example.com' },
  'auth.phone.placeholder':   { en: '+880 1X-XXXX-XXXX',    bn: '+৮৮০ ১X-XXXX-XXXX' },
  'auth.password.placeholder':{ en: '••••••••',             bn: '••••••••' },
  'auth.confirm.placeholder': { en: '••••••••',             bn: '••••••••' },

  /* ── Error messages ── */
  'auth.name.error':       { en: 'Please enter your full name.',          bn: 'অনুগ্রহ করে আপনার পুরো নাম দিন।' },
  'auth.email.error':      { en: 'Please enter a valid email address.',   bn: 'সঠিক ইমেইল ঠিকানা দিন।' },
  'auth.password.error':   { en: 'Password must be at least 6 characters.', bn: 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষর হতে হবে।' },
  'auth.newpassword.error':{ en: 'Min 8 characters with a number.',       bn: 'কমপক্ষে ৮ অক্ষর ও একটি সংখ্যা দিন।' },
  'auth.confirm.error':    { en: 'Passwords do not match.',               bn: 'পাসওয়ার্ড মিলছে না।' },
  'auth.terms.error':      { en: 'Please accept the terms to continue.',  bn: 'চালিয়ে যেতে শর্তাবলী মেনে নিন।' },

  /* ── Login page ── */
  'auth.login.heading':    { en: 'Welcome Back!',                         bn: 'স্বাগতম!' },
  'auth.login.sub':        { en: 'Sign in to continue protecting your crops.', bn: 'আপনার ফসল রক্ষা করতে লগইন করুন।' },
  'auth.remember':         { en: 'Remember me',                           bn: 'আমাকে মনে রাখুন' },
  'auth.forgot':           { en: 'Forgot password?',                      bn: 'পাসওয়ার্ড ভুলে গেছেন?' },
  'auth.login.btn':        { en: 'Log In',                                bn: 'লগইন করুন' },
  'auth.no.account':       { en: "Don't have an account?",                bn: 'অ্যাকাউন্ট নেই?' },
  'auth.signup.link':      { en: ' Sign Up',                              bn: ' নিবন্ধন করুন' },

  /* ── Register page ── */
  'auth.register.heading': { en: 'Create Your Account',                   bn: 'অ্যাকাউন্ট তৈরি করুন' },
  'auth.register.sub':     { en: 'Join us to keep your crops healthy.',   bn: 'আপনার ফসল সুস্থ রাখতে যোগ দিন।' },
  'auth.terms.agree':      { en: 'I agree to the',                        bn: 'আমি রাজি' },
  'auth.terms.link':       { en: ' Terms & Conditions',                   bn: ' শর্তাবলীতে' },
  'auth.register.btn':     { en: 'Create Account',                        bn: 'অ্যাকাউন্ট তৈরি করুন' },
  'auth.has.account':      { en: 'Already have an account?',              bn: 'ইতিমধ্যে অ্যাকাউন্ট আছে?' },
  'auth.login.link':       { en: ' Log In',                               bn: ' লগইন করুন' },
};

/* ==========================================================================
   2. LANGUAGE ENGINE
   ========================================================================== */
const LANG_KEY = 'cdi.lang';

function getLang()      { return localStorage.getItem(LANG_KEY) || 'en'; }
function setLang(lang)  { localStorage.setItem(LANG_KEY, lang); }

function applyLang(lang) {
  document.documentElement.lang = lang === 'bn' ? 'bn' : 'en';

  /* text */
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const v = T[el.dataset.i18n]?.[lang];
    if (v !== undefined) el.textContent = v;
  });

  /* placeholders */
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const v = T[el.dataset.i18nPlaceholder]?.[lang];
    if (v !== undefined) el.placeholder = v;
  });

  /* toggle button label */
  const lbl = document.getElementById('lang-label');
  if (lbl) lbl.textContent = lang === 'en'
    ? T['auth.lang.bn'].en   /* show "বাংলা" */
    : T['auth.lang.bn'].bn;  /* show "English" */
}

function initLang() {
  const lang = getLang();
  applyLang(lang);

  document.getElementById('lang-toggle')?.addEventListener('click', () => {
    const next = getLang() === 'en' ? 'bn' : 'en';
    setLang(next);
    applyLang(next);
  });
}

/* ==========================================================================
   3. PASSWORD VISIBILITY TOGGLE
   ========================================================================== */
function initPasswordToggles() {
  document.querySelectorAll('.pw-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const input = document.getElementById(btn.dataset.target);
      if (!input) return;
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      btn.querySelector('.eye-open').style.display  = isPassword ? 'none'  : '';
      btn.querySelector('.eye-closed').style.display= isPassword ? ''      : 'none';
      btn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
    });
  });
}

/* ==========================================================================
   4. FIELD HELPERS
   ========================================================================== */
function showError(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('is-visible');
}
function clearError(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('is-visible');
}
function markInput(id, hasError) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.toggle('is-error', hasError);
}
function showGlobalAlert(msg) {
  const alert = document.getElementById('global-alert');
  const text  = document.getElementById('global-alert-text');
  if (!alert || !text) return;
  text.textContent = msg;
  alert.classList.add('is-visible');
}
function clearGlobalAlert() {
  document.getElementById('global-alert')?.classList.remove('is-visible');
}

/* ==========================================================================
   5. VALIDATORS
   ========================================================================== */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail(val) { return EMAIL_RE.test(val.trim()); }
function validatePassword(val, min = 6) { return val.length >= min; }
function validateNewPassword(val) {
  return val.length >= 8 && /[0-9]/.test(val);
}
function validateMatch(a, b) { return a === b; }
function validateName(val) { return val.trim().length >= 2; }

/* ==========================================================================
   6. PASSWORD STRENGTH METER
   ========================================================================== */
function updateStrength(password) {
  const bars = [
    document.getElementById('str-1'),
    document.getElementById('str-2'),
    document.getElementById('str-3'),
    document.getElementById('str-4'),
  ].filter(Boolean);
  if (!bars.length) return;

  let score = 0;
  if (password.length >= 8)             score++;
  if (/[A-Z]/.test(password))           score++;
  if (/[0-9]/.test(password))           score++;
  if (/[^A-Za-z0-9]/.test(password))   score++;

  const labels = ['', 'weak', 'fair', 'good', 'strong'];
  bars.forEach((bar, i) => {
    bar.className = 'pw-strength__bar';
    if (i < score) bar.classList.add(labels[score]);
  });
}

/* ==========================================================================
   7. LOGIN PAGE
   ========================================================================== */
function initLoginPage() {
  const form       = document.getElementById('login-form');
  const btn        = document.getElementById('login-btn');
  const emailInput = document.getElementById('login-email');
  const pwInput    = document.getElementById('login-password');
  const rememberCb = document.getElementById('remember-me');

  if (!form) return;

  /* Pre-fill remembered email */
  const saved = localStorage.getItem('cdi.rememberedEmail');
  if (saved && emailInput) {
    emailInput.value = saved;
    if (rememberCb) rememberCb.checked = true;
  }

  /* Inline validation on blur */
  emailInput?.addEventListener('blur', () => {
    const ok = validateEmail(emailInput.value);
    markInput('login-email', !ok && emailInput.value.length > 0);
    if (!ok && emailInput.value.length > 0) showError('email-error');
    else clearError('email-error');
  });

  pwInput?.addEventListener('blur', () => {
    const ok = validatePassword(pwInput.value, 6);
    markInput('login-password', !ok && pwInput.value.length > 0);
    if (!ok && pwInput.value.length > 0) showError('password-error');
    else clearError('password-error');
  });

  /* Submit */
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearGlobalAlert();

    const email    = emailInput?.value.trim() || '';
    const password = pwInput?.value || '';
    let valid = true;

    if (!validateEmail(email)) {
      showError('email-error'); markInput('login-email', true); valid = false;
    } else { clearError('email-error'); markInput('login-email', false); }

    if (!validatePassword(password, 6)) {
      showError('password-error'); markInput('login-password', true); valid = false;
    } else { clearError('password-error'); markInput('login-password', false); }

    if (!valid) return;

    /* Remember Me */
    if (rememberCb?.checked) {
      localStorage.setItem('cdi.rememberedEmail', email);
    } else {
      localStorage.removeItem('cdi.rememberedEmail');
    }

    /* ⚠️ API PLACEHOLDER ─────────────────────────────────────────────────
       Replace the block below with your real login API call.
       Expected backend endpoint: POST /api/auth/login
       Request body:  { email, password }
       Success:       { token, user: { id, name, email } }
       Failure:       { error: "Invalid credentials" }
    ──────────────────────────────────────────────────────────────────── */
    setLoading(btn, true);
    try {
      await mockApiDelay(1200); // ← REMOVE this line when connecting real API

      /* ── On real success from backend: ────────────────────────────────
         const res = await fetch('/api/auth/login', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ email, password }),
         });
         const data = await res.json();
         if (!res.ok) throw new Error(data.error || 'Login failed');
         localStorage.setItem('cdi.token', data.token);
         window.location.href = 'index.html';
      ─────────────────────────────────────────────────────────────────── */

      /* TEMP: redirect to home after mock delay */
      window.location.href = 'index.html';

    } catch (err) {
      showGlobalAlert(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(btn, false);
    }
    /* ── END API PLACEHOLDER ─────────────────────────────────────────── */
  });

  /* Forgot password link */
  document.getElementById('forgot-link')?.addEventListener('click', (e) => {
    e.preventDefault();
    /* ⚠️ API PLACEHOLDER: implement password-reset flow or link to /forgot-password.html */
    alert('Password reset link will be sent to your email. (Backend integration required)');
  });
}

/* ==========================================================================
   8. REGISTER PAGE
   ========================================================================== */
function initRegisterPage() {
  const form        = document.getElementById('register-form');
  const btn         = document.getElementById('register-btn');
  const nameInput   = document.getElementById('reg-name');
  const emailInput  = document.getElementById('reg-email');
  const pwInput     = document.getElementById('reg-password');
  const confInput   = document.getElementById('reg-confirm');
  const termsCb     = document.getElementById('terms');

  if (!form) return;

  /* Password strength live update */
  pwInput?.addEventListener('input', () => updateStrength(pwInput.value));

  /* Inline blur validation */
  nameInput?.addEventListener('blur', () => {
    const ok = validateName(nameInput.value);
    markInput('reg-name', !ok && nameInput.value.length > 0);
    if (!ok && nameInput.value.length > 0) showError('name-error');
    else clearError('name-error');
  });

  emailInput?.addEventListener('blur', () => {
    const ok = validateEmail(emailInput.value);
    markInput('reg-email', !ok && emailInput.value.length > 0);
    if (!ok && emailInput.value.length > 0) showError('email-error');
    else clearError('email-error');
  });

  pwInput?.addEventListener('blur', () => {
    const ok = validateNewPassword(pwInput.value);
    markInput('reg-password', !ok && pwInput.value.length > 0);
    if (!ok && pwInput.value.length > 0) showError('password-error');
    else clearError('password-error');
  });

  confInput?.addEventListener('blur', () => {
    const ok = validateMatch(pwInput?.value, confInput.value);
    markInput('reg-confirm', !ok && confInput.value.length > 0);
    if (!ok && confInput.value.length > 0) showError('confirm-error');
    else clearError('confirm-error');
  });

  /* Submit */
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearGlobalAlert();

    const name     = nameInput?.value.trim()   || '';
    const email    = emailInput?.value.trim()  || '';
    const password = pwInput?.value            || '';
    const confirm  = confInput?.value          || '';
    const phone    = document.getElementById('reg-phone')?.value.trim() || '';
    const terms    = termsCb?.checked          || false;
    let valid = true;

    if (!validateName(name)) {
      showError('name-error');    markInput('reg-name', true);     valid = false;
    } else { clearError('name-error');    markInput('reg-name', false); }

    if (!validateEmail(email)) {
      showError('email-error');   markInput('reg-email', true);    valid = false;
    } else { clearError('email-error');   markInput('reg-email', false); }

    if (!validateNewPassword(password)) {
      showError('password-error'); markInput('reg-password', true); valid = false;
    } else { clearError('password-error'); markInput('reg-password', false); }

    if (!validateMatch(password, confirm)) {
      showError('confirm-error'); markInput('reg-confirm', true);  valid = false;
    } else { clearError('confirm-error'); markInput('reg-confirm', false); }

    if (!terms) {
      showError('terms-error'); valid = false;
    } else { clearError('terms-error'); }

    if (!valid) return;

    /* ⚠️ API PLACEHOLDER ─────────────────────────────────────────────────
       Replace the block below with your real registration API call.
       Expected backend endpoint: POST /api/auth/register
       Request body:  { name, email, phone, password }
       Success:       { message: "Account created", token, user }
       Failure:       { error: "Email already exists" }
    ──────────────────────────────────────────────────────────────────── */
    setLoading(btn, true);
    try {
      await mockApiDelay(1400); // ← REMOVE this line when connecting real API

      /* ── On real success from backend: ────────────────────────────────
         const res = await fetch('/api/auth/register', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ name, email, phone, password }),
         });
         const data = await res.json();
         if (!res.ok) throw new Error(data.error || 'Registration failed');
         localStorage.setItem('cdi.token', data.token);
         window.location.href = 'index.html';
      ─────────────────────────────────────────────────────────────────── */

      /* TEMP: redirect to login after mock delay */
      window.location.href = 'login.html';

    } catch (err) {
      showGlobalAlert(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(btn, false);
    }
    /* ── END API PLACEHOLDER ─────────────────────────────────────────── */
  });
}

/* ==========================================================================
   9. SOCIAL AUTH PLACEHOLDERS  (exposed globally for onclick handlers)
   ========================================================================== */

/* ⚠️ API PLACEHOLDER — Google OAuth
   Replace with: import the Google Identity Services SDK and call
   google.accounts.id.initialize({ client_id: 'YOUR_CLIENT_ID', callback })
   then google.accounts.id.prompt()
*/
window.handleGoogleAuth = function () {
  alert('Google Sign-In requires backend OAuth integration.\nSee auth.js for the API placeholder.');
};

/* ⚠️ API PLACEHOLDER — Apple Sign-In
   Replace with: load AppleID.auth.init() with your serviceId and redirectURI
   then call AppleID.auth.signIn()
*/
window.handleAppleAuth = function () {
  alert('Apple Sign-In requires backend OAuth integration.\nSee auth.js for the API placeholder.');
};

/* ==========================================================================
   10. UTILITY HELPERS
   ========================================================================== */
function setLoading(btn, on) {
  if (!btn) return;
  btn.disabled = on;
  btn.classList.toggle('is-loading', on);
}

/** Simulates network latency during development. Remove when backend is ready. */
function mockApiDelay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

/* ==========================================================================
   11. BOOT
   ========================================================================== */
function boot() {
  initLang();
  initPasswordToggles();

  const page = document.body.dataset.page;
  if (page === 'login')    initLoginPage();
  if (page === 'register') initRegisterPage();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
