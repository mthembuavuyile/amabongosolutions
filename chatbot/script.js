// ─── DOM References ───────────────────────────────────────────────────────────
const $messages = document.getElementById('messages');
const $typing = document.getElementById('typing');
const $quickbar = document.getElementById('quickbar');
const $composer = document.getElementById('composer');
const $input = document.getElementById('input');

// ─── Response Data ────────────────────────────────────────────────────────────
// NOTE: Each key is defined ONCE. Duplicate keys have been merged.
const responses = {
  greeting: "Welcome to <b>Amabongo Solutions</b> — KZN's trusted glass recycling partner! 🌍♻️<br><br>How can I assist you today?",

  mainMenu: {
    text: "Please choose from the options below:",
    options: [
      { text: "🏢 View Services", value: "services" },
      { text: "🍾 Materials We Buy", value: "materials" },
      { text: "💰 Get a Quote", value: "quote" },
      { text: "📍 Location & Hours", value: "contact" },
      { text: "📸 Gallery", value: "gallery" },
      { text: "❓ FAQs", value: "faqs" },
    ],
  },

  services: {
    text: "We offer <b>professional recycling services</b> across KwaZulu-Natal:<ul><li>🔄 Glass bottle & jar collection</li><li>⚖️ Sorting and weighing at our depots</li><li>📦 Bulk recycling and processing</li><li>🚚 Reliable commercial pickups</li><li>💵 Instant payment at fair rates</li></ul>",
    options: [
      { text: "📋 Get a Quote", value: "quote" },
      { text: "📸 See Our Work", value: "gallery" },
      { text: "⬅️ Main Menu", value: "menu" },
    ],
  },

  materials: {
    text: "We buy <b>all types of glass bottles and jars</b>:<br><br><b>✓ Clear, Brown, Green & Blue Glass</b><br><br>💡 <i>No need to wash or clean — bring them as they are!</i>",
    options: [
      { text: "❌ What We DON'T Accept", value: "not_accepted" },
      { text: "📍 Our Location", value: "contact" },
      { text: "⬅️ Main Menu", value: "menu" },
    ],
  },

  not_accepted: {
    text: "<b>❌ Materials We DON'T Accept:</b><br><br>• Aluminium cans or metal<br>• Plastic bottles or containers<br>• Window glass or mirrors<br>• Light bulbs or ceramics",
    options: [
      { text: "✓ What We Accept", value: "materials" },
      { text: "⬅️ Main Menu", value: "menu" },
    ],
  },

  // FIXED: was defined twice — merged both phone numbers and kept WhatsApp button
  quote: {
    text: "For a <b>competitive quote</b>, please contact us directly:<br><br>📞 <b>Call/WhatsApp:</b><br><a href='tel:+27648784287'>064 878 4287</a><br><a href='tel:+27795589684'>079 558 9684</a><br><br>📧 <b>Email:</b> <a href='mailto:info@amabongosolutions.co.za'>info@amabongosolutions.co.za</a><br><br>💵 We offer <b>instant payment</b>!",
    options: [
      { text: "📲 WhatsApp Us", value: "whatsapp_now" },
      { text: "📞 Call Now", value: "call_now" },
      { text: "📧 Send Email", value: "email_now" },
      { text: "⬅️ Main Menu", value: "menu" },
    ],
  },

  contact: {
    text: "📍 <b>Our Location:</b><br>72 C B Downes Rd, Mkondeni<br>Pietermaritzburg, 3201<br><br>⏰ <b>Business Hours:</b><br>Mon–Fri: 08:00–16:30<br>Sat: 08:00–15:00<br>Sun: Closed",
    showMap: true,
    options: [
      { text: "🗺️ Get Directions", value: "directions" },
      { text: "📞 Call Us", value: "call_now" },
      { text: "⬅️ Main Menu", value: "menu" },
    ],
  },

  gallery: {
    text: "📸 <b>Our Operations in Action:</b>",
    images: [
      { src: "../images/recycling.jpg", alt: "Weighing station" },
      { src: "../images/recycling1.jpg", alt: "Truck with glass" },
      { src: "../images/recycling2.jpg", alt: "Sorted glass" },
      { src: "../images/recycling3.jpg", alt: "Mixed glass" },
    ],
    options: [
      { text: "🏢 Our Services", value: "services" },
      { text: "⬅️ Main Menu", value: "menu" },
    ],
  },

  faqs: {
    text: "<b>❓ Frequently Asked Questions:</b>",
    options: [
      { text: "Do you accept aluminium?", value: "faq_aluminium" },
      { text: "Do I need to sort glass?", value: "faq_sorting" },
      { text: "How do you pay?", value: "faq_payment" },
      { text: "Do you collect?", value: "faq_collection" },
      { text: "⬅️ Main Menu", value: "menu" },
    ],
  },

  faq_aluminium: {
    text: "<b>❌ NO</b> — We do <b>NOT</b> accept aluminium cans or any metal materials. We <b>ONLY</b> accept glass bottles and jars.",
    options: [
      { text: "✓ What We Accept", value: "materials" },
      { text: "❓ More FAQs", value: "faqs" },
    ],
  },

  faq_sorting: {
    text: "<b>No need to sort!</b> 🎉 You can bring mixed glass — we handle all the sorting at our facility.",
    options: [
      { text: "❓ More FAQs", value: "faqs" },
      { text: "⬅️ Main Menu", value: "menu" },
    ],
  },

  faq_payment: {
    text: "<b>💵 Instant Payment!</b> We pay immediately after weighing your glass via cash or bank transfer.",
    options: [
      { text: "💰 Get a Quote", value: "quote" },
      { text: "❓ More FAQs", value: "faqs" },
    ],
  },

  // FIXED: was defined twice — merged the detailed out-of-province info with the WhatsApp button
  faq_collection: {
    text: "<b>Yes, we collect! 🚚</b><br><br>📍 <b>In KZN:</b> We collect commercial quantities.<br>📍 <b>Outside KZN (e.g., Eastern Cape, Johannesburg):</b> We collect strictly from <b>25 tons minimum</b>.<br><br>📸 <i>For out-of-province collections, please WhatsApp us images of your glass first!</i><br><br>📞 <b>Contact our team:</b><br><a href='tel:+27648784287'>064 878 4287</a> or <a href='tel:+27795589684'>079 558 9684</a>",
    options: [
      { text: "📲 WhatsApp Images", value: "whatsapp_now" },
      { text: "❓ More FAQs", value: "faqs" },
      { text: "⬅️ Main Menu", value: "menu" },
    ],
  },

  fallback: {
    text: "I'm not sure how to answer that. 🤔 Try choosing from the main menu options!",
    options: [{ text: "⬅️ Main Menu", value: "menu" }],
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
    b.textContent = opt.text;
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
  if (lower.includes('hi') || lower.includes('hello') || lower.includes('hey'))
    return 'mainMenu';
  if (lower.includes('service'))
    return 'services';
  if (lower.includes('material') || lower.includes('buy') || lower.includes('accept'))
    return 'materials';
  if (lower.includes('aluminium') || lower.includes('aluminum') || lower.includes('can') || lower.includes('metal'))
    return 'faq_aluminium';
  if (lower.includes('plastic') || lower.includes('mirror') || lower.includes('window') || lower.includes('bulb') || lower.includes('ceramic'))
    return 'not_accepted';
  if (lower.includes('quote') || lower.includes('price') || lower.includes('rate') || lower.includes('cost'))
    return 'quote';
  if (lower.includes('contact') || lower.includes('address') || lower.includes('location') || lower.includes('where'))
    return 'contact';
  if (lower.includes('hour') || lower.includes('open') || lower.includes('time'))
    return 'contact';
  if (lower.includes('gallery') || lower.includes('photo') || lower.includes('image') || lower.includes('picture'))
    return 'gallery';
  if (lower.includes('sort'))
    return 'faq_sorting';
  if (lower.includes('pay') || lower.includes('cash') || lower.includes('transfer'))
    return 'faq_payment';
  if (
    lower.includes('collect') ||
    lower.includes('pickup') ||
    lower.includes('johannesburg') ||
    lower.includes('gauteng') ||
    lower.includes('eastern cape') ||
    lower.includes('province') ||
    lower.includes('ton')
  ) return 'faq_collection';
  if (lower.includes('faq') || lower.includes('question'))
    return 'faqs';
  if (lower.includes('menu') || lower.includes('start') || lower.includes('back'))
    return 'mainMenu';

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
  addMessage(btn.textContent, 'user');
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