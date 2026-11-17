/* ==========================================================================
   session.js — Authentication state manager
   --------------------------------------------------------------------------
   Single source of truth for who is logged in.
   Used by: main.js, auth.js, upload.js, dashboard page

   Storage keys (localStorage):
     cdi.user    — { id, name, email, registeredAt }  (null when guest)
     cdi.history — Array of detection records (registered users only)

   ⚠️ API INTEGRATION POINTS are marked clearly below.
   When the backend is ready, replace the localStorage stubs with real
   JWT token verification and API calls.
   ========================================================================== */

const KEY_USER    = 'cdi.user';
const KEY_HISTORY = 'cdi.history';

/* --------------------------------------------------------------------------
   Read helpers
   -------------------------------------------------------------------------- */

/** Returns true if a user is currently logged in. */
export function isLoggedIn() {
  return getUser() !== null;
}

/**
 * Returns the current user object or null for guests.
 * Shape: { id, name, email, registeredAt }
 */
export function getUser() {
  try {
    const raw = localStorage.getItem(KEY_USER);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/* --------------------------------------------------------------------------
   Write helpers
   -------------------------------------------------------------------------- */

/**
 * Save a user to session after successful login/registration.
 * Called by auth.js when the backend confirms authentication.
 *
 * ⚠️ API PLACEHOLDER:
 *   In production, also store the JWT token returned by the backend:
 *   localStorage.setItem('cdi.token', data.token);
 *   The token must be sent as Authorization: Bearer <token> on every
 *   authenticated API request.
 */
export function login(user) {
  localStorage.setItem(KEY_USER, JSON.stringify(user));
}

/**
 * Clear the session. Removes user data but keeps the language preference.
 * Detection history is also cleared from localStorage on logout
 * (the real history lives in the backend database).
 */
export function logout() {
  localStorage.removeItem(KEY_USER);
  localStorage.removeItem(KEY_HISTORY);
  localStorage.removeItem('cdi.token');
  localStorage.removeItem('cdi.rememberedEmail');
}

/* --------------------------------------------------------------------------
   Detection history (frontend cache — registered users only)
   --------------------------------------------------------------------------
   This is a CLIENT-SIDE CACHE only.
   When backend is ready, history must be loaded from the server
   and this cache should be treated as temporary display data.
   -------------------------------------------------------------------------- */

/**
 * Returns the detection history array for the logged-in user.
 * Returns [] for guests (history is never saved for guests).
 *
 * ⚠️ API PLACEHOLDER:
 *   Replace with: GET /api/history  (Authorization: Bearer <token>)
 *   Response: { history: [ { id, crop, disease, confidence, detectedAt, ... } ] }
 */
export function getHistory() {
  if (!isLoggedIn()) return [];
  try {
    const raw = localStorage.getItem(KEY_HISTORY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Save one detection result to the history of the logged-in user.
 * Silently does nothing for guests.
 *
 * @param {Object} result - The prediction result object from api.js
 *
 * ⚠️ API PLACEHOLDER:
 *   Replace with: POST /api/history  (Authorization: Bearer <token>)
 *   Body: { crop, disease, confidence, detectedAt }
 *   The backend must associate the detection with req.user.id
 *   (never trust a user_id sent from the frontend).
 */
export function saveDetection(result) {
  if (!isLoggedIn()) return; // guests: no history saved

  const record = {
    id:         Date.now(),                           // temp ID until backend assigns one
    crop:       result.crop,
    disease:    result.disease,
    disease_bn: result.disease_bn  || result.disease,
    confidence: result.confidence,
    detectedAt: new Date().toISOString(),
  };

  const history = getHistory();
  history.unshift(record);             // newest first

  // Keep only the last 50 records in localStorage to avoid bloat
  const trimmed = history.slice(0, 50);
  localStorage.setItem(KEY_HISTORY, JSON.stringify(trimmed));
}
