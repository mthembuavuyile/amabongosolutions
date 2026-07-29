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
        const intentText = inquiryTypeSelect.options[inquiryTypeSelect.selectedIndex]?.text || inquiryTypeSelect.value;
        const name = document.getElementById('name').value.trim();
        const companyName = companyInput ? companyInput.value.trim() : '';
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const glassType = glassTypeSelect ? glassTypeSelect.value : 'N/A';
        const volume = volumeInput ? volumeInput.value.trim() : '';
        const location = document.getElementById('location') ? document.getElementById('location').value.trim() : '';
        const message = messageInput.value.trim();

        return { entityType, intentText, name, companyName, email, phone, glassType, volume, location, message };
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

        let whatsappMessage = `*NEW WEBSITE TRADE ENQUIRY*%0A` +
                              `----------------------------------%0A` +
                              `*Account Type:* ${encodeURIComponent(data.entityType)}%0A` +
                              `*Purpose:* ${encodeURIComponent(data.intentText)}%0A%0A` +
                              `*Name:* ${encodeURIComponent(data.name)}%0A`;

        if (data.companyName) {
            whatsappMessage += `*Company:* ${encodeURIComponent(data.companyName)}%0A`;
        }

        whatsappMessage += `*Email:* ${encodeURIComponent(data.email)}%0A` +
                          `*Phone:* ${encodeURIComponent(data.phone)}%0A`;

        if (data.location) {
            whatsappMessage += `*Location:* ${encodeURIComponent(data.location)}%0A`;
        }

        if (data.glassType) {
            whatsappMessage += `*Glass Product:* ${encodeURIComponent(data.glassType)}%0A`;
        }

        if (data.volume) {
            whatsappMessage += `*Est. Quantity:* ${encodeURIComponent(data.volume)}%0A`;
        }

        whatsappMessage += `%0A*Message:*%0A${encodeURIComponent(data.message)}`;

        showNotice("Opening WhatsApp with your formatted trade enquiry...");
        const whatsappUrl = `https://wa.me/${whatsappTargetNumber}?text=${whatsappMessage}`;
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
            
            let bodyText = `NEW WEBSITE TRADE ENQUIRY\n` +
                           `----------------------------------\n` +
                           `Account Type: ${data.entityType}\n` +
                           `Purpose: ${data.intentText}\n\n` +
                           `Name: ${data.name}\n`;

            if (data.companyName) {
                bodyText += `Company: ${data.companyName}\n`;
            }

            bodyText += `Email: ${data.email}\n` +
                        `Phone: ${data.phone}\n`;

            if (data.location) {
                bodyText += `Location: ${data.location}\n`;
            }

            if (data.glassType) {
                bodyText += `Glass Product: ${data.glassType}\n`;
            }

            if (data.volume) {
                bodyText += `Est. Quantity: ${data.volume}\n`;
            }

            bodyText += `\nMessage:\n${data.message}`;

            showNotice("Opening your email app with pre-filled enquiry...");
            const mailtoUrl = `mailto:${emailTarget}?subject=${subject}&body=${encodeURIComponent(bodyText)}`;
            window.location.href = mailtoUrl;
        });
    }
});
