/* ==========================================================================
   result.js — populates result.html from sessionStorage
   ========================================================================== */

import { STORAGE } from './config.js';

export function initResultPage() {
  const empty   = document.getElementById('rp-empty');
  const content = document.getElementById('rp-content');

  /* ── Read sessionStorage ── */
  const rawResult  = sessionStorage.getItem(STORAGE.RESULT);
  const previewSrc = sessionStorage.getItem(STORAGE.PREVIEW);

  if (!rawResult) {
    empty.hidden = false;
    return;
  }

  let r;
  try { r = JSON.parse(rawResult); }
  catch { empty.hidden = false; return; }

  content.hidden = false;

  /* ── Leaf image ── */
  const img = document.getElementById('rp-img');
  if (previewSrc) {
    img.src = previewSrc;
    img.alt = `Uploaded leaf — ${r.crop}`;
  } else {
    img.closest('.rp-img-wrap').style.background = 'var(--green-050)';
    img.hidden = true;
  }

  /* ── Disease name ── */
  document.getElementById('rp-disease-name').textContent =
    `${r.crop} ${r.disease}`;
  document.getElementById('rp-scientific').textContent =
    r.scientific_name ? `(${r.scientific_name})` : '';

  /* ── Confidence bar — animate after first paint ── */
  const pct      = Math.round(r.confidence * 100);
  const fill     = document.getElementById('rp-bar-fill');
  const pctEl    = document.getElementById('rp-pct');
  const barTrack = fill.closest('[role="progressbar"]');

  pctEl.textContent = `${pct}%`;
  barTrack.setAttribute('aria-valuenow', pct);

  requestAnimationFrame(() =>
    requestAnimationFrame(() => { fill.style.width = `${pct}%`; })
  );

  /* ── Lists ── */
  fillList('rp-symptoms', r.symptoms,           'bullet');
  fillList('rp-natural',  r.natural_treatment,  'check');
  fillList('rp-chemical', r.chemical_treatment, 'check-blue');
}

/* ---------- helpers ---------- */
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
