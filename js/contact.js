/**
 * Contact Form WhatsApp/Email Redirection & Interactive Entity/Intent Switcher
 * Accommodates Companies & Individuals (Sellers and Buyers)
 */

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    const entityRadios = document.querySelectorAll('input[name="entityType"]');
    const companyGroup = document.getElementById('companyGroup');
    const companyInput = document.getElementById('companyName');
    const companyAsterisk = document.getElementById('companyAsterisk');
    const inquiryTypeSelect = document.getElementById('inquiryType');
    const glassTypeSelect = document.getElementById('glassType');
    const volumeInput = document.getElementById('volume');
    const volumeLabel = document.getElementById('volumeLabel');
    const messageInput = document.getElementById('message');
    const presetChips = document.querySelectorAll('.preset-chip');
    const submitEmailBtn = document.getElementById('submitEmailBtn');
    const formNotice = document.getElementById('formNotice');
    const noticeText = document.getElementById('noticeText');

    // Simple, clear, non-intimidating intent placeholders
    const placeholders = {
        sell_glass: {
            volumeLabel: "Est. Quantity / Amount (Optional)",
            volumePlaceholder: "e.g. 5 bags, 2 crates, or est. weight",
            messagePlaceholder: "Tell us about the glass or bottles you wish to sell, whether you need pickup or drop-off..."
        },
        buy_cullet: {
            volumeLabel: "Required Supply Volume (Optional)",
            volumePlaceholder: "e.g. 10 Tons, 500 kg, or regular order",
            messagePlaceholder: "Describe your required glass/cullet specifications and delivery location..."
        },
        commercial_pickup: {
            volumeLabel: "Estimated Waste Volume (Optional)",
            volumePlaceholder: "e.g. 2 wheelie bins or weekly pickup",
            messagePlaceholder: "Tell us about your venue/business location and preferred pickup schedule..."
        },
        general: {
            volumeLabel: "Est. Quantity / Amount (Optional)",
            volumePlaceholder: "e.g. N/A or optional amount",
            messagePlaceholder: "Type your general enquiry, drop-off question, or message here..."
        }
    };

    // Update Company field requirements based on Entity radio selection
    function updateEntityType() {
        const selectedEntity = document.querySelector('input[name="entityType"]:checked')?.value || 'company';
        if (selectedEntity === 'individual') {
            if (companyAsterisk) companyAsterisk.style.display = 'none';
            if (companyInput) {
                companyInput.removeAttribute('required');
                companyInput.placeholder = "Optional for individuals";
            }
        } else {
            if (companyAsterisk) companyAsterisk.style.display = 'inline';
            if (companyInput) {
                companyInput.setAttribute('required', 'required');
                companyInput.placeholder = "e.g. Apex Bottling Corp";
            }
        }
    }

    // Update form placeholders & labels based on selected Purpose / Intent
    function updateIntentUI(intentKey) {
        const key = intentKey || inquiryTypeSelect.value;
        const config = placeholders[key] || placeholders.general;

        if (inquiryTypeSelect && inquiryTypeSelect.value !== key) {
            inquiryTypeSelect.value = key;
        }

        presetChips.forEach(chip => {
            if (chip.getAttribute('data-intent') === key) {
                chip.classList.add('active');
            } else {
                chip.classList.remove('active');
            }
        });

        if (volumeLabel) volumeLabel.textContent = config.volumeLabel;
        if (volumeInput) volumeInput.placeholder = config.volumePlaceholder;
        if (messageInput) messageInput.placeholder = config.messagePlaceholder;
    }

    // Event listeners
    entityRadios.forEach(radio => radio.addEventListener('change', updateEntityType));
    if (inquiryTypeSelect) inquiryTypeSelect.addEventListener('change', (e) => updateIntentUI(e.target.value));

    presetChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const intent = chip.getAttribute('data-intent');
            updateIntentUI(intent);
        });
    });

    // Initial trigger
    updateEntityType();
    updateIntentUI();

    function getFormData() {
        const isIndividual = document.querySelector('input[name="entityType"]:checked')?.value === 'individual';
        const entityType = isIndividual ? 'Individual' : 'Company / Business';
        const intentKey = inquiryTypeSelect ? inquiryTypeSelect.value : 'general';
        const intentText = inquiryTypeSelect.options[inquiryTypeSelect.selectedIndex]?.text || inquiryTypeSelect.value;
        const name = document.getElementById('name').value.trim();
        const companyName = companyInput ? companyInput.value.trim() : '';
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const glassType = glassTypeSelect ? glassTypeSelect.value : '';
        const volume = volumeInput ? volumeInput.value.trim() : '';
        const location = document.getElementById('location') ? document.getElementById('location').value.trim() : '';
        const message = messageInput.value.trim();

        return { entityType, isIndividual, intentKey, intentText, name, companyName, email, phone, glassType, volume, location, message };
    }

    function cleanValue(val) {
        if (!val) return '';
        const str = String(val).trim();
        const lower = str.toLowerCase();
        const invalidPlaceholders = ['n/a', 'na', 'none', 'non', '-', '--', 'no', 'null', 'nil', 'not applicable'];
        if (invalidPlaceholders.includes(lower)) {
            return '';
        }
        return str;
    }

    function generateTradeEnquiryMessage(data, isWhatsApp = true) {
        const wrapBold = (text) => isWhatsApp ? `*${text}*` : text;

        const name = cleanValue(data.name);
        const company = cleanValue(data.companyName);
        const location = cleanValue(data.location);
        const volume = cleanValue(data.volume);
        const phone = cleanValue(data.phone);
        const email = cleanValue(data.email);
        const message = cleanValue(data.message);
        const isIndividual = data.isIndividual;
        const intentKey = data.intentKey || 'general';
        const glassTypeRaw = cleanValue(data.glassType);
        const isGeneralGlass = !glassTypeRaw || glassTypeRaw === 'General Glass / Bottles' || glassTypeRaw.toLowerCase() === 'n/a';
        const glassType = isGeneralGlass ? '' : glassTypeRaw;

        const sections = [];

        // 1. Header
        sections.push(wrapBold('AMABONGO SOLUTIONS - GLASS TRADE ENQUIRY'));

        // 2. Greeting
        let greeting = `Hi, I’m ${wrapBold(name)}`;
        if (company) {
            greeting += ` from ${wrapBold(company)}`;
        }
        greeting += '.';

        // 3. Entity & Purpose
        let purposeText = '';
        if (intentKey === 'sell_glass') {
            const productTerm = glassTypeRaw === 'General Glass / Bottles' ? 'general glass and bottles' : 'glass and bottles';
            purposeText = isIndividual
                ? `I’m an individual looking to sell ${productTerm}.`
                : `We are a business looking to sell ${productTerm}.`;
        } else if (intentKey === 'buy_cullet') {
            purposeText = isIndividual
                ? `I’m an individual looking for a glass and cullet supplier.`
                : `We are a business looking for a glass and cullet supplier.`;
        } else if (intentKey === 'commercial_pickup') {
            purposeText = isIndividual
                ? `I’m an individual looking to schedule a collection.`
                : `We are a business looking to schedule a collection.`;
        } else {
            purposeText = isIndividual
                ? `I’m an individual with a general enquiry regarding glass recycling and drop-off.`
                : `We are a business with a general enquiry regarding glass recycling and drop-off.`;
        }

        // 4. Location, Quantity & Glass
        let detailsText = '';
        const pronoun = isIndividual ? 'I’m' : 'We are';
        const hasText = intentKey === 'buy_cullet' ? 'require approximately' : 'have approximately';
        const suffixText = intentKey === 'buy_cullet' ? '' : (intentKey === 'commercial_pickup' ? ' for collection' : ' available');

        if (location && volume) {
            if (glassType) {
                detailsText = `${pronoun} based in ${wrapBold(location)} and ${hasText} ${wrapBold(volume)} of ${glassType}${suffixText}.`;
            } else {
                detailsText = `${pronoun} based in ${wrapBold(location)} and ${hasText} ${wrapBold(volume)}${suffixText}.`;
            }
        } else if (location && !volume) {
            if (glassType) {
                const concernPronoun = isIndividual ? 'my enquiry concerns' : 'our enquiry concerns';
                detailsText = `${pronoun} based in ${wrapBold(location)} and ${concernPronoun} ${glassType}.`;
            } else {
                detailsText = `${pronoun} based in ${wrapBold(location)}.`;
            }
        } else if (!location && volume) {
            const subject = isIndividual ? 'I' : 'We';
            if (glassType) {
                detailsText = `${subject} ${hasText} ${wrapBold(volume)} of ${glassType}${suffixText}.`;
            } else {
                detailsText = `${subject} ${hasText} ${wrapBold(volume)}${suffixText}.`;
            }
        } else if (glassType) {
            const concernPronoun = isIndividual ? 'My enquiry concerns' : 'Our enquiry concerns';
            detailsText = `${concernPronoun} ${glassType}.`;
        }

        // Assemble intro paragraph
        const introSentences = [greeting, purposeText, detailsText].filter(Boolean);
        sections.push(introSentences.join(' '));

        // 5. Customer's verbatim message
        if (message) {
            sections.push(message);
        }

        // 6. Contact details (phone and email are auto-linked by WhatsApp; omit asterisks to prevent syntax collision)
        if (phone && email) {
            sections.push(`You can contact me on ${phone} or ${email}.`);
        } else if (phone) {
            sections.push(`You can contact me on ${phone}.`);
        } else if (email) {
            sections.push(`You can contact me on ${email}.`);
        }

        return sections.join('\n\n');
    }

    function showNotice(msg) {
        if (!formNotice || !noticeText) return;
        noticeText.textContent = msg;
        formNotice.style.display = 'flex';
        setTimeout(() => {
            formNotice.style.display = 'none';
        }, 4000);
    }

    let lastSubmitTime = 0;

    function isSpamOrThrottled() {
        // Honeypot field check
        const honeypot = document.getElementById('website_hp');
        if (honeypot && honeypot.value.trim() !== '') {
            console.warn('Bot submission blocked via honeypot.');
            return true; // Silence bot submission
        }

        // Rate limit: throttle submissions within 3 seconds
        const now = Date.now();
        if (now - lastSubmitTime < 3000) {
            showNotice("Please wait a moment before sending another request.");
            return true;
        }
        lastSubmitTime = now;
        return false;
    }

    // Submit via WhatsApp
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (isSpamOrThrottled()) return;

        const data = getFormData();
        const whatsappTargetNumber = "27648784287";
        const messageText = generateTradeEnquiryMessage(data, true);

        showNotice("Opening WhatsApp with your formatted trade enquiry...");
        const whatsappUrl = `https://wa.me/${whatsappTargetNumber}?text=${encodeURIComponent(messageText)}`;
        window.open(whatsappUrl, '_blank');
    });

    // Submit via Email (mailto pre-filled)
    if (submitEmailBtn) {
        submitEmailBtn.addEventListener('click', function() {
            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            if (isSpamOrThrottled()) return;

            const data = getFormData();
            const emailTarget = "info@amabongosolutions.co.za";
            const subject = encodeURIComponent(`Trade Enquiry: ${data.intentText} - ${data.name}`);
            const bodyText = generateTradeEnquiryMessage(data, false);

            showNotice("Opening your email app with pre-filled enquiry...");
            const mailtoUrl = `mailto:${emailTarget}?subject=${subject}&body=${encodeURIComponent(bodyText)}`;
            window.location.href = mailtoUrl;
        });
    }
});
