// ─── DOM References ───────────────────────────────────────────────────────────
const $messages = document.getElementById('messages');
const $typing = document.getElementById('typing');
const $quickbar = document.getElementById('quickbar');
const $composer = document.getElementById('composer');
const $input = document.getElementById('input');

// ─── Response Data ────────────────────────────────────────────────────────────
// NOTE: Each key is defined ONCE. Duplicate keys have been merged.
const responses = {
  greeting: "Welcome to <b>Amabongo Solutions</b> — KZN's trusted glass recycling partner! <i class='ph-fill ph-plant'></i><br><br>How can I assist you today?",

  mainMenu: {
    text: "Please choose from the options below:",
    options: [
      { text: "<i class='ph ph-buildings'></i> View Services", value: "services" },
      { text: "<i class='ph ph-recycle'></i> Materials We Buy", value: "materials" },
      { text: "<i class='ph ph-currency-circle-dollar'></i> Get a Quote", value: "quote" },
      { text: "<i class='ph ph-map-pin'></i> Location & Hours", value: "contact" },
      { text: "<i class='ph ph-image'></i> Gallery", value: "gallery" },
      { text: "<i class='ph ph-question'></i> FAQs", value: "faqs" },
    ],
  },

  services: {
    text: "We offer <b>professional recycling services</b> across KwaZulu-Natal:<ul><li><i class='ph ph-arrows-clockwise'></i> Glass bottle & jar collection</li><li><i class='ph ph-scales'></i> Sorting and weighing at our depots</li><li><i class='ph ph-package'></i> Bulk recycling and processing</li><li><i class='ph ph-truck'></i> Reliable commercial pickups</li><li><i class='ph ph-money'></i> Instant payment at fair rates</li></ul>",
    options: [
      { text: "<i class='ph ph-receipt'></i> Get a Quote", value: "quote" },
      { text: "<i class='ph ph-images'></i> See Our Work", value: "gallery" },
      { text: "<i class='ph ph-arrow-left'></i> Main Menu", value: "menu" },
    ],
  },

  materials: {
    text: "We buy <b>all types of glass bottles and jars</b>:<br><br><b><i class='ph ph-check-circle'></i> Clear, Brown, Green & Blue Glass</b><br><br><i class='ph ph-lightbulb'></i> <i>No need to wash or clean — bring them as they are!</i>",
    options: [
      { text: "<i class='ph ph-x-circle'></i> What We DON'T Accept", value: "not_accepted" },
      { text: "<i class='ph ph-map-pin'></i> Our Location", value: "contact" },
      { text: "<i class='ph ph-arrow-left'></i> Main Menu", value: "menu" },
    ],
  },

  not_accepted: {
    text: "<b><i class='ph ph-x-circle'></i> Materials We DON'T Accept:</b><br><br>• Aluminium cans or metal<br>• Plastic bottles or containers<br>• Window glass or mirrors<br>• Light bulbs or ceramics",
    options: [
      { text: "<i class='ph ph-check-circle'></i> What We Accept", value: "materials" },
      { text: "<i class='ph ph-arrow-left'></i> Main Menu", value: "menu" },
    ],
  },

  quote: {
    text: "For a <b>competitive quote</b>, please contact us directly:<br><br><i class='ph ph-phone'></i> <b>Call/WhatsApp:</b><br><a href='tel:+27648784287'>064 878 4287</a> (MR A Mthembu)<br><a href='tel:+27648145432'>064 814 5432</a> (F Mthembu)<br><a href='tel:+27762507239'>076 250 7239</a> (T Shezi)<br><br><i class='ph ph-envelope'></i> <b>Email:</b> <a href='mailto:info@amabongosolutions.co.za'>info@amabongosolutions.co.za</a><br><br><i class='ph ph-money'></i> We offer <b>instant payment</b>!",
    options: [
      { text: "<i class='ph ph-whatsapp-logo'></i> WhatsApp Us", value: "whatsapp_now" },
      { text: "<i class='ph ph-phone-call'></i> Call Now", value: "call_now" },
      { text: "<i class='ph ph-paper-plane-tilt'></i> Send Email", value: "email_now" },
      { text: "<i class='ph ph-arrow-left'></i> Main Menu", value: "menu" },
    ],
  },

  contact: {
    text: "<i class='ph ph-map-pin'></i> <b>Our Location:</b><br>72 C B Downes Rd, Mkondeni<br>Pietermaritzburg, 3201<br><br><i class='ph ph-clock'></i> <b>Business Hours:</b><br>Mon–Fri: 08:00–16:30<br>Sat: 08:00–15:00<br>Sun: Closed",
    showMap: true,
    options: [
      { text: "<i class='ph ph-navigation-arrow'></i> Get Directions", value: "directions" },
      { text: "<i class='ph ph-phone'></i> Call Us", value: "call_now" },
      { text: "<i class='ph ph-arrow-left'></i> Main Menu", value: "menu" },
    ],
  },

  gallery: {
    text: "<i class='ph ph-camera'></i> <b>Our Operations in Action:</b>",
    images: [
      { src: "../images/recycling.jpg", alt: "Weighing station" },
      { src: "../images/recycling1.jpg", alt: "Truck with glass" },
      { src: "../images/recycling2.jpg", alt: "Sorted glass" },
      { src: "../images/recycling3.jpg", alt: "Mixed glass" },
    ],
    options: [
      { text: "<i class='ph ph-buildings'></i> Our Services", value: "services" },
      { text: "<i class='ph ph-arrow-left'></i> Main Menu", value: "menu" },
    ],
  },

  faqs: {
    text: "<b><i class='ph ph-question'></i> Frequently Asked Questions:</b>",
    options: [
      { text: "Do you accept aluminium?", value: "faq_aluminium" },
      { text: "Do I need to sort glass?", value: "faq_sorting" },
      { text: "How do you pay?", value: "faq_payment" },
      { text: "Do you collect?", value: "faq_collection" },
      { text: "Environmental Impact?", value: "faq_environment" },
      { text: "<i class='ph ph-arrow-left'></i> Main Menu", value: "menu" },
    ],
  },

  faq_aluminium: {
    text: "<b><i class='ph ph-x-circle'></i> NO</b> — We do <b>NOT</b> accept aluminium cans or any metal materials. We <b>ONLY</b> accept glass bottles and jars.",
    options: [
      { text: "<i class='ph ph-check-circle'></i> What We Accept", value: "materials" },
      { text: "<i class='ph ph-list-magnifying-glass'></i> More FAQs", value: "faqs" },
    ],
  },

  faq_sorting: {
    text: "<b>No need to sort!</b> <i class='ph ph-party-popper'></i> You can bring mixed glass — we handle all the sorting at our facility.",
    options: [
      { text: "<i class='ph ph-list-magnifying-glass'></i> More FAQs", value: "faqs" },
      { text: "<i class='ph ph-arrow-left'></i> Main Menu", value: "menu" },
    ],
  },

  faq_payment: {
    text: "<b><i class='ph ph-money'></i> Instant Payment!</b> We pay immediately after weighing your glass via cash or bank transfer.",
    options: [
      { text: "<i class='ph ph-currency-circle-dollar'></i> Get a Quote", value: "quote" },
      { text: "<i class='ph ph-list-magnifying-glass'></i> More FAQs", value: "faqs" },
    ],
  },

  faq_collection: {
    text: "<b>Yes, we collect! <i class='ph ph-truck'></i></b><br><br><i class='ph ph-map-pin'></i> <b>In KZN:</b> We collect commercial quantities.<br><i class='ph ph-map-pin'></i> <b>Outside KZN (e.g., Eastern Cape, Johannesburg):</b> We collect strictly from <b>34 tons minimum</b>.<br><br><i class='ph ph-camera'></i> <i>For out-of-province collections, please WhatsApp us images of your glass first!</i><br><br><i class='ph ph-phone'></i> <b>Contact our team:</b><br><a href='tel:+27648784287'>064 878 4287</a> / <a href='tel:+27648145432'>064 814 5432</a> / <a href='tel:+27762507239'>076 250 7239</a>",
    options: [
      { text: "<i class='ph ph-whatsapp-logo'></i> WhatsApp Images", value: "whatsapp_now" },
      { text: "<i class='ph ph-list-magnifying-glass'></i> More FAQs", value: "faqs" },
      { text: "<i class='ph ph-arrow-left'></i> Main Menu", value: "menu" },
    ],
  },

  faq_environment: {
    text: "<b><i class='ph ph-leaf'></i> Why Recycle Glass?</b><br><br>Glass is 100% recyclable and can be recycled endlessly without loss in quality. Recycling just one glass bottle saves enough energy to power a computer for 25 minutes! Thank you for helping us keep KZN clean.",
    options: [
      { text: "<i class='ph ph-buildings'></i> View Services", value: "services" },
      { text: "<i class='ph ph-arrow-left'></i> Main Menu", value: "menu" },
    ],
  },

  fallback: {
    text: "I'm not quite sure how to answer that. Let me help you find the right information. Would you like to:",
    options: [
      { text: "<i class='ph ph-buildings'></i> View our services", value: "services" },
      { text: "<i class='ph ph-currency-circle-dollar'></i> Request a quote", value: "quote" },
      { text: "<i class='ph ph-phone-call'></i> Contact a human", value: "contact" }
    ],
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const showTyping = (v) => $typing.classList.toggle('hidden', !v);
const scrollToEnd = () => { $messages.scrollTop = $messages.scrollHeight; };

// ─── Render a message bubble ──────────────────────────────────────────────────
function addMessage(html, role = 'bot', opts = {}) {
  const node = document.createElement('div');
  node.className = `msg ${role}`;
  node.innerHTML = html;

  if (opts.images?.length) {
    const grid = document.createElement('div');
    grid.className = 'image-grid';
    opts.images.forEach(img => {
      const el = document.createElement('img');
      el.src = img.src;
      el.alt = img.alt;
      el.loading = 'lazy';
      grid.appendChild(el);
    });
    node.appendChild(grid);
  }

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

// ─── Render quick-reply buttons ───────────────────────────────────────────────
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

// ─── Keyword → response key mapping ──────────────────────────────────────────
// FIXED: this logic was duplicated and had orphaned code outside any function.
//        Now lives in one place, with all action values handled.
function resolveKey(lower) {
  // ── Action buttons (exact matches first) ──────────────────────────────────
  if (lower === 'call_now') {
    window.open('tel:+27648784287', '_blank');
    return 'quote';
  }
  if (lower === 'whatsapp_now') {
    window.open('https://wa.me/27648784287', '_blank');
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

  // ── Exact key shortcuts (quick-reply values passed as text) ──────────────
  if (lower === 'not_accepted') return 'not_accepted';
  if (lower === 'faq_aluminium') return 'faq_aluminium';
  if (lower === 'faq_sorting') return 'faq_sorting';
  if (lower === 'faq_payment') return 'faq_payment';
  if (lower === 'faq_collection') return 'faq_collection';

  // ── Keyword matching ──────────────────────────────────────────────────────
  if (lower.includes('hi') || lower.includes('hello') || lower.includes('hey') || lower.includes('start') || lower.includes('menu') || lower.includes('back'))
    return 'mainMenu';
  if (lower.includes('service') || lower.includes('what do you do') || lower.includes('how it works'))
    return 'services';
  if (lower.includes('material') || lower.includes('buy') || lower.includes('accept') || lower.includes('what kind of glass'))
    return 'materials';
  if (lower.includes('aluminium') || lower.includes('aluminum') || lower.includes('can') || lower.includes('metal'))
    return 'faq_aluminium';
  if (lower.includes('plastic') || lower.includes('mirror') || lower.includes('window') || lower.includes('bulb') || lower.includes('ceramic') || lower.includes('don\'t accept') || lower.includes('do not accept'))
    return 'not_accepted';
  if (lower.includes('quote') || lower.includes('price') || lower.includes('rate') || lower.includes('cost') || lower.includes('how much') || lower.includes('sell glass'))
    return 'quote';
  if (lower.includes('contact') || lower.includes('address') || lower.includes('location') || lower.includes('where are you') || lower.includes('find you'))
    return 'contact';
  if (lower.includes('hour') || lower.includes('open') || lower.includes('time'))
    return 'contact';
  if (lower.includes('gallery') || lower.includes('photo') || lower.includes('image') || lower.includes('picture') || lower.includes('see'))
    return 'gallery';
  if (lower.includes('sort') || lower.includes('clean') || lower.includes('wash'))
    return 'faq_sorting';
  if (lower.includes('pay') || lower.includes('cash') || lower.includes('transfer') || lower.includes('money'))
    return 'faq_payment';
  if (
    lower.includes('collect') ||
    lower.includes('pickup') ||
    lower.includes('johannesburg') ||
    lower.includes('gauteng') ||
    lower.includes('eastern cape') ||
    lower.includes('province') ||
    lower.includes('ton') ||
    lower.includes('come to me') ||
    lower.includes('transport')
  ) return 'faq_collection';
  if (lower.includes('environment') || lower.includes('why recycle') || lower.includes('impact') || lower.includes('nature') || lower.includes('planet'))
    return 'faq_environment';
  if (lower.includes('faq') || lower.includes('question') || lower.includes('help') || lower.includes('info'))
    return 'faqs';

  return 'fallback';
}

// ─── Core handler ─────────────────────────────────────────────────────────────
// FIXED: added a busy-guard so rapid input doesn't stack up multiple responses
let _busy = false;

function handleInput(text) {
  if (_busy) return;
  _busy = true;

  showTyping(true);
  setQuickReplies([]);

  const lower = text.toLowerCase().trim();

  setTimeout(() => {
    showTyping(false);

    const key = resolveKey(lower);
    const res = responses[key] || responses.fallback;

    addMessage(res.text, 'bot', { images: res.images, showMap: res.showMap });
    setQuickReplies(res.options || []);

    _busy = false;
  }, 800);
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
    setTimeout(() => handleInput('menu'), 500);
  }, 1000);
}

start();