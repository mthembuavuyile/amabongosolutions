// Elements
    const $messages = document.getElementById('messages');
    const $typing = document.getElementById('typing');
    const $quickbar = document.getElementById('quickbar');
    const $composer = document.getElementById('composer');
    const $input = document.getElementById('input');

    // Content model
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
          { text: "❓ FAQs", value: "faqs" }
        ]
      },

      services: {
        text: "We offer <b>professional recycling services</b> across KwaZulu-Natal:<ul><li>🔄 Glass bottle & jar collection</li><li>⚖️ Sorting and weighing at our depots</li><li>📦 Bulk recycling and processing</li><li>🚚 Reliable commercial pickups</li><li>💵 Instant payment at fair rates</li></ul>",
        options: [
          { text: "📋 Get a Quote", value: "quote" },
          { text: "📸 See Our Work", value: "gallery" },
          { text: "⬅️ Main Menu", value: "menu" }
        ]
      },

      materials: {
        text: "We buy <b>all types of glass bottles and jars</b>:<br><br><b>✓ Clear Glass (Flint):</b><br>Food jars, spirit bottles, water bottles<br><br><b>✓ Brown Glass (Amber):</b><br>Beer bottles, cider bottles, medicine bottles<br><br><b>✓ Green Glass (Emerald):</b><br>Wine bottles, champagne bottles, beer bottles<br><br><b>✓ Blue & Specialty Glass:</b><br>Premium water bottles, decorative glass<br><br>💡 <i>No need to wash or clean — bring them as they are!</i>",
        options: [
          { text: "❌ What We DON'T Accept", value: "not_accepted" },
          { text: "📍 Our Location", value: "contact" },
          { text: "⬅️ Main Menu", value: "menu" }
        ]
      },

      not_accepted: {
        text: "<b>❌ Materials We DON'T Accept:</b><br><br>• Aluminium cans or metal<br>• Plastic bottles or containers<br>• Window glass or mirrors<br>• Pyrex or ovenware<br>• Light bulbs<br>• Ceramics or porcelain<br><br>We <b>ONLY</b> accept glass bottles and jars! 🍾",
        options: [
          { text: "✓ What We Accept", value: "materials" },
          { text: "⬅️ Main Menu", value: "menu" }
        ]
      },

      quote: {
        text: "For a <b>competitive quote</b>, the best way is to contact us directly:<br><br>📞 <b>Call/WhatsApp:</b> <a href='tel:+27648784287' style='color:#60a5fa;'>064 878 4287</a><br>📧 <b>Email:</b> <a href='mailto:info@amabongosolutions.co.za' style='color:#60a5fa;'>info@amabongosolutions.co.za</a><br><br>💵 We offer <b>instant payment</b> at fair market rates!",
        options: [
          { text: "📞 Call Now", value: "call_now" },
          { text: "📧 Send Email", value: "email_now" },
          { text: "⬅️ Main Menu", value: "menu" }
        ]
      },

      contact: {
        text: "📍 <b>Our Location:</b><br>72 C B Downes Rd, Mkondeni<br>Pietermaritzburg, 3201<br><br>⏰ <b>Business Hours:</b><br>Mon–Fri: 08:00–16:30<br>Sat: 08:00–15:00<br>Sun: Closed<br><br>📞 <b>Phone/WhatsApp:</b> 064 878 4287<br>📧 <b>Email:</b> info@amabongosolutions.co.za",
        showMap: true,
        options: [
          { text: "📞 Call Us", value: "call_now" },
          { text: "🗺️ Get Directions", value: "directions" },
          { text: "⬅️ Main Menu", value: "menu" }
        ]
      },

      gallery: {
        text: "📸 <b>Our Operations in Action:</b><br><br>See how we process and recycle glass at our Pietermaritzburg facility!",
        images: [
          { src: "../images/recycling.jpg", alt: "Weighing station at Mkondeni depot" },
          { src: "../images/recycling1.jpg", alt: "Truck with processed glass cullet" },
          { src: "../images/recycling2.jpg", alt: "Sorted glass ready for processing" },
          { src: "../images/recycling3.jpg", alt: "Mixed glass bottles at facility" }
        ],
        options: [
          { text: "🏢 Our Services", value: "services" },
          { text: "⬅️ Main Menu", value: "menu" }
        ]
      },

      faqs: {
        text: "<b>❓ Frequently Asked Questions:</b>",
        options: [
          { text: "Do you accept aluminium?", value: "faq_aluminium" },
          { text: "Do I need to sort glass?", value: "faq_sorting" },
          { text: "How do you pay?", value: "faq_payment" },
          { text: "Do you collect?", value: "faq_collection" },
          { text: "What are your rates?", value: "faq_rates" },
          { text: "⬅️ Main Menu", value: "menu" }
        ]
      },

      faq_aluminium: {
        text: "<b>❌ NO</b> — We do <b>NOT</b> accept aluminium cans or any metal materials.<br><br>We <b>ONLY</b> accept glass bottles and jars (clear, brown, green, blue, etc.).",
        options: [
          { text: "✓ What We Accept", value: "materials" },
          { text: "❓ More FAQs", value: "faqs" },
          { text: "⬅️ Main Menu", value: "menu" }
        ]
      },

      faq_sorting: {
        text: "<b>No need to sort!</b> 🎉<br><br>You can bring mixed glass — we handle all the sorting at our facility. Just remove caps/lids if possible.",
        options: [
          { text: "❓ More FAQs", value: "faqs" },
          { text: "⬅️ Main Menu", value: "menu" }
        ]
      },

      faq_payment: {
        text: "<b>💵 Instant Payment!</b><br><br>We pay immediately after weighing your glass. Payment methods include cash or bank transfer at current market rates.",
        options: [
          { text: "💰 Get a Quote", value: "quote" },
          { text: "❓ More FAQs", value: "faqs" },
          { text: "⬅️ Main Menu", value: "menu" }
        ]
      },

      faq_collection: {
        text: "<b>Yes!</b> We offer collection services for commercial clients with larger quantities.<br><br>📞 Contact us to arrange: <b>064 878 4287</b>",
        options: [
          { text: "📞 Call Now", value: "call_now" },
          { text: "❓ More FAQs", value: "faqs" },
          { text: "⬅️ Main Menu", value: "menu" }
        ]
      },

      faq_rates: {
        text: "Our rates vary based on:<br>• Glass type and color<br>• Quantity<br>• Market conditions<br><br>📞 <b>Contact us for current rates:</b> 064 878 4287",
        options: [
          { text: "💰 Get a Quote", value: "quote" },
          { text: "❓ More FAQs", value: "faqs" },
          { text: "⬅️ Main Menu", value: "menu" }
        ]
      },

      fallback: {
        text: "I'm not sure how to answer that. 🤔<br><br>Try choosing from the main menu options!",
        options: [
          { text: "⬅️ Main Menu", value: "menu" }
        ]
      }
    };

    // Helpers
    const showTyping = (v) => $typing.classList.toggle('hidden', !v);
    const scrollToEnd = () => $messages.scrollTop = $messages.scrollHeight;

    function addMessage(html, role = 'bot', opts = {}) {
      const node = document.createElement('div');
      node.className = `msg ${role}`;
      node.innerHTML = html;

      if (opts.images?.length) {
        const grid = document.createElement('div');
        grid.className = 'image-grid';
        opts.images.forEach(img => {
          const el = document.createElement('img');
          el.src = img.src; el.alt = img.alt; el.loading = 'lazy';
          grid.appendChild(el);
        });
        node.appendChild(grid);
      }

      if (opts.showMap) {
        const map = document.createElement('div');
        map.className = 'map';
        map.innerHTML = `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3463.856985790409!2d30.41235181510848!3d-29.65213608201207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ef6b9d1f3e7b165%3A0x6d9e0b82f1b80f14!2s72%20CB%20Downes%20Rd%2C%20Mkondeni%2C%20Pietermaritzburg%2C%203201!5e0!3m2!1sen!2sza!4v1664455883584!5m2!1sen!2sza" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;
        node.appendChild(map);
      }

      $messages.appendChild(node);
      scrollToEnd();
    }

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

    function handleInput(text) {
      showTyping(true);
      setQuickReplies([]);
      const lower = text.toLowerCase().trim();

      setTimeout(() => {
        showTyping(false);

        let key = 'fallback';
        if (lower.includes("service") || lower === "1") key = "services";
        else if (lower.includes("material") || lower.includes("buy") || lower.includes("accept") || lower === "2") key = "materials";
        else if (lower.includes("aluminium") || lower.includes("aluminum") || lower.includes("metal") || lower.includes("can")) key = "faq_aluminium";
        else if (lower.includes("quote") || lower.includes("price") || lower === "3") key = "quote";
        else if (lower.includes("contact") || lower.includes("address") || lower.includes("location") || lower.includes("hours") || lower === "4") key = "contact";
        else if (lower.includes("gallery") || lower.includes("photo") || lower.includes("picture") || lower === "5") key = "gallery";
        else if (lower.includes("sort")) key = "faq_sorting";
        else if (lower.includes("pay") && !lower.includes("quote")) key = "faq_payment";
        else if (lower.includes("collect") || lower.includes("pickup")) key = "faq_collection";
        else if (lower.includes("rate")) key = "faq_rates";
        else if (lower.includes("faq") || lower.includes("question") || lower === "6") key = "faqs";
        else if (lower.includes("menu") || lower.includes("start") || lower.includes("restart") || lower.includes("main")) key = "mainMenu";
        else if (lower === "call_now") { window.location.href = "tel:+27648784287"; key = "quote"; }
        else if (lower === "email_now") { window.location.href = "mailto:info@amabongosolutions.co.za"; key = "quote"; }
        else if (lower === "directions") {
          window.open("https://www.google.com/maps/dir/?api=1&destination=-29.6492168,30.4160811", "_blank");
          key = "contact";
        }
        else if (lower === "not_accepted") key = "not_accepted";

        const res = responses[key] || responses.fallback;
        addMessage(res.text, 'bot', { images: res.images, showMap: res.showMap });
        setQuickReplies(res.options || []);
      }, 800);
    }

    // Event wiring
    $composer.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = $input.value.trim();
      if (!text) return;
      addMessage(text, 'user');
      $input.value = '';
      handleInput(text);
    });

    $quickbar.addEventListener('click', (e) => {
      if (e.target.closest('.qbtn')) {
        const btn = e.target.closest('.qbtn');
        const value = btn.dataset.value;
        const label = btn.textContent;
        addMessage(label, 'user');
        handleInput(value);
      }
    });

    // Initial flow
    function start() {
      showTyping(true);
      setTimeout(() => {
        showTyping(false);
        addMessage(responses.greeting, 'bot');
        setTimeout(() => handleInput('menu'), 500);
      }, 1000);
    }
    start();

    // Accessibility: send on Enter (without newline)
    $input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        $composer.requestSubmit();
      }
    });