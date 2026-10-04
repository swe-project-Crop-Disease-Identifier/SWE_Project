/* ==========================================================================
   upload.js — Check Disease page logic (frontend-only, no backend)
   --------------------------------------------------------------------------
   Flow:
     1. User picks / drops an image
     2. Validate (type + size)
     3. Compress with <canvas>  →  show preview
     4. User picks a crop
     5. Submit  →  spinner  →  predictDisease()  →  go to result.html
   ========================================================================== */

import {
  ACCEPTED_TYPES,
  ACCEPTED_EXTENSIONS,
  MAX_FILE_SIZE_MB,
  MAX_FILE_SIZE_BYTES,
  COMPRESS,
  CROPS,
  STORAGE,
} from './config.js';

import { predictDisease } from './api.js';

/* ==========================================================================
   initCheckPage — called once by main.js
   ========================================================================== */
export function initCheckPage() {

  /* ── DOM refs ── */
  const form        = document.getElementById('check-form');
  const dropzone    = document.getElementById('dropzone');
  const fileInput   = document.getElementById('file-input');
  const cameraInput = document.getElementById('camera-input');
  const idleView    = dropzone.querySelector('[data-dropzone-idle]');
  const previewView = dropzone.querySelector('[data-dropzone-preview]');
  const previewImg  = dropzone.querySelector('[data-preview-img]');
  const previewName = dropzone.querySelector('[data-preview-name]');
  const removeBtn   = dropzone.querySelector('[data-remove-image]');
  const imageError  = document.getElementById('image-error');
  const cropSelect  = document.getElementById('crop-select');
  const submitBtn   = document.getElementById('submit-btn');
  const loadingBox  = document.getElementById('loading-box');
  const loadingText = loadingBox.querySelector('[data-loading-text]');

  /* ── State ── */
  let compressedFile = null;   // File object with .previewDataUrl
  let imageReady     = false;
  let busy           = false;

  /* ── 1. Populate crop dropdown from config ── */
  CROPS.forEach(({ value, label }) => {
    const opt = document.createElement('option');
    opt.value       = value;
    opt.textContent = label;
    cropSelect.appendChild(opt);
  });

  /* ── 2. File picking ── */
  fileInput.addEventListener('change', () => {
    if (fileInput.files?.[0]) handleFile(fileInput.files[0]);
    fileInput.value = '';
  });

  cameraInput.addEventListener('change', () => {
    if (cameraInput.files?.[0]) handleFile(cameraInput.files[0]);
    cameraInput.value = '';
  });

  /* ── Drag & drop ── */
  ['dragenter', 'dragover'].forEach((ev) => {
    dropzone.addEventListener(ev, (e) => {
      e.preventDefault();
      if (!busy) dropzone.classList.add('is-dragover');
    });
  });

  dropzone.addEventListener('dragleave', (e) => {
    e.preventDefault();
    if (!dropzone.contains(e.relatedTarget))
      dropzone.classList.remove('is-dragover');
  });

  dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.classList.remove('is-dragover');
    if (busy) return;
    const file = e.dataTransfer?.files?.[0];
    if (file) handleFile(file);
    else      showError('That does not look like an image. Please try again.');
  });

  /* ── Remove image ── */
  removeBtn.addEventListener('click', () => {
    clearImage();
    fileInput.focus();
  });

  /* ── 3. Validate → compress → preview ── */
  async function handleFile(file) {
    clearError();

    const problem = validate(file);
    if (problem) { showError(problem); return; }

    setBusy(true, 'Preparing your photo…');
    try {
      compressedFile = await compressImage(file);
      imageReady     = true;

      previewImg.src          = compressedFile.previewDataUrl;
      previewName.textContent = `${file.name}  ·  ${formatBytes(compressedFile.size)}`;
      idleView.hidden    = true;
      previewView.hidden = false;
      dropzone.dataset.state = 'ready';
      dropzone.classList.remove('is-invalid');
    } catch {
      clearImage();
      showError('Could not read that image. Please try another photo.');
    } finally {
      setBusy(false);
      syncBtn();
    }
  }

  function validate(file) {
    const name  = (file.name || '').toLowerCase();
    const typeOk = ACCEPTED_TYPES.includes(file.type);
    const extOk  = ACCEPTED_EXTENSIONS.some((e) => name.endsWith(e));
    if (!typeOk && !(file.type === '' && extOk))
      return 'Please choose a JPG or PNG image.';
    if (file.size > MAX_FILE_SIZE_BYTES)
      return `File is ${formatBytes(file.size)}. Max allowed is ${MAX_FILE_SIZE_MB} MB.`;
    return null;
  }

  /* ── 4. Enable submit when both inputs are ready ── */
  cropSelect.addEventListener('change', syncBtn);

  /* ── 5. Submit ── */
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!imageReady || busy) return;
    runPrediction();
  });

  async function runPrediction() {
    clearError();
    setBusy(true);

    const result = await predictDisease(cropSelect.value);

    sessionStorage.setItem(STORAGE.RESULT,  JSON.stringify(result));
    sessionStorage.setItem(STORAGE.PREVIEW, compressedFile.previewDataUrl);
    sessionStorage.setItem(STORAGE.CROP,    cropSelect.value);

    window.location.href = 'result.html';
  }

  /* ── UI helpers ── */
  function syncBtn() {
    submitBtn.disabled = busy || !imageReady || !cropSelect.value;
  }

  function clearImage() {
    compressedFile = null;
    imageReady     = false;
    previewImg.removeAttribute('src');
    previewName.textContent = '';
    idleView.hidden    = false;
    previewView.hidden = true;
    dropzone.dataset.state = 'empty';
    clearError();
    syncBtn();
  }

  function setBusy(on, msg) {
    busy = on;
    loadingBox.hidden      = !on;
    fileInput.disabled     = on;
    cameraInput.disabled   = on;
    cropSelect.disabled    = on;
    if (removeBtn) removeBtn.disabled = on;
    if (on && msg) loadingText.textContent = msg;
    syncBtn();
  }

  function showError(msg) {
    imageError.textContent = msg;
    imageError.hidden      = false;
    dropzone.classList.add('is-invalid');
  }

  function clearError() {
    imageError.hidden      = true;
    imageError.textContent = '';
    dropzone.classList.remove('is-invalid');
  }
}

/* ==========================================================================
   Image compression helpers (no DOM refs needed)
   ========================================================================== */
function compressImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      URL.revokeObjectURL(url);

      const scale  = Math.min(1, COMPRESS.maxWidth / Math.max(img.width, img.height));
      const w      = Math.max(1, Math.round(img.width  * scale));
      const h      = Math.max(1, Math.round(img.height * scale));
      const canvas = document.createElement('canvas');
      canvas.width  = w;
      canvas.height = h;

      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, w, h);
      ctx.drawImage(img, 0, 0, w, h);

      canvas.toBlob((blob) => {
        if (!blob) { reject(new Error('Canvas failed')); return; }

        const preview  = smallPreview(canvas, 320);
        const baseName = (file.name || 'leaf').replace(/\.[^.]+$/, '');
        const out      = new File([blob], `${baseName}.jpg`, {
          type:         COMPRESS.mimeType,
          lastModified: Date.now(),
        });
        out.previewDataUrl = preview;
        resolve(out);
      }, COMPRESS.mimeType, COMPRESS.quality);
    };

    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Decode failed')); };
    img.src = url;
  });
}

function smallPreview(canvas, maxSide) {
  const s = Math.min(1, maxSide / Math.max(canvas.width, canvas.height));
  const w = Math.max(1, Math.round(canvas.width  * s));
  const h = Math.max(1, Math.round(canvas.height * s));
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  c.getContext('2d').drawImage(canvas, 0, 0, w, h);
  return c.toDataURL('image/jpeg', 0.6);
}

function formatBytes(b) {
  if (b < 1024)        return `${b} B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(0)} KB`;
  return `${(b / (1024 * 1024)).toFixed(1)} MB`;
}
