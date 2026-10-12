/* ==========================================================================
   result.js — populates result.html from sessionStorage
   Supports both English and Bangla based on current lang setting.
   ========================================================================== */

import { STORAGE } from './config.js';
import { getLang, applyLang } from './lang.js';

export function initResultPage() {
  const empty   = document.getElementById('rp-empty');
  const content = document.getElementById('rp-content');

  const rawResult  = sessionStorage.getItem(STORAGE.RESULT);
  const previewSrc = sessionStorage.getItem(STORAGE.PREVIEW);

  if (!rawResult) { empty.hidden = false; return; }

  let r;
  try { r = JSON.parse(rawResult); }
  catch { empty.hidden = false; return; }

  content.hidden = false;

  /* Re-render dynamic content whenever language changes */
  renderResult(r, previewSrc);

  /* Listen for future language toggles on this page */
  document.getElementById('lang-toggle')?.addEventListener('click', () => {
    /* Small delay so applyLang() in lang.js fires first */
    setTimeout(() => renderResult(r, previewSrc), 20);
  });
}

/* --------------------------------------------------------------------------
   renderResult — fills every dynamic slot using the current language
   -------------------------------------------------------------------------- */
function renderResult(r, previewSrc) {
  const lang = getLang();
  const bn   = lang === 'bn';

  /* Leaf image */
  const img = document.getElementById('rp-img');
  if (img && previewSrc) {
    img.src = previewSrc;
    img.alt = bn ? `আপলোড করা পাতা — ${r.crop}` : `Uploaded leaf — ${r.crop}`;
  }

  /* Disease name */
  const diseaseName = bn
    ? `${cropBn(r.crop)} ${r.disease_bn || r.disease}`
    : `${r.crop} ${r.disease}`;
  const el = document.getElementById('rp-disease-name');
  if (el) el.textContent = diseaseName;

  /* Scientific name */
  const sci = document.getElementById('rp-scientific');
  if (sci) sci.textContent = r.scientific_name ? `(${r.scientific_name})` : '';

  /* Confidence bar */
  const pct      = Math.round(r.confidence * 100);
  const fill     = document.getElementById('rp-bar-fill');
  const pctEl    = document.getElementById('rp-pct');
  const barTrack = fill?.closest('[role="progressbar"]');

  if (pctEl)    pctEl.textContent = `${pct}%`;
  if (barTrack) barTrack.setAttribute('aria-valuenow', pct);
  if (fill) {
    requestAnimationFrame(() =>
      requestAnimationFrame(() => { fill.style.width = `${pct}%`; })
    );
  }

  /* Lists */
  const symptoms  = bn ? (r.symptoms_bn           || r.symptoms)           : r.symptoms;
  const natural   = bn ? (r.natural_treatment_bn   || r.natural_treatment)  : r.natural_treatment;
  const chemical  = bn ? (r.chemical_treatment_bn  || r.chemical_treatment) : r.chemical_treatment;

  fillList('rp-symptoms', symptoms,  'bullet');
  fillList('rp-natural',  natural,   'check');
  fillList('rp-chemical', chemical,  'check-blue');
}

/* --------------------------------------------------------------------------
   Crop name → Bangla mapping
   -------------------------------------------------------------------------- */
const CROP_BN = {
  Tomato: 'টমেটো', Potato: 'আলু', Rice: 'ধান',
  Chili:  'মরিচ',  Maize:  'ভুট্টা', Wheat: 'গম',
  Cotton: 'তুলা',  Soybean:'সয়াবিন',
};
function cropBn(crop) { return CROP_BN[crop] || crop; }

/* --------------------------------------------------------------------------
   Helpers
   -------------------------------------------------------------------------- */
function fillList(id, items, style) {
  const ul = document.getElementById(id);
  if (!ul || !Array.isArray(items)) return;

  ul.innerHTML = items.map((text) => {
    const icon = style === 'bullet'
      ? `<span class="rp-bullet" aria-hidden="true">•</span>`
      : style === 'check'
        ? checkSvg('var(--green-700)')
        : checkSvg('#1565C0');
    return `<li>${icon}<span>${esc(text)}</span></li>`;
  }).join('');
}

function checkSvg(color) {
  return `<svg viewBox="0 0 24 24" width="16" height="16" fill="none"
               stroke="${color}" stroke-width="2.5" stroke-linecap="round"
               aria-hidden="true" style="flex:0 0 auto;margin-top:2px">
            <path d="m5 13 4 4L19 7"/>
          </svg>`;
}

function esc(s) {
  return String(s)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
