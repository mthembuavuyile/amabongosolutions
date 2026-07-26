/**
 * Contact Form WhatsApp Redirection & Interactive Entity/Intent Switcher
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
    function updateIntentUI() {
        const intentKey = inquiryTypeSelect.value;
        const config = placeholders[intentKey] || placeholders.general;

        if (volumeLabel) volumeLabel.textContent = config.volumeLabel;
        if (volumeInput) volumeInput.placeholder = config.volumePlaceholder;
        if (messageInput) messageInput.placeholder = config.messagePlaceholder;
    }

    // Event listeners
    entityRadios.forEach(radio => radio.addEventListener('change', updateEntityType));
    if (inquiryTypeSelect) inquiryTypeSelect.addEventListener('change', updateIntentUI);

    // Initial trigger
    updateEntityType();
    updateIntentUI();

    // Form Submission Handling
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Retrieve field values
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

        // Destination WhatsApp Phone Number (064 878 4287 -> international 27648784287)
        const whatsappTargetNumber = "27648784287";

        // Clean WhatsApp message without character-encoding glitches
        let whatsappMessage = `*NEW WEBSITE TRADE ENQUIRY*%0A` +
                              `----------------------------------%0A` +
                              `*Account Type:* ${encodeURIComponent(entityType)}%0A` +
                              `*Purpose:* ${encodeURIComponent(intentText)}%0A%0A` +
                              `*Name:* ${encodeURIComponent(name)}%0A`;

        if (companyName) {
            whatsappMessage += `*Company:* ${encodeURIComponent(companyName)}%0A`;
        }

        whatsappMessage += `*Email:* ${encodeURIComponent(email)}%0A` +
                          `*Phone:* ${encodeURIComponent(phone)}%0A`;

        if (location) {
            whatsappMessage += `*Location:* ${encodeURIComponent(location)}%0A`;
        }

        if (glassType) {
            whatsappMessage += `*Glass Product:* ${encodeURIComponent(glassType)}%0A`;
        }

        if (volume) {
            whatsappMessage += `*Est. Quantity:* ${encodeURIComponent(volume)}%0A`;
        }

        whatsappMessage += `%0A*Message:*%0A${encodeURIComponent(message)}`;

        // Open WhatsApp URL
        const whatsappUrl = `https://wa.me/${whatsappTargetNumber}?text=${whatsappMessage}`;
        window.open(whatsappUrl, '_blank');
    });
});
