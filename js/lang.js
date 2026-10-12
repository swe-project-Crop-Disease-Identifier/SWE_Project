/* ==========================================================================
   lang.js — English ↔ Bangla language switcher
   --------------------------------------------------------------------------
   Usage:  every translatable element gets  data-i18n="key"
           elements with HTML content get   data-i18n-html="key"
           select option placeholders get   data-i18n-placeholder="key"
           input placeholders get           data-i18n-placeholder="key"
   The current language is stored in localStorage under "cdi.lang".
   ========================================================================== */

export const TRANSLATIONS = {

  /* ── SHARED ──────────────────────────────────────────────────── */
  'brand.name':          { en: 'Crop Disease Identifier', bn: 'ফসল রোগ শনাক্তকারী' },
  'nav.home':            { en: 'Home',          bn: 'হোম' },
  'nav.check':           { en: 'Check Disease', bn: 'রোগ পরীক্ষা' },
  'nav.about':           { en: 'About',         bn: 'পরিচিতি' },
  'nav.help':            { en: 'Help',          bn: 'সাহায্য' },
  'nav.farmer':          { en: 'Farmer Friendly', bn: 'কৃষক বান্ধব' },
  'lang.switch.to.bn':   { en: 'বাংলা', bn: 'বাংলা' },
  'lang.switch.to.en':   { en: 'English', bn: 'English' },

  'footer.slogan':       { en: 'Better Plants • Better Yields • A Greener Future', bn: 'সুস্থ গাছ • বেশি ফলন • সবুজ ভবিষ্যৎ' },
  'footer.made':         { en: '🌿 Made for Farmers', bn: '🌿 কৃষকদের জন্য তৈরি' },
  'offline.index':       { en: 'You are offline. You can still browse, but checking a leaf needs a connection.', bn: 'আপনি অফলাইনে আছেন। ব্রাউজ করতে পারবেন, তবে রোগ পরীক্ষায় ইন্টারনেট দরকার।' },
  'offline.check':       { en: 'You are offline. Reconnect to check a leaf disease.', bn: 'আপনি অফলাইনে আছেন। রোগ পরীক্ষা করতে সংযুক্ত হন।' },
  'offline.result':      { en: 'You are offline. Showing last saved result.', bn: 'আপনি অফলাইনে আছেন। সর্বশেষ সংরক্ষিত ফলাফল দেখানো হচ্ছে।' },
  'offline.about':       { en: 'You are offline. You can still browse this page.', bn: 'আপনি অফলাইনে আছেন। এই পেজটি এখনও দেখা যাবে।' },
  'offline.help':        { en: 'You are offline. You can still read this page.', bn: 'আপনি অফলাইনে আছেন। এই পেজটি পড়া যাবে।' },

  /* ── HOME PAGE ───────────────────────────────────────────────── */
  'home.hero.title1':    { en: 'Healthy Plants', bn: 'সুস্থ গাছপালা' },
  'home.hero.title2':    { en: 'Bigger Harvests', bn: 'বেশি ফলন' },
  'home.hero.lead':      { en: 'Take a photo of your plant leaf, identify the disease and get treatment suggestions — quickly and easily.', bn: 'আপনার গাছের পাতার ছবি তুলুন, রোগ শনাক্ত করুন এবং চিকিৎসার পরামর্শ পান — দ্রুত ও সহজে।' },
  'home.feat1':          { en: 'Quick Identification', bn: 'দ্রুত শনাক্তকরণ' },
  'home.feat2':          { en: 'Natural & Chemical Treatment Options', bn: 'প্রাকৃতিক ও রাসায়নিক চিকিৎসা' },
  'home.feat3':          { en: 'Works on Low-End Phones', bn: 'সাধারণ ফোনেও কাজ করে' },
  'home.cta':            { en: 'Check Your Plant', bn: 'আপনার গাছ পরীক্ষা করুন' },
  'home.how.title':      { en: 'How It Works', bn: 'কীভাবে কাজ করে' },
  'home.how.sub':        { en: 'Three simple steps — no training needed.', bn: 'তিনটি সহজ ধাপ — কোনো প্রশিক্ষণ দরকার নেই।' },
  'home.step1.title':    { en: 'Take a Photo', bn: 'ছবি তুলুন' },
  'home.step1.desc':     { en: 'Open your camera or upload a photo of the affected leaf from your phone gallery.', bn: 'ক্যামেরা খুলুন বা আক্রান্ত পাতার ছবি গ্যালারি থেকে আপলোড করুন।' },
  'home.step2.title':    { en: 'Select Crop', bn: 'ফসল বেছে নিন' },
  'home.step2.desc':     { en: 'Choose your crop type — Tomato, Potato, Rice, Chili, Maize and more.', bn: 'আপনার ফসল বেছে নিন — টমেটো, আলু, ধান, মরিচ, ভুট্টা ইত্যাদি।' },
  'home.step3.title':    { en: 'Get the Result', bn: 'ফলাফল দেখুন' },
  'home.step3.desc':     { en: 'See the disease name, confidence score and natural & chemical treatment options instantly.', bn: 'রোগের নাম, নিশ্চয়তার মাত্রা এবং প্রাকৃতিক ও রাসায়নিক চিকিৎসা তাৎক্ষণিকভাবে দেখুন।' },
  'home.start.btn':      { en: 'Start Checking Now →', bn: 'এখনই পরীক্ষা শুরু করুন →' },
  'home.ben1.title':     { en: 'More Production', bn: 'বেশি উৎপাদন' },
  'home.ben1.desc':      { en: 'Healthy crops, higher yield every season.', bn: 'সুস্থ ফসল, প্রতি মৌসুমে বেশি ফলন।' },
  'home.ben2.title':     { en: 'Less Loss', bn: 'কম ক্ষতি' },
  'home.ben2.desc':      { en: 'Detect early, act fast before it spreads.', bn: 'আগে শনাক্ত করুন, ছড়ানোর আগেই ব্যবস্থা নিন।' },
  'home.ben3.title':     { en: 'Support Farmers', bn: 'কৃষকদের সহায়তা' },
  'home.ben3.desc':      { en: 'Simple, affordable and reliable for everyone.', bn: 'সহজ, সাশ্রয়ী ও সকলের জন্য নির্ভরযোগ্য।' },

  /* ── CHECK PAGE ──────────────────────────────────────────────── */
  'check.eyebrow':       { en: 'Disease Check', bn: 'রোগ পরীক্ষা' },
  'check.title':         { en: 'Check for Plant Disease', bn: 'গাছের রোগ পরীক্ষা করুন' },
  'check.sub':           { en: 'Upload a photo of the leaf and select the crop to get started.', bn: 'পাতার ছবি আপলোড করুন এবং ফসল বেছে নিন।' },
  'check.drag':          { en: 'Drag & drop your image here', bn: 'এখানে ছবি টেনে ছেড়ে দিন' },
  'check.or':            { en: 'or', bn: 'অথবা' },
  'check.choose':        { en: 'Choose File', bn: 'ফাইল বেছে নিন' },
  'check.camera.hint':   { en: 'You can also use your camera', bn: 'আপনি ক্যামেরাও ব্যবহার করতে পারেন' },
  'check.camera.btn':    { en: 'Open Camera', bn: 'ক্যামেরা খুলুন' },
  'check.remove':        { en: '✕ Remove', bn: '✕ সরান' },
  'check.crop.head':     { en: 'Select Crop', bn: 'ফসল বেছে নিন' },
  'check.crop.placeholder': { en: 'Choose your crop', bn: 'আপনার ফসল বেছে নিন' },
  'check.btn':           { en: 'Check Disease', bn: 'রোগ পরীক্ষা করুন' },
  'check.wifi':          { en: 'Works even with a weak internet connection', bn: 'দুর্বল ইন্টারনেটেও কাজ করে' },
  'check.loading':       { en: 'Checking your leaf…', bn: 'পাতা পরীক্ষা করা হচ্ছে…' },
  'check.error.title':   { en: 'Something went wrong', bn: 'কিছু একটা সমস্যা হয়েছে' },
  'check.error.msg':     { en: 'Please check your connection and try again.', bn: 'আপনার সংযোগ পরীক্ষা করুন এবং আবার চেষ্টা করুন।' },
  'check.retry':         { en: 'Try Again', bn: 'আবার চেষ্টা করুন' },
  'check.tip':           { en: 'Make sure the leaf is clear and well-lit for better results.', bn: 'ভালো ফলাফলের জন্য নিশ্চিত করুন পাতাটি পরিষ্কার ও ভালোভাবে আলোকিত।' },
  'check.tip.link':      { en: 'See photo tips →', bn: 'ছবির টিপস দেখুন →' },

  /* ── RESULT PAGE ─────────────────────────────────────────────── */
  'result.empty.title':  { en: 'No result to show', bn: 'দেখানোর মতো কোনো ফলাফল নেই' },
  'result.empty.desc':   { en: 'Please upload a leaf photo and run a disease check first.', bn: 'অনুগ্রহ করে পাতার ছবি আপলোড করুন এবং আগে রোগ পরীক্ষা করুন।' },
  'result.empty.btn':    { en: 'Check a Leaf →', bn: 'পাতা পরীক্ষা করুন →' },
  'result.back':         { en: 'Back to Check', bn: 'পরীক্ষায় ফিরুন' },
  'result.detected':     { en: 'Disease Detected', bn: 'রোগ শনাক্ত হয়েছে' },
  'result.img.label':    { en: 'Uploaded Image', bn: 'আপলোড করা ছবি' },
  'result.detected2':    { en: 'Disease Detected', bn: 'রোগ শনাক্ত হয়েছে' },
  'result.confidence':   { en: 'Confidence Score', bn: 'নিশ্চয়তার মাত্রা' },
  'result.symptoms':     { en: 'Symptoms', bn: 'লক্ষণসমূহ' },
  'result.natural':      { en: 'Natural Treatment', bn: 'প্রাকৃতিক চিকিৎসা' },
  'result.chemical':     { en: 'Chemical Treatment', bn: 'রাসায়নিক চিকিৎসা' },
  'result.check.another':{ en: 'Check Another Leaf', bn: 'আরেকটি পাতা পরীক্ষা করুন' },
  'result.home':         { en: 'Back to Home', bn: 'হোমে ফিরুন' },

  /* ── ABOUT PAGE ──────────────────────────────────────────────── */
  'about.badge':         { en: 'About Crop Disease Identifier', bn: 'ফসল রোগ শনাক্তকারী পরিচিতি' },
  'about.title':         { en: 'About Crop Disease Identifier', bn: 'ফসল রোগ শনাক্তকারী সম্পর্কে' },
  'about.desc':          { en: 'Crop Disease Identifier is a smart web application designed to help farmers identify plant diseases from leaf photos and get treatment suggestions. It aims to make farming easier, healthier and more productive — especially for small and resource-limited farmers.', bn: 'ফসল রোগ শনাক্তকারী একটি স্মার্ট ওয়েব অ্যাপ্লিকেশন যা কৃষকদের পাতার ছবি থেকে গাছের রোগ শনাক্ত করতে এবং চিকিৎসার পরামর্শ পেতে সাহায্য করে। এটি কৃষিকাজ সহজ, স্বাস্থ্যকর ও আরও উৎপাদনশীল করতে সাহায্য করে — বিশেষত ছোট ও সীমিত সম্পদের কৃষকদের জন্য।' },
  'about.step1.title':   { en: 'Upload or Capture', bn: 'আপলোড বা ক্যাপচার' },
  'about.step1.desc':    { en: 'Take a clear photo of your plant leaf.', bn: 'আপনার গাছের পাতার স্পষ্ট ছবি তুলুন।' },
  'about.step2.title':   { en: 'Select Crop', bn: 'ফসল বেছে নিন' },
  'about.step2.desc':    { en: 'Choose the crop type from the dropdown.', bn: 'ড্রপডাউন থেকে ফসলের ধরন বেছে নিন।' },
  'about.step3.title':   { en: 'Get Result', bn: 'ফলাফল দেখুন' },
  'about.step3.desc':    { en: 'See the disease name, confidence score and treatment options.', bn: 'রোগের নাম, নিশ্চয়তার মাত্রা এবং চিকিৎসার পরামর্শ দেখুন।' },
  'about.tips.title':    { en: 'Tips for Taking a Good Photo', bn: 'ভালো ছবি তোলার টিপস' },
  'about.tip1':          { en: 'Use natural light (avoid dark or blurry photos).', bn: 'প্রাকৃতিক আলো ব্যবহার করুন (অন্ধকার বা ঝাপসা ছবি এড়িয়ে চলুন)।' },
  'about.tip2':          { en: 'Focus on the affected leaf part.', bn: 'আক্রান্ত পাতার অংশে ফোকাস করুন।' },
  'about.tip3':          { en: 'Make sure the leaf is clean and clear.', bn: 'নিশ্চিত করুন পাতাটি পরিষ্কার ও স্পষ্ট।' },
  'about.tip4':          { en: 'Take the photo from a close distance.', bn: 'কাছ থেকে ছবি তুলুন।' },
  'about.ex.good':       { en: 'Good', bn: 'ভালো' },
  'about.ex.dark':       { en: 'Too dark', bn: 'অনেক অন্ধকার' },
  'about.ex.blur':       { en: 'Blurry', bn: 'ঝাপসা' },
  'about.ex.far':        { en: 'Too far', bn: 'অনেক দূর' },
  'about.crops.title':   { en: 'Common Crops Supported', bn: 'সমর্থিত সাধারণ ফসলসমূহ' },
  'about.crops.more':    { en: 'Wheat & more…', bn: 'গম ও আরও…' },
  'about.strip1':        { en: 'Healthy Plants', bn: 'সুস্থ গাছ' },
  'about.strip2':        { en: 'Healthy Food', bn: 'সুস্থ খাবার' },
  'about.strip3':        { en: 'A Better Future', bn: 'উন্নত ভবিষ্যৎ' },
  'about.check.btn':     { en: '📷 Check Your Plant Now', bn: '📷 এখনই আপনার গাছ পরীক্ষা করুন' },

  /* ── HELP PAGE ───────────────────────────────────────────────── */
  'help.badge':         { en: 'Help Center', bn: 'সাহায্য কেন্দ্র' },
  'help.title':         { en: 'Help & FAQ', bn: 'সাহায্য ও প্রশ্নোত্তর' },
  'help.sub':           { en: 'Common questions from farmers — click any question to see the answer.', bn: 'কৃষকদের সবচেয়ে বেশি জিজ্ঞাসা করা প্রশ্নগুলো — যেকোনো প্রশ্নে ক্লিক করলে উত্তর দেখাবে।' },
  'help.ql1.title':     { en: 'Check a Leaf', bn: 'পাতা পরীক্ষা করুন' },
  'help.ql1.sub':       { en: 'Upload your photo now', bn: 'এখনই ছবি আপলোড করুন' },
  'help.ql2.title':     { en: 'Photo Tips', bn: 'ছবির টিপস' },
  'help.ql2.sub':       { en: 'How to take a good photo', bn: 'ভালো ছবি কীভাবে তুলবেন' },
  'help.ql3.title':     { en: 'Supported Crops', bn: 'সমর্থিত ফসল' },
  'help.ql3.sub':       { en: 'See which crops work', bn: 'কোন ফসল কাজ করে দেখুন' },
  'help.tab.photo':     { en: '📷 Photo', bn: '📷 ছবি' },
  'help.tab.result':    { en: '📊 Results', bn: '📊 ফলাফল' },
  'help.tab.treatment': { en: '💊 Treatment', bn: '💊 চিকিৎসা' },
  'help.tab.app':       { en: '📱 App', bn: '📱 অ্যাপ' },

  /* ── PHOTO FAQs (Q1–Q4) ── */
  'help.p.q1': { en: 'What kind of photo gives the best result?', bn: 'কোন ধরনের ছবি তুললে ভালো ফলাফল পাবো?' },
  'help.p.a1': { en: 'Take the photo in natural daylight, hold the leaf flat, get close so the leaf fills the frame, and keep the camera steady to avoid blur. Dark, blurry, or far-away photos give poor results.', bn: 'দিনের আলোতে, পাতা সমতল রেখে, কাছ থেকে ছবি তুলুন — পাতা ফ্রেম ভরিয়ে তুলুন এবং ক্যামেরা স্থির রাখুন। অন্ধকার, ঝাপসা বা অনেক দূর থেকে তোলা ছবিতে ফলাফল ঠিক হয় না।' },
  'help.p.q2': { en: 'How many leaves should be in the photo?', bn: 'একটা ছবিতে কয়টা লিফ থাকবে?' },
  'help.p.a2': { en: 'Take one clear photo of a single leaf that clearly shows the disease symptoms. One focused leaf photo is better than multiple leaves in the frame.', bn: 'একটা পাতার স্পষ্ট ছবি তুলুন যেখানে রোগের লক্ষণ ভালোভাবে দেখা যাচ্ছে। একটা ফোকাসড পাতার ছবি অনেক পাতার ছবির চেয়ে অনেক বেশি ভালো ফলাফল দেয়।' },
  'help.p.q3': { en: 'What photo size and format is accepted?', bn: 'ছবির সাইজ/ফরম্যাট কী হবে?' },
  'help.p.a3': { en: 'JPG or PNG format, maximum 5 MB. Photos taken on your phone camera are automatically compressed to save your data.', bn: 'JPG বা PNG ফরম্যাট, সর্বোচ্চ ৫ MB। ফোনে তোলা ছবি ডেটা বাঁচাতে স্বয়ংক্রিয়ভাবে ছোট করা হয়।' },
  'help.p.q4': { en: 'Can I take a photo directly with the camera?', bn: 'ক্যামেরা দিয়ে সরাসরি ছবি তোলা যায়?' },
  'help.p.a4': { en: 'Yes. Tap the "Open Camera" button and your phone\'s rear camera will open immediately so you can take a fresh photo without leaving the app.', bn: 'হ্যাঁ, "ক্যামেরা খুলুন" বাটনে ক্লিক করলে ফোনের ক্যামেরা সাথে সাথে খুলে যাবে।' },

  /* ── RESULT FAQs (Q5–Q8) ── */
  'help.r.q1': { en: 'What does the confidence score mean?', bn: 'Confidence score মানে কী?' },
  'help.r.a1': { en: 'It shows how certain the app is about the diagnosis. Above 80% is highly reliable. Below 60% means try again with a clearer, closer photo.', bn: 'অ্যাপটি কতটা নিশ্চিত যে রোগটা এটাই। ৮০%-এর উপরে হলে ফলাফল অনেক ভরসাযোগ্য। ৬০%-এর নিচে হলে নতুন, আরও স্পষ্ট ছবি তুলুন।' },
  'help.r.q2': { en: 'Is the result 100% correct?', bn: 'রেজাল্টটা কি ১০০% ঠিক?' },
  'help.r.a2': { en: '⚠️ No. This is an AI estimate, not a guaranteed diagnosis. If the disease seems serious or you are unsure, please consult a local agricultural officer or crop expert before taking major action.', bn: '⚠️ না। এটা একটা AI-এর অনুমান, নিশ্চিত রোগ নির্ণয় নয়। রোগ যদি গুরুতর মনে হয় বা সন্দেহ থাকে, তাহলে বড় পদক্ষেপ নেওয়ার আগে কৃষি অফিসার বা বিশেষজ্ঞের সাথে কথা বলুন।' },
  'help.r.q3': { en: 'What to do if it shows "Low confidence"?', bn: '"Low confidence" দেখালে কী করবো?' },
  'help.r.a3': { en: 'Take a new photo in better light, from closer, and make sure you have selected the correct crop from the dropdown.', bn: 'ভালো আলোতে, কাছ থেকে নতুন ছবি তুলুন। আর সঠিক ফসল সিলেক্ট করেছেন কিনা চেক করুন।' },
  'help.r.q4': { en: 'Can I save or share my result?', bn: 'রেজাল্ট কি সেভ বা শেয়ার করা যাবে?' },
  'help.r.a4': { en: 'Yes, take a screenshot of the result page to save or share it with others.', bn: 'হ্যাঁ, রেজাল্ট পেজের স্ক্রিনশট নিয়ে সেভ বা শেয়ার করতে পারবেন।' },

  /* ── TREATMENT FAQs (Q9–Q11) ── */
  'help.t.q1': { en: 'What is the difference between natural and chemical treatment?', bn: 'Natural আর Chemical treatment-এ কোনো পার্থক্য আছে?' },
  'help.t.a1': { en: 'Natural methods (e.g. neem oil) are safe for the environment and suitable for mild infections. Chemical methods (fungicides) work faster for severe cases but must be used carefully following dosage instructions.', bn: 'প্রাকৃতিক উপায় (যেমন নিম তেল) পরিবেশের জন্য নিরাপদ, হালকা রোগে ভালো কাজ করে। রাসায়নিক উপায় (ফাঙ্গিসাইড) রোগ বেশি হলে কাজ করে, তবে সঠিক মাত্রায় ব্যবহার করতে হবে।' },
  'help.t.q2': { en: 'What precautions should I take when using chemicals?', bn: 'Chemical use করার সময় কী সতর্কতা নেবো?' },
  'help.t.a2': { en: 'Always follow the dosage on the packet label. Wear gloves and a mask while spraying. Do not spray a few days before harvesting (check the pre-harvest interval on the label).', bn: 'প্যাকেটে দেওয়া মাত্রা অনুযায়ী ব্যবহার করুন, হাতে গ্লাভস পরুন, আর ফসল তোলার কিছু দিন আগে স্প্রে করবেন না (প্যাকেটে pre-harvest interval দেওয়া থাকে)।' },
  'help.t.q3': { en: 'When is the best time to spray?', bn: 'স্প্রে কখন দেবো?' },
  'help.t.a3': { en: 'Spray at the very beginning of the infection for best results. Morning or late afternoon is the best time — avoid spraying in strong midday sun.', bn: 'রোগের শুরুতে দিলে বেশি কাজ করে। সকাল বা বিকেলে স্প্রে করা ভালো — কড়া রোদে স্প্রে করবেন না।' },

  /* ── APP FAQs (Q12–Q15) ── */
  'help.a.q1': { en: 'Will the app work without internet?', bn: 'Internet না থাকলে অ্যাপ চলবে?' },
  'help.a.a1': { en: 'The app works with a weak internet connection. But without any connection at all, the photo cannot be checked because it needs to reach the server. You can still browse other pages.', bn: 'দুর্বল ইন্টারনেটেও চলবে। তবে একেবারে নেট না থাকলে ছবি চেক হবে না, কারণ চেক করতে সার্ভারে পাঠাতে হয়। অন্য পেজ দেখা যাবে।' },
  'help.a.q2': { en: 'Will it work on a cheap phone?', bn: 'Cheap phone-এ চলবে?' },
  'help.a.a2': { en: 'Yes, the app is built to be lightweight and fast even on low-end Android phones.', bn: 'হ্যাঁ, অ্যাপটা হালকা করে বানানো হয়েছে যেন কম দামি অ্যান্ড্রয়েড ফোনেও ভালো চলে।' },
  'help.a.q3': { en: 'Which crops can be identified?', bn: 'কোন কোন ফসলের রোগ ধরা যায়?' },
  'help.a.a3': { en: 'Currently: Tomato, Potato, Rice, Chili, Maize and more. New crops will be added over time.', bn: 'এখন: টমেটো, আলু, ধান, মরিচ, ভুট্টা আর আরও কিছু। সময়ের সাথে নতুন ফসল যোগ হবে।' },
  'help.a.q4': { en: 'Is my photo stored or shared?', bn: 'আমার ছবি কি সেভ করা হয়?' },
  'help.a.a4': { en: 'Your photo is used only for disease checking and is not stored permanently or shared with third parties.', bn: 'আপনার ছবি শুধু রোগ চেক করার জন্য ব্যবহার হয়। এটা স্থায়ীভাবে সেভ করা হয় না বা তৃতীয় কোনো পক্ষের সাথে শেয়ার করা হয় না।' },

  /* Contact */
  'help.contact.title': { en: 'Still have questions?', bn: 'এখনও প্রশ্ন আছে?' },
  'help.contact.desc':  { en: 'Check our About page for photo tips and crop info, or go straight to checking your leaf.', bn: 'ছবির টিপস ও ফসলের তথ্যের জন্য পরিচিতি পেজ দেখুন, অথবা সরাসরি পাতা পরীক্ষা করুন।' },
  'help.contact.btn1':  { en: 'Read About Page', bn: 'পরিচিতি পেজ পড়ুন' },
  'help.contact.btn2':  { en: 'Check a Leaf →', bn: 'পাতা পরীক্ষা করুন →' },
};

/* ==========================================================================
   Core engine
   ========================================================================== */
const STORAGE_KEY = 'cdi.lang';

export function getLang() {
  return localStorage.getItem(STORAGE_KEY) || 'en';
}

function setLang(lang) {
  localStorage.setItem(STORAGE_KEY, lang);
}

export function applyLang(lang) {
  document.documentElement.lang = lang === 'bn' ? 'bn' : 'en';

  /* text content */
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    const val = TRANSLATIONS[key]?.[lang];
    if (val !== undefined) el.textContent = val;
  });

  /* innerHTML (for FAQ bodies with <ul>/<p> tags) */
  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    const key = el.dataset.i18nHtml;
    const val = TRANSLATIONS[key]?.[lang];
    if (val !== undefined) el.innerHTML = val;
  });

  /* select / input placeholders */
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.dataset.i18nPlaceholder;
    const val = TRANSLATIONS[key]?.[lang];
    if (val === undefined) return;
    if (el.tagName === 'SELECT') {
      const first = el.querySelector('option[value=""]');
      if (first) first.textContent = val;
    } else {
      el.placeholder = val;
    }
  });

  /* toggle button label */
  const btn = document.getElementById('lang-toggle');
  if (btn) {
    btn.textContent = lang === 'en'
      ? TRANSLATIONS['lang.switch.to.bn'].en   /* show "বাংলা" */
      : TRANSLATIONS['lang.switch.to.en'].bn;  /* show "English" */
    btn.setAttribute('aria-label', lang === 'en' ? 'Switch to Bangla' : 'Switch to English');
    btn.dataset.lang = lang;
  }
}

export function initLang() {
  const lang = getLang();
  applyLang(lang);

  const btn = document.getElementById('lang-toggle');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const next = getLang() === 'en' ? 'bn' : 'en';
    setLang(next);
    applyLang(next);
  });
}
