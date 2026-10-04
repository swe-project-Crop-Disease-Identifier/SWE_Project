/* ==========================================================================
   api.js — mock-only prediction (no backend, no fetch, no server needed)
   --------------------------------------------------------------------------
   ONE public function:  predictDisease(crop)
   Returns a Promise that resolves with a result object after a short delay.

   When the backend is ready, only this file needs to change.
   ========================================================================== */

import { MOCK_RESULTS } from './config.js';

/**
 * Simulate a disease prediction using local mock data.
 * @param {string} crop  — crop name matching a key in MOCK_RESULTS
 * @returns {Promise<Object>}
 */
export function predictDisease(crop) {
  return new Promise((resolve) => {
    /* Small delay so the loading spinner is visible */
    setTimeout(() => {
      const data = MOCK_RESULTS[crop] || MOCK_RESULTS._default;

      resolve({
        crop,
        disease:            data.disease,
        scientific_name:    data.scientific_name,
        confidence:         Number(
          Math.min(0.99, Math.max(0.55,
            data.confidence + (Math.random() - 0.5) * 0.04
          )).toFixed(2)
        ),
        symptoms:           data.symptoms,
        natural_treatment:  data.natural_treatment,
        chemical_treatment: data.chemical_treatment,
      });
    }, 1400);
  });
}
