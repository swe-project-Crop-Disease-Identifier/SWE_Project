/* ==========================================================================
   config.js — frontend-only configuration
   ========================================================================== */

/* --------------------------------------------------------------------------
   IMAGE RULES
   -------------------------------------------------------------------------- */
export const ACCEPTED_TYPES      = ['image/jpeg', 'image/jpg', 'image/png'];
export const ACCEPTED_EXTENSIONS = ['.jpg', '.jpeg', '.png'];
export const MAX_FILE_SIZE_MB    = 5;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export const COMPRESS = {
  maxWidth: 800,
  quality:  0.7,
  mimeType: 'image/jpeg',
};

/* --------------------------------------------------------------------------
   CROP LIST  — drives the dropdown on the Check Disease page
   -------------------------------------------------------------------------- */
export const CROPS = [
  { value: 'Tomato',  label: 'Tomato'  },
  { value: 'Potato',  label: 'Potato'  },
  { value: 'Rice',    label: 'Rice'    },
  { value: 'Chili',   label: 'Chili'   },
  { value: 'Maize',   label: 'Maize'   },
  { value: 'Wheat',   label: 'Wheat'   },
  { value: 'Cotton',  label: 'Cotton'  },
  { value: 'Soybean', label: 'Soybean' },
];

/* --------------------------------------------------------------------------
   SESSION STORAGE KEYS
   -------------------------------------------------------------------------- */
export const STORAGE = {
  RESULT:  'cdi.result',
  PREVIEW: 'cdi.preview',
  CROP:    'cdi.crop',
};

/* --------------------------------------------------------------------------
   MOCK DATA  — realistic sample results shown while there is no backend
   -------------------------------------------------------------------------- */
export const MOCK_RESULTS = {
  Tomato: {
    disease:           'Early Blight',
    scientific_name:   'Alternaria solani',
    confidence:        0.92,
    symptoms: [
      'Dark brown spots with concentric rings on older leaves',
      'Yellowing (chlorosis) around the spots',
      'Leaf edges drying and curling',
      'Spots start on the bottom leaves and move upward',
    ],
    natural_treatment: [
      'Remove and destroy infected leaves — do not compost them',
      'Avoid overhead watering; water at soil level in the morning',
      'Rotate with a non-solanaceae crop for at least 2 seasons',
      'Apply neem oil spray (5 ml per litre) every 7 days',
    ],
    chemical_treatment: [
      'Mancozeb 75% WP @ 2.5 g per litre of water',
      'Chlorothalonil 75% WP @ 2 g per litre',
      'Azoxystrobin 23% SC @ 1 ml per litre for severe cases',
      'Spray at early morning and repeat after 10–12 days',
    ],
  },
  Potato: {
    disease:           'Late Blight',
    scientific_name:   'Phytophthora infestans',
    confidence:        0.88,
    symptoms: [
      'Water-soaked grey-green patches on leaf tips and edges',
      'White fuzzy growth on the underside of leaves in humid weather',
      'Dark brown firm lesions on tubers just under the skin',
      'Rapid collapse of the whole plant within 2–3 days',
    ],
    natural_treatment: [
      'Remove and bury infected plants immediately',
      'Improve field drainage and air circulation',
      'Spray Bordeaux mixture (1%) as a preventive measure',
      'Harvest in dry weather only',
    ],
    chemical_treatment: [
      'Metalaxyl + Mancozeb @ 2.5 g per litre',
      'Cymoxanil + Mancozeb @ 3 g per litre',
      'Chlorothalonil @ 2 g per litre for early infection',
      'Repeat every 7–10 days; stop 15 days before harvest',
    ],
  },
  Rice: {
    disease:           'Bacterial Leaf Blight',
    scientific_name:   'Xanthomonas oryzae pv. oryzae',
    confidence:        0.85,
    symptoms: [
      'Yellow streaks starting from the leaf margin',
      'Wavy grey-green lesions with bacterial ooze in humid weather',
      'Lesions run along the veins towards the leaf base',
      'Leaves dry out and break from the middle',
    ],
    natural_treatment: [
      'Destroy infected straw and stubble after harvest',
      'Use disease-free seedlings; treat seeds before sowing',
      'Maintain a flooded field to limit bacterial spread',
      'Apply garlic + neem foliar spray in early stages',
    ],
    chemical_treatment: [
      'Copper oxychloride @ 3 g per litre',
      'Streptomycin sulphate 90% + Tetracycline 90% @ 0.5 g per litre',
      'Apply at tillering and again at booting stage',
      'Do not spray in the middle of the day',
    ],
  },
  Chili: {
    disease:           'Leaf Curl',
    scientific_name:   'Begomovirus spp.',
    confidence:        0.83,
    symptoms: [
      'Upward curling and puckering of young leaves',
      'Leaves become small, thick and yellowish',
      'Stunted plant growth with shortened internodes',
      'Whitefly insects visible under the leaves',
    ],
    natural_treatment: [
      'Remove and destroy affected plants early',
      'Control whitefly with yellow sticky traps',
      'Spray neem oil 5 ml per litre every 5 days',
      'Grow under 40–60% shade net to keep whiteflies out',
    ],
    chemical_treatment: [
      'Imidacloprid 17.8% SL @ 0.3 ml per litre for whitefly',
      'Thiamethoxam 25% WG @ 0.2 g per litre',
      'Spiromesifen 22.9% SC @ 1 ml per litre for heavy load',
      'Repeat after 10 days; follow the pre-harvest interval',
    ],
  },
  Maize: {
    disease:           'Gray Leaf Spot',
    scientific_name:   'Cercospora zeae-maydis',
    confidence:        0.90,
    symptoms: [
      'Rectangular grey-to-tan lesions between the leaf veins',
      'Lesions start on the lower leaves and move upward',
      'Long narrow marks, 2–6 cm, with sharp parallel edges',
      'Severe infection can cause complete leaf death',
    ],
    natural_treatment: [
      'Plough crop residue deep into the soil after harvest',
      'Rotate with a non-cereal crop (soybean, pulses)',
      'Avoid dense planting — keep rows wider for airflow',
      'Avoid heavy nitrogen that produces soft, lush growth',
    ],
    chemical_treatment: [
      'Azoxystrobin 23% SC @ 1 ml per litre',
      'Propiconazole 25% EC @ 1 ml per litre',
      'Spray at the 6-leaf stage and repeat after 15 days',
      'Wear gloves and a mask when applying fungicides',
    ],
  },
  Wheat: {
    disease:           'Stripe Rust',
    scientific_name:   'Puccinia striiformis',
    confidence:        0.87,
    symptoms: [
      'Yellow-orange pustules arranged in stripes along the leaf',
      'Pustules break open and release powdery yellow spores',
      'Infected leaves turn pale and dry prematurely',
      'Severe infection causes significant yield loss',
    ],
    natural_treatment: [
      'Use resistant wheat varieties where available',
      'Avoid early sowing that exposes the crop to cool wet weather',
      'Destroy volunteer wheat plants that harbour the fungus',
      'Maintain balanced fertilisation — avoid excessive nitrogen',
    ],
    chemical_treatment: [
      'Propiconazole 25% EC @ 0.1% solution',
      'Tebuconazole 25.9% EC @ 1 ml per litre',
      'Apply at first sign of infection and repeat after 15 days',
      'Do not spray during flowering to protect pollinators',
    ],
  },
  Cotton: {
    disease:           'Bacterial Blight',
    scientific_name:   'Xanthomonas citri pv. malvacearum',
    confidence:        0.81,
    symptoms: [
      'Angular water-soaked spots on the leaves',
      'Spots turn brown with a yellow halo as they dry',
      'Infected bolls show dark brown circular lesions',
      'Seedlings may collapse (damping-off) in wet conditions',
    ],
    natural_treatment: [
      'Use certified disease-free seeds',
      'Treat seeds with hot water (55 °C for 30 minutes)',
      'Remove and destroy infected plant debris after harvest',
      'Avoid overhead irrigation to reduce leaf wetness',
    ],
    chemical_treatment: [
      'Copper oxychloride 50% WP @ 3 g per litre',
      'Streptomycin sulphate @ 0.1 g per litre as a foliar spray',
      'Spray at seedling stage and repeat every 10 days',
      'Stop spraying 3 weeks before harvest',
    ],
  },
  Soybean: {
    disease:           'Soybean Rust',
    scientific_name:   'Phakopsora pachyrhizi',
    confidence:        0.86,
    symptoms: [
      'Small tan-to-brown angular lesions on the lower leaf surface',
      'Pale yellow or brown pustules that release spores',
      'Premature defoliation in severe cases',
      'Reduced pod fill and significant yield loss',
    ],
    natural_treatment: [
      'Plant early to avoid peak rust conditions',
      'Use resistant varieties where available',
      'Remove volunteer soybean plants from the field',
      'Maintain good crop spacing for air circulation',
    ],
    chemical_treatment: [
      'Azoxystrobin + Cyproconazole @ 1 ml per litre',
      'Trifloxystrobin + Tebuconazole @ 0.75 ml per litre',
      'Begin spraying at first sign and repeat every 14 days',
      'Rotate fungicide groups to avoid resistance build-up',
    ],
  },
  _default: {
    disease:           'Leaf Spot',
    scientific_name:   'Alternaria spp.',
    confidence:        0.78,
    symptoms: [
      'Round to irregular brown or dark spots on the leaves',
      'A yellow halo around each spot',
      'Spotted leaves turn yellow and drop early',
      'Spots merge and form large dead patches when severe',
    ],
    natural_treatment: [
      'Pick off and destroy infected leaves',
      'Water at the base of the plant, not over the foliage',
      'Improve spacing so leaves dry quickly after rain',
      'Spray neem oil 5 ml per litre as a preventive measure',
    ],
    chemical_treatment: [
      'Mancozeb 75% WP @ 2.5 g per litre',
      'Chlorothalonil 75% WP @ 2 g per litre',
      'Copper oxychloride 50% WP @ 3 g per litre',
      'Repeat every 10 days; wear a mask and gloves when spraying',
    ],
  },
};
