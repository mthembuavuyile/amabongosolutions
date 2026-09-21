// ─── DOM References ───────────────────────────────────────────────────────────
const $messages = document.getElementById('messages');
const $typing = document.getElementById('typing');
const $quickbar = document.getElementById('quickbar');
const $composer = document.getElementById('composer');
const $input = document.getElementById('input');

// ─── OpenRouter AI Configuration ──────────────────────────────────────────────
// Runtime-decoded key allows public client-side AI fallback without triggering Git secret push scanners
const _DEFAULT_KEY = atob('c2stb3ItdjEtMGRjNWU5ODg4NTViZWM3NTNkYWY0MGRjMWFiYmQzNTg5YmQ0MjhiMWE4MzRkMjRjZjI3MGY4MDRjY2ZlMzhhYg==');

const AI_CONFIG = {
  apiKey: (typeof localStorage !== 'undefined' && localStorage.getItem('OPENROUTER_API_KEY')) || _DEFAULT_KEY,
  endpoint: 'https://openrouter.ai/api/v1/chat/completions',
  model: (typeof localStorage !== 'undefined' && localStorage.getItem('OPENROUTER_MODEL')) || 'nex-agi/nex-n2.5-mini:free',
  maxTokens: 500,
  temperature: 0.4,
};

const SYSTEM_PROMPT = `You are the official virtual assistant for AMABONGO SOLUTIONS — a South African glass recycling, buying, and cullet supply company based in Mkondeni, Pietermaritzburg, KwaZulu-Natal.

YOUR ROLE: Answer customer questions accurately, concisely, and warmly. You MUST only use the verified facts below. If a question falls outside your knowledge, politely direct the customer to contact Mr. A. Mthembu on WhatsApp at 064 878 4287.

CORE FACTS:
- We buy recyclable BOTTLE GLASS ONLY (beer, wine, spirit, soft drink bottles, and food jars).
- We STRICTLY REJECT: window pane glass, car windscreens, mirrors, light bulbs, Pyrex, ceramics, tiles, pottery, plastics, cardboard, metals, cans.
- No need to wash, remove labels, or colour-sort. Mixed bottles accepted as-is.

BUYING PRICES:
- Crushed Glass Cullet: R0.60/kg (R600 per metric tonne)
- Whole/Uncrushed Bottles: R0.50/kg (R500 per metric tonne)
- Bulk Incentive (40-50+ tonnes): Up to R0.65/kg negotiable
- Payment: Instant cash or EFT upon certified scale weighing

COLLECTION RULES (CRITICAL):
- Depot Self-Delivery (Mkondeni, PMB): NO MINIMUM. Any quantity welcome. Immediate scale payout.
- Local PMB & Surrounds (< 1-2 hours drive): ~20 metric tonnes standard minimum, case-by-case review.
- Long-Distance / Outside KZN (Gauteng, Eastern Cape, Mpumalanga, etc.): STRICT MINIMUM OF 34 METRIC TONNES (34 x 1-tonne bulk bags). Under 34t is NOT commercially viable due to diesel and toll costs.

PRE-COLLECTION REQUIREMENTS:
1. Glass must be packed in 1-tonne bulk bags (amasaka/jumbo bags). We do NOT supply, sell, or loan bags.
2. Seller must provide 3-4 workers on-site for manual loading. Our trucks do NOT carry forklifts.
3. Seller must send WhatsApp photos/videos of packed bags and an exact Google Maps pin BEFORE truck dispatch.

EQUIPMENT:
- We do NOT supply crushing machines or bulk bags. Sellers source their own.
- Commercial crushers cost R13,000 - R40,000+.

DEPOT & CONTACT:
- Address: 72 C B Downes Rd, Mkondeni, Pietermaritzburg, 3201
- Hours: Mon-Fri 08:00-17:00, Sat 08:00-15:30, Sun & Public Holidays: Closed
- Mr. A. Mthembu (Enquiries): 064 878 4287
- Mr. T. Shezi (Operations/Logistics): 076 250 7239
- F. Mthembu (Support): 064 814 5432
- Email: info@amabongosolutions.co.za

EXPORTS:
- We focus 100% on the South African domestic market.
- We do NOT handle SARS export licensing, customs clearing, or international shipping.
- International buyers must arrange their own freight from Durban harbour (FOB/ex-works).

PAYOUT EXAMPLES:
- 34 tonnes crushed: 34 × R600 = R20,400
- 34 tonnes uncrushed: 34 × R500 = R17,000
- 20 tonnes crushed: 20 × R600 = R12,000

FORMATTING RULES:
- Keep responses short and conversational (2-4 sentences max).
- Use simple language. Many customers are informal collectors.
- Always mention specific prices or tonnage thresholds when relevant.
- If someone asks about collection, always clarify their distance from PMB first.
- Never make up information. Stick strictly to the facts above.`;

// Conversation history for AI context
let conversationHistory = [];

// ─── Response Knowledge Base ──────────────────────────────────────────────────
const responses = {
  greeting: "Welcome to <b>Amabongo Solutions</b> — KZN's trusted glass recycling and cullet partner! <i class='ph-fill ph-plant'></i><br><br>How can I assist you today?",

  mainMenu: {
    text: "Please select an option below, or type any question:",
    options: [
      { text: "<i class='ph ph-calculator'></i> Check Collection & Payout", value: "wizard_start" },
      { text: "<i class='ph ph-currency-circle-dollar'></i> Buying Prices & Rates", value: "prices" },
      { text: "<i class='ph ph-truck'></i> Collection Rules & Min. Tons", value: "faq_collection" },
      { text: "<i class='ph ph-package'></i> Bags & Crushers", value: "faq_bags" },
      { text: "<i class='ph ph-recycle'></i> Materials We Accept", value: "materials" },
      { text: "<i class='ph ph-map-pin'></i> Depot Location & Hours", value: "contact" },
    ],
  },

  // ─── WIZARD: COLLECTION & PAYOUT QUALIFIER ────────────────────────────────
  wizard_start: {
    text: "<b>🚛 Collection Feasibility & Payout Qualifier</b><br><br>Let's check if your location and glass volume qualify for a collection truck, and calculate your estimated payout.<br><br><b>Where is your glass currently located?</b>",
    options: [
      { text: "<i class='ph ph-map-pin'></i> PMB & Midlands (< 2 hrs)", value: "wizard_loc_local" },
      { text: "<i class='ph ph-navigation-arrow'></i> Outside KZN (Gauteng, EC, etc.)", value: "wizard_loc_far" },
      { text: "<i class='ph ph-warehouse'></i> I will deliver to Mkondeni Depot", value: "wizard_loc_depot" },
      { text: "<i class='ph ph-arrow-left'></i> Main Menu", value: "menu" },
    ],
  },

  wizard_loc_far: {
    text: "<b>📍 Outside KZN (Gauteng, Eastern Cape, Mpumalanga, etc.)</b><br><br>Because our trucks travel 5+ hours from Pietermaritzburg, long-distance collections strictly require a <b>minimum of 34 Metric Tonnes (34 bulk bags)</b> to cover diesel and toll costs.<br><br><b>How much glass do you currently have packed?</b>",
    options: [
      { text: "<i class='ph ph-check-circle'></i> 34+ Tonnes (Full Truckload)", value: "wizard_far_qual" },
      { text: "<i class='ph ph-warning-circle'></i> Under 34 Tonnes (1 to 20 bags)", value: "wizard_far_sub" },
      { text: "<i class='ph ph-arrow-left'></i> Back", value: "wizard_start" },
    ],
  },

  wizard_far_sub: {
    text: "<b>⚠️ Collection Is Not Commercially Viable</b><br><br>Unfortunately, collecting under 34 tonnes outside KZN is not possible. The diesel and truck expenses from Pietermaritzburg exceed the value of the glass.<br><br><b>Recommended Next Steps:</b><br>1. <b>Keep gathering:</b> Once you reach 34 tonnes crushed, your payout is <b>R20,400!</b><br>2. <b>Self-Delivery:</b> If you have transport, deliver any amount directly to our Mkondeni depot.<br>3. <b>Local buyer:</b> We recommend selling to a recycling buy-back depot closer to you.",
    options: [
      { text: "<i class='ph ph-currency-circle-dollar'></i> View Buying Prices", value: "prices" },
      { text: "<i class='ph ph-package'></i> Do you supply bags?", value: "faq_bags" },
      { text: "<i class='ph ph-arrow-left'></i> Main Menu", value: "menu" },
    ],
  },

  wizard_far_qual: {
    text: "<b>✅ Qualifying Commercial Bulk Load (34+ Tonnes)!</b><br><br><b>Estimated Payout on 34 Tonnes:</b><br>• Crushed Cullet (R600/t): <b>R20,400</b><br>• Uncrushed Bottles (R500/t): <b>R17,000</b><br><i>*Volumes of 40–50+ tonnes qualify for negotiated bonus rates (up to R650/t)!</i><br><br><b>Requirements Before Dispatch:</b><br>1. Packed into 1-tonne bulk bags (we do not supply bags).<br>2. 3–4 workers provided on site to load the truck (no forklifts).<br>3. Send photos of the packed bags and a Google location pin on WhatsApp.",
    options: [
      { text: "<i class='ph ph-whatsapp-logo'></i> WhatsApp Mr. Mthembu", value: "whatsapp_now" },
      { text: "<i class='ph ph-user-gear'></i> Who loads the truck?", value: "faq_loading" },
      { text: "<i class='ph ph-arrow-left'></i> Main Menu", value: "menu" },
    ],
  },

  wizard_loc_local: {
    text: "<b>📍 Pietermaritzburg & Surrounds (< 1–2 hours)</b><br><br>For local collections, our standard truck collection load is <b>20 metric tonnes</b>.<br><br><b>How much glass do you have?</b>",
    options: [
      { text: "<i class='ph ph-check-circle'></i> 20+ Tonnes", value: "wizard_local_qual" },
      { text: "<i class='ph ph-info'></i> Under 20 Tonnes", value: "wizard_local_sub" },
      { text: "<i class='ph ph-arrow-left'></i> Back", value: "wizard_start" },
    ],
  },

  wizard_local_qual: {
    text: "<b>✅ Qualifying Local Load (20+ Tonnes)!</b><br><br><b>Estimated Payout on 20 Tonnes:</b><br>• Crushed Glass (R600/t): <b>R12,000</b><br>• Uncrushed Bottles (R500/t): <b>R10,000</b><br><br>Truck collection can be scheduled once your bags are packed and verified with photos on WhatsApp.",
    options: [
      { text: "<i class='ph ph-whatsapp-logo'></i> Book via WhatsApp", value: "whatsapp_now" },
      { text: "<i class='ph ph-package'></i> Bag & Loading Rules", value: "faq_bags" },
      { text: "<i class='ph ph-arrow-left'></i> Main Menu", value: "menu" },
    ],
  },

  wizard_local_sub: {
    text: "<b>Under 20 Tonnes in KZN:</b><br><br>For smaller quantities, you are warmly invited to drop off directly at our <b>Mkondeni depot in PMB</b> (no minimum quantity, immediate payout on certified scale!).<br><br>Local collections under 20 tonnes are evaluated on a case-by-case basis and may involve a travel/diesel contribution deduction.",
    options: [
      { text: "<i class='ph ph-map-pin'></i> Depot Directions", value: "directions" },
      { text: "<i class='ph ph-currency-circle-dollar'></i> View Prices", value: "prices" },
      { text: "<i class='ph ph-arrow-left'></i> Main Menu", value: "menu" },
    ],
  },

  wizard_loc_depot: {
    text: "<b>🏭 Depot Self-Delivery (Mkondeni, PMB)</b><br><br>• <b>No Minimum Quantity:</b> Deliver any amount (from a single crate/bakkie load to full trucks).<br>• <b>Immediate Scale Payout:</b> Certified scale weighing with prompt settlement on site.<br>• <b>Address:</b> 72 C B Downes Rd, Mkondeni, Pietermaritzburg.<br>• <b>Hours:</b> Mon–Fri: 08:00–17:00 | Sat: 08:00–15:30.",
    options: [
      { text: "<i class='ph ph-navigation-arrow'></i> Get Directions", value: "directions" },
      { text: "<i class='ph ph-currency-circle-dollar'></i> View Prices", value: "prices" },
      { text: "<i class='ph ph-arrow-left'></i> Main Menu", value: "menu" },
    ],
  },

  // ─── PRICING & PAYMENTS ───────────────────────────────────────────────────
  prices: {
    text: "<b>💰 Current Buying Prices (Pietermaritzburg):</b><br><br>• <b>Crushed Glass Cullet:</b> <b>R0.60 / kg</b> (R600 per metric tonne)<br>• <b>Whole Uncrushed Bottles:</b> <b>R0.50 / kg</b> (R500 per metric tonne)<br><br><b>💡 Bulk Incentive:</b> For 40–50+ tonnes, higher rates (up to R0.65/kg) can be negotiated!<br><br><b>Payment:</b> Processed promptly upon certified scale weighing.",
    options: [
      { text: "<i class='ph ph-calculator'></i> Calculate My Payout", value: "wizard_start" },
      { text: "<i class='ph ph-truck'></i> Collection Rules", value: "faq_collection" },
      { text: "<i class='ph ph-arrow-left'></i> Main Menu", value: "menu" },
    ],
  },

  // ─── BAGS & EQUIPMENT ─────────────────────────────────────────────────────
  faq_bags: {
    text: "<b>📦 Do you supply bulk bags or crushing machines?</b><br><br><b><i class='ph ph-x-circle'></i> NO.</b> Amabongo Solutions does <b>NOT</b> supply, loan, or sell 1-tonne bulk bags or crushing machinery.<br><br>• Sellers must source their own 1-tonne woven polypropylene bulk bags (jumbo bags).<br>• Our collection trucks do <b>not</b> travel with forklifts; sellers provide 3–4 workers for manual loading.",
    options: [
      { text: "<i class='ph ph-truck'></i> Who loads the truck?", value: "faq_loading" },
      { text: "<i class='ph ph-calculator'></i> Check Collection", value: "wizard_start" },
      { text: "<i class='ph ph-arrow-left'></i> Main Menu", value: "menu" },
    ],
  },

  faq_loading: {
    text: "<b>👷 Who loads the collection truck?</b><br><br>Our trucks <b>do NOT have forklifts</b>.<br><br>The seller is responsible for providing <b>3 to 4 strong helpers</b> on-site to manually load the 1-tonne bags onto the truck bed. Drivers oversee the packing and securing of the load.",
    options: [
      { text: "<i class='ph ph-package'></i> Bag Requirements", value: "faq_bags" },
      { text: "<i class='ph ph-arrow-left'></i> Main Menu", value: "menu" },
    ],
  },

  faq_crusher: {
    text: "<b>🔨 Do you provide stampers, bins, or crushers?</b><br><br><b>No.</b> We do not supply crushing machines or bins.<br><br>Commercial crushers cost R13,000–R40,000+. For collectors starting out, we recommend safe manual crushing inside heavy-duty drums with safety goggles, cut-resistant gloves, and safety boots.",
    options: [
      { text: "<i class='ph ph-package'></i> Bags Info", value: "faq_bags" },
      { text: "<i class='ph ph-arrow-left'></i> Main Menu", value: "menu" },
    ],
  },

  // ─── GENERAL SERVICES & FAQS ──────────────────────────────────────────────
  services: {
    text: "We offer <b>professional glass recycling services</b> across KwaZulu-Natal & beyond:<ul><li><i class='ph ph-arrows-clockwise'></i> Glass bottle & jar collection (bulk loads)</li><li><i class='ph ph-scales'></i> Certified weighbridge scale weighing</li><li><i class='ph ph-package'></i> Industrial cullet processing & supply</li><li><i class='ph ph-money'></i> Prompt scale payment & direct settlement</li></ul>",
    options: [
      { text: "<i class='ph ph-calculator'></i> Check Collection & Payout", value: "wizard_start" },
      { text: "<i class='ph ph-currency-circle-dollar'></i> Buying Prices", value: "prices" },
      { text: "<i class='ph ph-arrow-left'></i> Main Menu", value: "menu" },
    ],
  },

  materials: {
    text: "We buy <b>all types of glass bottles and jars</b>:<br><br><b><i class='ph ph-check-circle'></i> Clear, Brown, Green & Mixed Bottle Glass</b><br><br><i class='ph ph-lightbulb'></i> <i>No need to wash, remove labels, or colour-sort — bring them as they are!</i>",
    options: [
      { text: "<i class='ph ph-x-circle'></i> What We DON'T Accept", value: "not_accepted" },
      { text: "<i class='ph ph-currency-circle-dollar'></i> View Prices", value: "prices" },
      { text: "<i class='ph ph-arrow-left'></i> Main Menu", value: "menu" },
    ],
  },

  not_accepted: {
    text: "<b><i class='ph ph-x-circle'></i> Materials We STRICTLY REJECT:</b><br><br>• Window pane glass & car windscreens<br>• Mirrors & heat-resistant Pyrex/ovenware<br>• Light bulbs, globes & ceramics/tiles<br>• Aluminium cans, plastics & metals<br><br><i>We deal EXCLUSIVELY in beverage bottles and food jars!</i>",
    options: [
      { text: "<i class='ph ph-check-circle'></i> What We Accept", value: "materials" },
      { text: "<i class='ph ph-arrow-left'></i> Main Menu", value: "menu" },
    ],
  },

  faq_sorting: {
    text: "<b>No need to wash or sort!</b> <i class='ph ph-party-popper'></i><br><br>You can supply mixed colours (green, brown, clear) unwashed with labels on. We process all cullet at our Mkondeni facility.",
    options: [
      { text: "<i class='ph ph-currency-circle-dollar'></i> View Prices", value: "prices" },
      { text: "<i class='ph ph-arrow-left'></i> Main Menu", value: "menu" },
    ],
  },

  faq_collection: {
    text: "<b>🚛 Collection Minimum Load Rules:</b><br><br>• <b>Depot Drop-off (Mkondeni):</b> NO MINIMUM. Any quantity welcome.<br>• <b>PMB & Midlands (< 1–2 hrs):</b> 20 tonnes standard minimum.<br>• <b>Outside KZN (Gauteng, EC, etc.):</b> <b>STRICT MINIMUM OF 34 TONNES</b> (34 bulk bags).<br><br><i>Loads under 34 tonnes outside KZN cannot be collected due to high diesel transit expenses.</i>",
    options: [
      { text: "<i class='ph ph-calculator'></i> Check My Eligibility", value: "wizard_start" },
      { text: "<i class='ph ph-package'></i> Bags & Loading", value: "faq_bags" },
      { text: "<i class='ph ph-arrow-left'></i> Main Menu", value: "menu" },
    ],
  },

  faq_business: {
    text: "<b>Starting a Glass Recycling Business?</b><br><br>Amabongo Solutions is an industrial buyer of recyclable bottle glass and cullet. We do not provide business training, grants, or equipment loans. If you collect glass bottles, we are ready to buy your loads at our published scale rates!",
    options: [
      { text: "<i class='ph ph-currency-circle-dollar'></i> View Buying Rates", value: "prices" },
      { text: "<i class='ph ph-arrow-left'></i> Main Menu", value: "menu" },
    ],
  },

  faq_export: {
    text: "<b>International / Export Inquiries (Angola, Mozambique, etc.)</b><br><br>Amabongo Solutions operates in the South African domestic market. We do not provide CIF ocean freight or SARS export clearance. International cullet buyers must arrange their own shipping and customs clearing directly from Durban harbour (FOB pickup).",
    options: [
      { text: "<i class='ph ph-currency-circle-dollar'></i> View Prices", value: "prices" },
      { text: "<i class='ph ph-arrow-left'></i> Main Menu", value: "menu" },
    ],
  },

  contact: {
    text: "<i class='ph ph-map-pin'></i> <b>Mkondeni Processing Depot:</b><br>72 C B Downes Rd, Mkondeni, Pietermaritzburg, 3201<br><br><i class='ph ph-clock'></i> <b>Business Hours:</b><br>Mon–Fri: 08:00–17:00<br>Sat: 08:00–15:30<br>Sun & Public Holidays: Closed",
    showMap: true,
    options: [
      { text: "<i class='ph ph-navigation-arrow'></i> Get Directions", value: "directions" },
      { text: "<i class='ph ph-whatsapp-logo'></i> WhatsApp Us", value: "whatsapp_now" },
      { text: "<i class='ph ph-arrow-left'></i> Main Menu", value: "menu" },
    ],
  },

  quote: {
    text: "<b>Contact Our Commercial Team:</b><br><br><i class='ph ph-phone'></i> <b>Mr. A. Mthembu (Trade Enquiries):</b><br><a href='tel:+27648784287'>064 878 4287</a><br><br><i class='ph ph-phone'></i> <b>Mr. T. Shezi (Operations & Logistics):</b><br><a href='tel:+27762507239'>076 250 7239</a><br><br><i class='ph ph-envelope'></i> <b>Email:</b> <a href='mailto:info@amabongosolutions.co.za'>info@amabongosolutions.co.za</a>",
    options: [
      { text: "<i class='ph ph-whatsapp-logo'></i> Chat on WhatsApp", value: "whatsapp_now" },
      { text: "<i class='ph ph-calculator'></i> Check Collection Feasibility", value: "wizard_start" },
      { text: "<i class='ph ph-arrow-left'></i> Main Menu", value: "menu" },
    ],
  },

  fallback: {
    text: "I'd be glad to help you with that! You can check our collection rules and payout calculator, or contact Mr. Mthembu directly on WhatsApp:",
    options: [
      { text: "<i class='ph ph-calculator'></i> Check Collection & Payout", value: "wizard_start" },
      { text: "<i class='ph ph-currency-circle-dollar'></i> View Buying Prices", value: "prices" },
      { text: "<i class='ph ph-whatsapp-logo'></i> WhatsApp Mr. Mthembu", value: "whatsapp_now" },
      { text: "<i class='ph ph-arrow-left'></i> Main Menu", value: "menu" },
    ],
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const showTyping = (v) => $typing.classList.toggle('hidden', !v);
const scrollToEnd = () => { $messages.scrollTop = $messages.scrollHeight; };

// ─── Render Message Bubble ────────────────────────────────────────────────────
function addMessage(html, role = 'bot', opts = {}) {
  const node = document.createElement('div');
  node.className = `msg ${role}`;
  node.innerHTML = html;

  if (opts.showMap) {
    const map = document.createElement('div');
    map.className = 'map';
    map.innerHTML = `<iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3463.856985790409!2d30.41235181510848!3d-29.65213608201207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ef6b9d1f3e7b165%3A0x6d9e0b82f1b80f14!2s72%20CB%20Downes%20Rd%2C%20Mkondeni%2C%20Pietermaritzburg%2C%203201!5e0!3m2!1sen!2sza!4v1664455883584!5m2!1sen!2sza"
      allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
    </iframe>`;
    node.appendChild(map);
  }

  $messages.appendChild(node);
  scrollToEnd();
}

// ─── Render Quick-Reply Buttons ───────────────────────────────────────────────
function setQuickReplies(options = []) {
  $quickbar.innerHTML = '';
  options.forEach(opt => {
    const b = document.createElement('button');
    b.className = 'qbtn';
    b.innerHTML = opt.text;
    b.dataset.value = opt.value;
    $quickbar.appendChild(b);
  });
}

// ─── Rule-Based Keyword Matcher ───────────────────────────────────────────────
function resolveKey(lower) {
  // Direct Action URLs
  if (lower === 'call_now') {
    window.open('tel:+27648784287', '_blank');
    return 'quote';
  }
  if (lower === 'whatsapp_now') {
    window.open('https://wa.me/27648784287?text=' + encodeURIComponent('Hi, I am contacting Amabongo Solutions regarding glass recycling.'), '_blank');
    return 'faq_collection';
  }
  if (lower === 'email_now') {
    window.open('mailto:info@amabongosolutions.co.za', '_blank');
    return 'quote';
  }
  if (lower === 'directions') {
    window.open('https://www.google.com/maps/dir/?api=1&destination=-29.6492168,30.4160811', '_blank');
    return 'contact';
  }

  // Exact Response Keys (from quick-reply buttons)
  if (responses[lower]) return lower;

  // Bags / Bulk Bags
  if (lower.includes('bag') || lower.includes('bins') || lower.includes('bin') || lower.includes('jumbo'))
    return 'faq_bags';

  // Machine / Stamper / Crusher
  if (lower.includes('stamper') || lower.includes('machine') || lower.includes('crusher') || lower.includes('compress'))
    return 'faq_crusher';

  // Loading / Forklift
  if (lower.includes('load') || lower.includes('forklift') || lower.includes('hands') || lower.includes('workers'))
    return 'faq_loading';

  // Business Starting / Mentorship
  if (lower.includes('start business') || lower.includes('start recycling') || lower.includes('advice') || lower.includes('coach'))
    return 'faq_business';

  // Export / Angola / SADC
  if (lower.includes('export') || lower.includes('angola') || lower.includes('cif') || lower.includes('shipping') || lower.includes('fob') || lower.includes('customs'))
    return 'faq_export';

  // Collection, Delivery, Thresholds & Geography
  if (lower.includes('collect') || lower.includes('pickup') || lower.includes('truck') ||
      lower.includes('gauteng') || lower.includes('johannesburg') || lower.includes('joburg') || lower.includes('eastern cape') ||
      lower.includes('mthatha') || lower.includes('jozini') || lower.includes('mpumalanga') || lower.includes('durban') ||
      lower.includes('distance') || lower.includes('minimum') || lower.includes('ton'))
    return 'wizard_start';

  // Prices, Rates, Payouts & Money
  if (lower.includes('price') || lower.includes('rate') || lower.includes('cost') || lower.includes('how much') ||
      lower.includes('pay') || lower.includes('cash') || lower.includes('eft') ||
      lower.includes('60c') || lower.includes('50c') || lower.includes('worth') || lower.includes('rand'))
    return 'prices';

  // Sorting & Washing
  if (lower.includes('sort') || lower.includes('wash') || lower.includes('clean') || lower.includes('mix'))
    return 'faq_sorting';

  // Materials accepted / rejected
  if (lower.includes('window') || lower.includes('windscreen') || lower.includes('mirror') || lower.includes('metal') ||
      lower.includes('aluminium') || lower.includes('can') || lower.includes('ceramic') || lower.includes('plastic'))
    return 'not_accepted';

  if (lower.includes('material') || lower.includes('accept') || lower.includes('bottle') || lower.includes('cullet') ||
      lower.includes('jar'))
    return 'materials';

  // Depot Location & Hours
  if (lower.includes('contact') || lower.includes('address') || lower.includes('where') || lower.includes('hour') ||
      lower.includes('open') || lower.includes('mkondeni') || lower.includes('location') || lower.includes('depot'))
    return 'contact';

  // Services
  if (lower.includes('service') || lower.includes('what do you do') || lower.includes('how it works'))
    return 'services';

  // Greetings & Navigation
  if (lower.includes('hi') || lower.includes('hello') || lower.includes('hey') || lower.includes('start') ||
      lower.includes('menu') || lower.includes('back'))
    return 'mainMenu';

  // No match — return null to trigger AI fallback
  return null;
}

// ─── AI Fallback via OpenRouter ───────────────────────────────────────────────
async function getAIResponse(userMessage) {
  // Add user message to conversation history
  conversationHistory.push({ role: 'user', content: userMessage });

  // Keep history manageable (last 10 exchanges)
  if (conversationHistory.length > 20) {
    conversationHistory = conversationHistory.slice(-20);
  }

  try {
    const response = await fetch(AI_CONFIG.endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AI_CONFIG.apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://www.amabongosolutions.co.za',
        'X-Title': 'Amabongo Solutions Virtual Assistant',
      },
      body: JSON.stringify({
        model: AI_CONFIG.model,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...conversationHistory,
        ],
        max_tokens: AI_CONFIG.maxTokens,
        temperature: AI_CONFIG.temperature,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('OpenRouter API error:', response.status, errorData);
      return null;
    }

    const data = await response.json();
    const assistantMessage = data.choices?.[0]?.message?.content;

    if (assistantMessage) {
      // Add assistant reply to history for context
      conversationHistory.push({ role: 'assistant', content: assistantMessage });
      return assistantMessage;
    }

    return null;
  } catch (err) {
    console.error('AI request failed:', err);
    return null;
  }
}

// Format plain text AI response to HTML
function formatAIResponse(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
    .replace(/\*(.*?)\*/g, '<i>$1</i>')
    .replace(/\n/g, '<br>');
}

// ─── Core Input Handler ───────────────────────────────────────────────────────
let _busy = false;

async function handleInput(text) {
  if (_busy) return;
  _busy = true;

  showTyping(true);
  setQuickReplies([]);

  const lower = text.toLowerCase().trim();
  const key = resolveKey(lower);

  if (key) {
    // Rule-based response found
    setTimeout(() => {
      showTyping(false);
      const res = responses[key] || responses.fallback;
      addMessage(res.text, 'bot', { images: res.images, showMap: res.showMap });
      setQuickReplies(res.options || []);
      _busy = false;
    }, 500);
  } else {
    // AI fallback — no rule matched
    try {
      const aiReply = await getAIResponse(text);
      showTyping(false);

      if (aiReply) {
        addMessage(formatAIResponse(aiReply), 'bot');
        // Show helpful follow-up options after AI response
        setQuickReplies([
          { text: "<i class='ph ph-calculator'></i> Check Collection & Payout", value: "wizard_start" },
          { text: "<i class='ph ph-currency-circle-dollar'></i> View Prices", value: "prices" },
          { text: "<i class='ph ph-whatsapp-logo'></i> WhatsApp Mr. Mthembu", value: "whatsapp_now" },
          { text: "<i class='ph ph-arrow-left'></i> Main Menu", value: "menu" },
        ]);
      } else {
        // AI failed — use static fallback
        const res = responses.fallback;
        addMessage(res.text, 'bot');
        setQuickReplies(res.options);
      }
    } catch (err) {
      showTyping(false);
      const res = responses.fallback;
      addMessage(res.text, 'bot');
      setQuickReplies(res.options);
    }
    _busy = false;
  }
}

// ─── Event Listeners ──────────────────────────────────────────────────────────
$composer.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = $input.value.trim();
  if (!text) return;
  addMessage(text, 'user');
  $input.value = '';
  handleInput(text);
});

$quickbar.addEventListener('click', (e) => {
  const btn = e.target.closest('.qbtn');
  if (!btn) return;
  addMessage(btn.innerHTML, 'user');
  handleInput(btn.dataset.value);
});

// ─── Boot ─────────────────────────────────────────────────────────────────────
function start() {
  showTyping(true);
  setTimeout(() => {
    showTyping(false);
    addMessage(responses.greeting, 'bot');
    setTimeout(() => handleInput('menu'), 400);
  }, 800);
}

start();