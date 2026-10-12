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


/* ==========================================================================
   MOCK_RESULTS_BN — Bangla translations of disease data
   ========================================================================== */
export const MOCK_RESULTS_BN = {
  Tomato: {
    disease:           'আর্লি ব্লাইট',
    scientific_name:   'Alternaria solani',
    symptoms: [
      'পুরনো পাতায় গাঢ় বাদামি দাগ যার মাঝে গোলাকার বলয় থাকে',
      'দাগের চারপাশে পাতা হলুদ হয়ে যায়',
      'পাতার কিনারা শুকিয়ে কুঁকড়ে যায়',
      'নিচের পাতা থেকে দাগ শুরু হয়ে উপরে ছড়ায়',
    ],
    natural_treatment: [
      'আক্রান্ত পাতা তুলে নষ্ট করুন — কম্পোস্টে দেবেন না',
      'উপর থেকে পানি দেওয়া এড়িয়ে চলুন, সকালে গোড়ায় পানি দিন',
      'একই জমিতে বারবার টমেটো না লাগিয়ে ফসল পরিবর্তন করুন',
      'নিম তেল (৫ মি.লি. প্রতি লিটার পানিতে) প্রতি ৭ দিনে স্প্রে করুন',
    ],
    chemical_treatment: [
      'ম্যানকোজেব ৭৫% WP @ ২.৫ গ্রাম প্রতি লিটার পানিতে',
      'ক্লোরোথ্যালোনিল ৭৫% WP @ ২ গ্রাম প্রতি লিটার পানিতে',
      'তীব্র আক্রমণে অ্যাজোক্সিস্ট্রোবিন ২৩% SC @ ১ মি.লি. প্রতি লিটার',
      'সকালে স্প্রে করুন এবং ১০–১২ দিন পর পুনরায় দিন',
    ],
  },
  Potato: {
    disease:           'লেট ব্লাইট',
    scientific_name:   'Phytophthora infestans',
    symptoms: [
      'পাতার ডগা ও কিনারায় পানি ভেজা ধূসর-সবুজ দাগ',
      'আর্দ্র আবহাওয়ায় পাতার নিচে সাদা তুলার মতো ছত্রাক দেখা যায়',
      'আলুতে চামড়ার নিচে কালো-বাদামি দৃঢ় দাগ',
      '২–৩ দিনের মধ্যে পুরো গাছ মরে যেতে পারে',
    ],
    natural_treatment: [
      'আক্রান্ত গাছ তাৎক্ষণিক মাটিতে পুঁতে ফেলুন',
      'জমির পানি নিষ্কাশন ও বায়ু চলাচল উন্নত করুন',
      'প্রতিরোধ হিসেবে বোর্দো মিশ্রণ (১%) স্প্রে করুন',
      'শুকনো আবহাওয়ায় ফসল তুলুন',
    ],
    chemical_treatment: [
      'মেটালক্সিল + ম্যানকোজেব @ ২.৫ গ্রাম প্রতি লিটার',
      'সাইমোক্সানিল + ম্যানকোজেব @ ৩ গ্রাম প্রতি লিটার',
      'প্রাথমিক আক্রমণে ক্লোরোথ্যালোনিল @ ২ গ্রাম প্রতি লিটার',
      'প্রতি ৭–১০ দিনে পুনরায় দিন; ফসল তোলার ১৫ দিন আগে বন্ধ করুন',
    ],
  },
  Rice: {
    disease:           'ব্যাকটেরিয়াল লিফ ব্লাইট',
    scientific_name:   'Xanthomonas oryzae pv. oryzae',
    symptoms: [
      'পাতার কিনারা থেকে হলুদ দাগ শুরু হয়',
      'আর্দ্র আবহাওয়ায় ব্যাকটেরিয়ার রস সহ ঢেউ খেলানো ধূসর-সবুজ ক্ষত',
      'শিরা বরাবর দাগ পাতার গোড়ার দিকে যায়',
      'পাতা শুকিয়ে মাঝখান থেকে ভেঙে যায়',
    ],
    natural_treatment: [
      'ফসল কাটার পর আক্রান্ত খড় ও নাড়া নষ্ট করুন',
      'রোগমুক্ত বীজ ব্যবহার করুন; বপনের আগে বীজ শোধন করুন',
      'ব্যাকটেরিয়া ছড়ানো কমাতে জমিতে পানি জমিয়ে রাখুন',
      'প্রাথমিক পর্যায়ে রসুন + নিম পাতার স্প্রে ব্যবহার করুন',
    ],
    chemical_treatment: [
      'কপার অক্সিক্লোরাইড @ ৩ গ্রাম প্রতি লিটার',
      'স্ট্রেপটোমাইসিন সালফেট ৯০% + টেট্রাসাইক্লিন ৯০% @ ০.৫ গ্রাম প্রতি লিটার',
      'কুশি গজানোর সময় এবং থোড় বের হওয়ার সময় স্প্রে দিন',
      'দিনের মাঝে স্প্রে করবেন না',
    ],
  },
  Chili: {
    disease:           'লিফ কার্ল',
    scientific_name:   'Begomovirus spp.',
    symptoms: [
      'অল্প বয়স্ক পাতা উপরের দিকে কুঁকড়ে ও ভাঁজ হয়ে যায়',
      'পাতা ছোট, মোটা ও হলুদাভ হয়',
      'গাছের বৃদ্ধি থামে, গিঁটগুলো ছোট হয়',
      'পাতার নিচে সাদামাছি দেখা যায়',
    ],
    natural_treatment: [
      'আক্রান্ত গাছ দ্রুত উপড়ে ফেলুন ও নষ্ট করুন',
      'হলুদ আঠালো ফাঁদ দিয়ে সাদামাছি নিয়ন্ত্রণ করুন',
      'প্রতি ৫ দিনে নিম তেল ৫ মি.লি. প্রতি লিটার পানিতে স্প্রে করুন',
      'সাদামাছি ঠেকাতে ৪০–৬০% শেড নেটের নিচে চাষ করুন',
    ],
    chemical_treatment: [
      'সাদামাছির জন্য ইমিডাক্লোপ্রিড ১৭.৮% SL @ ০.৩ মি.লি. প্রতি লিটার',
      'থায়ামেথোক্সাম ২৫% WG @ ০.২ গ্রাম প্রতি লিটার',
      'বেশি আক্রমণে স্পিরোমেসিফেন ২২.৯% SC @ ১ মি.লি. প্রতি লিটার',
      '১০ দিন পর পুনরায় দিন; ফসল তোলার আগের বিরতি মানুন',
    ],
  },
  Maize: {
    disease:           'গ্রে লিফ স্পট',
    scientific_name:   'Cercospora zeae-maydis',
    symptoms: [
      'পাতার শিরার মাঝে আয়তাকার ধূসর-বাদামি দাগ',
      'নিচের পাতা থেকে দাগ শুরু হয়ে উপরে ছড়ায়',
      '২–৬ সে.মি. লম্বা সরু দাগ, শিরার সাথে সমান্তরাল',
      'তীব্র আক্রমণে পুরো পাতা মরে যায়',
    ],
    natural_treatment: [
      'ফসল কাটার পর অবশিষ্টাংশ মাটিতে গভীরভাবে চাপা দিন',
      'সয়াবিন বা ডালজাতীয় ফসলের সাথে ফসল পরিবর্তন করুন',
      'বায়ু চলাচলের জন্য সারির দূরত্ব বাড়ান',
      'অতিরিক্ত নাইট্রোজেন সার এড়িয়ে চলুন',
    ],
    chemical_treatment: [
      'অ্যাজোক্সিস্ট্রোবিন ২৩% SC @ ১ মি.লি. প্রতি লিটার',
      'প্রোপিকোনাজল ২৫% EC @ ১ মি.লি. প্রতি লিটার',
      '৬ পাতা পর্যায়ে স্প্রে করুন এবং ১৫ দিন পর পুনরায় দিন',
      'ছত্রাকনাশক ব্যবহারে গ্লাভস ও মাস্ক পরুন',
    ],
  },
  Wheat: {
    disease:           'স্ট্রাইপ রাস্ট',
    scientific_name:   'Puccinia striiformis',
    symptoms: [
      'পাতায় ডোরাকাটা হলুদ-কমলা রঙের পুঁজভরা দাগ',
      'দাগ ফেটে হলুদ গুঁড়া বের হয়',
      'আক্রান্ত পাতা আগাম শুকিয়ে যায়',
      'তীব্র আক্রমণে ফলন উল্লেখযোগ্যভাবে কমে',
    ],
    natural_treatment: [
      'যেখানে পাওয়া যায় প্রতিরোধী জাত ব্যবহার করুন',
      'ঠান্ডা ও আর্দ্র আবহাওয়া এড়াতে দেরিতে বপন এড়িয়ে চলুন',
      'ছত্রাক বহনকারী স্বেচ্ছাসেবী গম গাছ ধ্বংস করুন',
      'সুষম সার দিন — অতিরিক্ত নাইট্রোজেন এড়িয়ে চলুন',
    ],
    chemical_treatment: [
      'প্রোপিকোনাজল ২৫% EC @ ০.১% দ্রবণ',
      'টেবুকোনাজল ২৫.৯% EC @ ১ মি.লি. প্রতি লিটার',
      'প্রথম দাগ দেখা দিলেই দিন এবং ১৫ দিন পর পুনরায় দিন',
      'ফুল ফোটার সময় পরাগায়নকারী পতঙ্গ রক্ষায় স্প্রে করবেন না',
    ],
  },
  Cotton: {
    disease:           'ব্যাকটেরিয়াল ব্লাইট',
    scientific_name:   'Xanthomonas citri pv. malvacearum',
    symptoms: [
      'পাতায় কোণাকাটা পানি ভেজা দাগ',
      'দাগ শুকিয়ে হলুদ বলয়সহ বাদামি হয়',
      'আক্রান্ত বোলে গোলাকার গাঢ় বাদামি দাগ',
      'আর্দ্র আবহাওয়ায় চারা ধ্বসে পড়তে পারে',
    ],
    natural_treatment: [
      'সার্টিফাইড রোগমুক্ত বীজ ব্যবহার করুন',
      'গরম পানিতে বীজ শোধন করুন (৫৫°C তাপমাত্রায় ৩০ মিনিট)',
      'ফসল কাটার পর আক্রান্ত গাছের অবশিষ্টাংশ নষ্ট করুন',
      'পাতা ভেজা কমাতে উপর থেকে পানি দেওয়া এড়িয়ে চলুন',
    ],
    chemical_treatment: [
      'কপার অক্সিক্লোরাইড ৫০% WP @ ৩ গ্রাম প্রতি লিটার',
      'স্ট্রেপটোমাইসিন সালফেট @ ০.১ গ্রাম প্রতি লিটার',
      'চারা পর্যায়ে স্প্রে করুন এবং প্রতি ১০ দিনে পুনরায় দিন',
      'ফসল তোলার ৩ সপ্তাহ আগে স্প্রে বন্ধ করুন',
    ],
  },
  Soybean: {
    disease:           'সয়াবিন রাস্ট',
    scientific_name:   'Phakopsora pachyrhizi',
    symptoms: [
      'পাতার নিচের দিকে ছোট বাদামি কোণাকাটা দাগ',
      'ফ্যাকাশে হলুদ বা বাদামি পুঁজভরা দাগ যা গুঁড়া ছাড়ে',
      'তীব্র আক্রমণে আগাম পাতা ঝরে যায়',
      'বীজ ভরাট কম হয়, ফলন উল্লেখযোগ্যভাবে কমে',
    ],
    natural_treatment: [
      'রাস্ট এড়াতে আগাম বপন করুন',
      'যেখানে পাওয়া যায় প্রতিরোধী জাত ব্যবহার করুন',
      'জমি থেকে স্বেচ্ছাসেবী সয়াবিন গাছ সরান',
      'বায়ু চলাচলের জন্য সঠিক দূরত্বে চারা লাগান',
    ],
    chemical_treatment: [
      'অ্যাজোক্সিস্ট্রোবিন + সাইপ্রোকোনাজল @ ১ মি.লি. প্রতি লিটার',
      'ট্রাইফ্লোক্সিস্ট্রোবিন + টেবুকোনাজল @ ০.৭৫ মি.লি. প্রতি লিটার',
      'প্রথম দাগ দেখা দিলে শুরু করুন এবং প্রতি ১৪ দিনে দিন',
      'প্রতিরোধ ক্ষমতা তৈরি এড়াতে ছত্রাকনাশকের গ্রুপ বদলান',
    ],
  },
  _default: {
    disease:           'লিফ স্পট',
    scientific_name:   'Alternaria spp.',
    symptoms: [
      'পাতায় গোলাকার বা অনিয়মিত বাদামি বা কালো দাগ',
      'প্রতিটি দাগের চারপাশে হলুদ বলয়',
      'দাগযুক্ত পাতা হলুদ হয়ে আগাম ঝরে পড়ে',
      'তীব্র আক্রমণে দাগগুলো একত্রিত হয়ে বড় মরা অংশ তৈরি করে',
    ],
    natural_treatment: [
      'আক্রান্ত পাতা হাতে তুলে নষ্ট করুন',
      'পাতা ভেজা এড়াতে গাছের গোড়ায় পানি দিন',
      'বৃষ্টির পর পাতা দ্রুত শুকায় এমনভাবে গাছের দূরত্ব বাড়ান',
      'প্রতিরোধ হিসেবে নিম তেল ৫ মি.লি. প্রতি লিটার পানিতে স্প্রে করুন',
    ],
    chemical_treatment: [
      'ম্যানকোজেব ৭৫% WP @ ২.৫ গ্রাম প্রতি লিটার',
      'ক্লোরোথ্যালোনিল ৭৫% WP @ ২ গ্রাম প্রতি লিটার',
      'কপার অক্সিক্লোরাইড ৫০% WP @ ৩ গ্রাম প্রতি লিটার',
      'প্রতি ১০ দিনে পুনরায় দিন; স্প্রে করার সময় মাস্ক ও গ্লাভস পরুন',
    ],
  },
};
