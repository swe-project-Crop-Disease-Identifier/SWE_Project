/* ==========================================================================
   api.js — mock-only prediction (no backend, no fetch)
   ========================================================================== */

import { MOCK_RESULTS, MOCK_RESULTS_BN } from './config.js';
import { getLang } from './lang.js';

export function predictDisease(crop) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const enData = MOCK_RESULTS[crop]  || MOCK_RESULTS._default;
      const bnData = MOCK_RESULTS_BN[crop] || MOCK_RESULTS_BN._default;

      const confidence = Number(
        Math.min(0.99, Math.max(0.55,
          enData.confidence + (Math.random() - 0.5) * 0.04
        )).toFixed(2)
      );

      resolve({
        crop,
        /* English */
        disease:            enData.disease,
        scientific_name:    enData.scientific_name,
        confidence,
        symptoms:           enData.symptoms,
        natural_treatment:  enData.natural_treatment,
        chemical_treatment: enData.chemical_treatment,
        /* Bangla */
        disease_bn:            bnData.disease,
        symptoms_bn:           bnData.symptoms,
        natural_treatment_bn:  bnData.natural_treatment,
        chemical_treatment_bn: bnData.chemical_treatment,
      });
    }, 1400);
  });
}
