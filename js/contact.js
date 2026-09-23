/**
 * AMABONGO SOLUTIONS - SMART CONTACT & TRADE ENQUIRY GATEKEEPER
 * Handles dynamic distance qualification, logistics triage, payout estimation,
 * and structured WhatsApp / Email message formatting.
 *
 * v2 — Intent-adaptive form: General Enquiry shows minimal fields,
 * Sell Glass / Truck Pickup / Buy Cullet show full trade fields.
 */

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    // DOM Elements
    const entityRadios = document.querySelectorAll('input[name="entityType"]');
    const companyGroup = document.getElementById('companyGroup');
    const companyInput = document.getElementById('companyName');
    const companyLabel = document.getElementById('companyLabel');
    const logisticsRadios = document.querySelectorAll('input[name="logisticsMode"]');
    const modeCardDropoff = document.getElementById('modeCardDropoff');
    const modeCardCollection = document.getElementById('modeCardCollection');
    const presetChips = document.querySelectorAll('.preset-chip');
    const inquiryTypeSelect = document.getElementById('inquiryType');
    const provinceSelect = document.getElementById('province');
    const cityInput = document.getElementById('citySuburb');
    const glassConditionSelect = document.getElementById('glassCondition');
    const volumeInput = document.getElementById('volumeTons');
    const triageAlertBox = document.getElementById('triageAlertBox');
    const payoutEstimatorBox = document.getElementById('payoutEstimatorBox');
    const estimatedPayoutValue = document.getElementById('estimatedPayoutValue');
    const collectionChecklistGroup = document.getElementById('collectionChecklistGroup');
    const ackBags = document.getElementById('ackBags');
    const ackLoading = document.getElementById('ackLoading');
    const ackPhotos = document.getElementById('ackPhotos');
    const submitWhatsappBtn = document.getElementById('submitWhatsappBtn');
    const submitEmailBtn = document.getElementById('submitEmailBtn');
    const formNotice = document.getElementById('formNotice');
    const noticeText = document.getElementById('noticeText');
    const messageInput = document.getElementById('message');
    const messageLabel = document.getElementById('messageLabel');
    const messageGroup = document.getElementById('messageGroup');

    // Intent-adaptive section wrappers
    const tradeSectionFields = document.getElementById('tradeSectionFields');
    const tradeDetailFields = document.getElementById('tradeDetailFields');

    // Trade-specific fields that need required toggled
    const tradeRequiredFields = [provinceSelect, cityInput, volumeInput];

    // Current active intent
    let currentIntent = 'sell_glass';

    function isTradeIntent(intent) {
        return intent === 'sell_glass';
    }

    function isBuyIntent(intent) {
        return intent === 'buy_cullet';
    }

    function isGeneralIntent(intent) {
        return intent === 'general';
    }

    function updateFormForIntent(intent) {
        currentIntent = intent;

        if (isGeneralIntent(intent) || isBuyIntent(intent)) {
            // MINIMAL FORM: hide trade sections
            if (tradeSectionFields) tradeSectionFields.classList.add('hidden');
            if (tradeDetailFields) tradeDetailFields.classList.add('hidden');

            // Remove required from trade-specific fields so they don't block submission
            tradeRequiredFields.forEach(field => {
                if (field) field.removeAttribute('required');
            });

            // Hide payout/triage/checklists
            if (triageAlertBox) triageAlertBox.style.display = 'none';
            if (payoutEstimatorBox) payoutEstimatorBox.style.display = 'none';
            if (collectionChecklistGroup) collectionChecklistGroup.style.display = 'none';
            if (ackBags) ackBags.required = false;
            if (ackLoading) ackLoading.required = false;
            if (ackPhotos) ackPhotos.required = false;

            // Hide company group (no entity selector visible)
            if (companyGroup) companyGroup.style.display = 'none';
            if (companyInput) companyInput.removeAttribute('required');

            // Re-enable submit button in case it was disabled
            if (submitWhatsappBtn) {
                submitWhatsappBtn.disabled = false;
                submitWhatsappBtn.removeAttribute('title');
            }

            // Adapt message field for General Enquiry
            if (isGeneralIntent(intent)) {
                if (messageLabel) messageLabel.textContent = 'Your Question or Message *';
                if (messageInput) {
                    messageInput.placeholder = 'What would you like to know? e.g. Do you buy green bottles? What are your hours?';
                    messageInput.setAttribute('required', 'required');
                    messageInput.rows = 4;
                }
            } else {
                // Buy Cullet
                if (messageLabel) messageLabel.textContent = 'Describe your cullet requirements *';
                if (messageInput) {
                    messageInput.placeholder = 'e.g. We need 80 tonnes of clear flint cullet per month for our furnace. What are your supply terms?';
                    messageInput.setAttribute('required', 'required');
                    messageInput.rows = 4;
                }
            }

        } else {
            // FULL TRADE FORM: show everything
            if (tradeSectionFields) tradeSectionFields.classList.remove('hidden');
            if (tradeDetailFields) tradeDetailFields.classList.remove('hidden');

            // Restore required on trade fields
            tradeRequiredFields.forEach(field => {
                if (field) field.setAttribute('required', 'required');
            });

            // Message back to optional
            if (messageLabel) messageLabel.textContent = 'Additional Notes / Questions (Optional)';
            if (messageInput) {
                messageInput.placeholder = 'Any extra details or questions...';
                messageInput.removeAttribute('required');
                messageInput.rows = 3;
            }

            // Re-run entity type and qualification logic
            updateEntityType();
            evaluateQualificationAndPayout();
        }
    }

    // ─── 1. ENTITY TYPE LOGIC ─────────────────────────────────────────────────
    function updateEntityType() {
        const selectedEntity = document.querySelector('input[name="entityType"]:checked')?.value || 'individual';
        if (selectedEntity === 'company') {
            if (companyGroup) companyGroup.style.display = 'flex';
            if (companyInput) {
                companyInput.setAttribute('required', 'required');
                companyInput.placeholder = "e.g. Apex Bottling Corp";
            }
        } else {
            if (companyGroup) companyGroup.style.display = 'none';
            if (companyInput) {
                companyInput.removeAttribute('required');
                companyInput.value = '';
            }
        }
    }

    entityRadios.forEach(radio => radio.addEventListener('change', updateEntityType));

    // ─── 2. LOGISTICS MODE TOGGLE ─────────────────────────────────────────────
    function getSelectedLogisticsMode() {
        return document.querySelector('input[name="logisticsMode"]:checked')?.value || 'dropoff';
    }

    function updateLogisticsMode(mode) {
        if (mode === 'collection') {
            if (modeCardCollection) modeCardCollection.classList.add('active');
            if (modeCardDropoff) modeCardDropoff.classList.remove('active');
            if (collectionChecklistGroup) collectionChecklistGroup.style.display = 'block';
            if (ackBags) ackBags.required = true;
            if (ackLoading) ackLoading.required = true;
            if (ackPhotos) ackPhotos.required = true;
        } else {
            if (modeCardDropoff) modeCardDropoff.classList.add('active');
            if (modeCardCollection) modeCardCollection.classList.remove('active');
            if (collectionChecklistGroup) collectionChecklistGroup.style.display = 'none';
            if (ackBags) ackBags.required = false;
            if (ackLoading) ackLoading.required = false;
            if (ackPhotos) ackPhotos.required = false;
        }
        evaluateQualificationAndPayout();
    }

    logisticsRadios.forEach(radio => {
        radio.addEventListener('change', (e) => updateLogisticsMode(e.target.value));
    });

    // Fix scroll-jump: intercept label clicks on logistics cards and prevent default
    // The label wrapping the radio causes the browser to focus/scroll to the input
    if (modeCardDropoff) {
        modeCardDropoff.addEventListener('click', (e) => {
            e.preventDefault();
            const radio = modeCardDropoff.querySelector('input[type="radio"]');
            if (radio) {
                radio.checked = true;
                updateLogisticsMode('dropoff');
            }
        });
    }

    if (modeCardCollection) {
        modeCardCollection.addEventListener('click', (e) => {
            e.preventDefault();
            const radio = modeCardCollection.querySelector('input[type="radio"]');
            if (radio) {
                radio.checked = true;
                updateLogisticsMode('collection');
            }
        });
    }

    // ─── 3. PRESET CHIPS INTERACTION ──────────────────────────────────────────
    presetChips.forEach(chip => {
        chip.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent scroll-to-top bug
            presetChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            const intent = chip.getAttribute('data-intent');

            if (inquiryTypeSelect) inquiryTypeSelect.value = intent;

            // Update form visibility based on intent
            updateFormForIntent(intent);

            if (intent === 'sell_glass') {
                // Keep current logistics mode evaluation
                evaluateQualificationAndPayout();
            }
        });
    });

    // ─── 4. DYNAMIC PRE-QUALIFICATION & PAYOUT CALCULATOR ──────────────────────
    function evaluateQualificationAndPayout() {
        // Skip evaluation if form is in minimal mode
        if (isGeneralIntent(currentIntent) || isBuyIntent(currentIntent)) return;

        const mode = getSelectedLogisticsMode();
        const province = provinceSelect ? provinceSelect.value : '';
        const condition = glassConditionSelect ? glassConditionSelect.value : 'crushed';
        const volumeVal = volumeInput ? parseFloat(volumeInput.value) : 0;
        const hasVolume = !isNaN(volumeVal) && volumeVal > 0;

        // Base payout calculation
        let ratePerTonne = condition === 'crushed' ? 600 : 500;
        if (hasVolume && volumeVal >= 40) {
            ratePerTonne = condition === 'crushed' ? 650 : 520; // Bulk bonus rate
        }

        const estimatedPayout = hasVolume ? volumeVal * ratePerTonne : 0;

        // Update Payout Banner
        if (payoutEstimatorBox && estimatedPayoutValue) {
            if (hasVolume) {
                payoutEstimatorBox.style.display = 'flex';
                estimatedPayoutValue.textContent = `R${estimatedPayout.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            } else {
                payoutEstimatorBox.style.display = 'none';
            }
        }

        // Triage Alert Logic
        if (!triageAlertBox) return;

        // Reset submit button state
        if (submitWhatsappBtn) {
            submitWhatsappBtn.disabled = false;
            submitWhatsappBtn.removeAttribute('title');
        }

        if (mode === 'dropoff') {
            triageAlertBox.style.display = 'block';
            triageAlertBox.className = 'triage-alert triage-alert-info';
            triageAlertBox.innerHTML = `
                <h4><i class="fas fa-warehouse text-success"></i> Depot Self-Delivery (Mkondeni, PMB)</h4>
                You are welcome to deliver any quantity (walk-ins, trailers, bakkies, or trucks) directly to our Mkondeni depot.
                Scale weighing and payment settlement are completed <strong>immediately on site upon delivery</strong>!
            `;
            return;
        }

        // Mode is Truck Collection
        if (!province) {
            triageAlertBox.style.display = 'block';
            triageAlertBox.className = 'triage-alert triage-alert-info';
            triageAlertBox.innerHTML = `
                <h4><i class="fas fa-location-dot text-primary"></i> Select Your Province</h4>
                Please select your province above to verify truck collection feasibility and minimum tonnage thresholds.
            `;
            return;
        }

        const isOutsideKZN = province !== 'KwaZulu-Natal';

        if (isOutsideKZN) {
            const minOutKZN = 34;
            if (hasVolume && volumeVal < minOutKZN) {
                // UNVIABLE OUT-OF-PROVINCE LOAD
                const diff = (minOutKZN - volumeVal).toFixed(1);
                triageAlertBox.style.display = 'block';
                triageAlertBox.className = 'triage-alert triage-alert-warning';
                triageAlertBox.innerHTML = `
                    <h4><i class="fas fa-triangle-exclamation"></i> Collection Not Commercially Viable (${volumeVal} tonnes in ${province})</h4>
                    Due to diesel and long-haul freight costs from Pietermaritzburg (5+ hours drive), our collection trucks strictly require a <strong>minimum load of 34 tonnes</strong> (34x 1-tonne bulk bags).
                    <br><br>
                    <strong>Recommended Options:</strong>
                    <ul style="margin: 0.5rem 0 0.25rem 1.25rem; font-size: 0.85rem;">
                        <li><strong>Keep Collecting:</strong> Gather ${diff} more tonnes to reach 34t (at R600/t crushed = <strong>R20,400 guaranteed payout</strong>).</li>
                        <li><strong>Depot Drop-off:</strong> If you have private transport, drop off any quantity at our Mkondeni depot in PMB.</li>
                        <li><strong>Local Referral:</strong> Sell to a local glass recycling depot in ${province} (e.g. Johannesburg / regional aggregators).</li>
                    </ul>
                `;
                // Disable WhatsApp button to prevent dead-end spam chats
                if (submitWhatsappBtn) {
                    submitWhatsappBtn.disabled = true;
                    submitWhatsappBtn.title = "Collection is unviable for under 34 tonnes outside KZN. Switch to Depot Drop-off or increase volume.";
                }
            } else if (hasVolume && volumeVal >= minOutKZN) {
                // QUALIFYING OUT-OF-PROVINCE BULK LOAD
                triageAlertBox.style.display = 'block';
                triageAlertBox.className = 'triage-alert triage-alert-success';
                triageAlertBox.innerHTML = `
                    <h4><i class="fas fa-check-circle"></i> Qualifying Commercial Bulk Load (${volumeVal} Tonnes)</h4>
                    Your volume meets our 34-tonne long-distance collection threshold for ${province}!
                    Estimated Payout: <strong>R${estimatedPayout.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}</strong>.
                    <br><small>Please ensure all 3 readiness checkboxes below are confirmed before submitting.</small>
                `;
            } else {
                // Province selected, waiting for volume
                triageAlertBox.style.display = 'block';
                triageAlertBox.className = 'triage-alert triage-alert-warning';
                triageAlertBox.innerHTML = `
                    <h4><i class="fas fa-circle-info"></i> Long-Distance Threshold for ${province}</h4>
                    For collection in ${province}, our trucks require a <strong>strict minimum of 34 metric tonnes</strong> (34 bulk bags) to cover diesel and toll expenses.
                `;
            }
        } else {
            // Inside KwaZulu-Natal
            if (hasVolume && volumeVal < 20) {
                triageAlertBox.style.display = 'block';
                triageAlertBox.className = 'triage-alert triage-alert-info';
                triageAlertBox.innerHTML = `
                    <h4><i class="fas fa-info-circle"></i> Regional KZN Collection Review (${volumeVal} Tonnes)</h4>
                    Standard KZN truck collections require <strong>20 metric tonnes</strong>. Smaller loads are evaluated on a case-by-case basis (a transport/diesel contribution may apply), or you can drop off directly at Mkondeni for full payout without deductions.
                `;
            } else if (hasVolume && volumeVal >= 20) {
                triageAlertBox.style.display = 'block';
                triageAlertBox.className = 'triage-alert triage-alert-success';
                triageAlertBox.innerHTML = `
                    <h4><i class="fas fa-check-circle"></i> Qualifying KZN Commercial Load (${volumeVal} Tonnes)</h4>
                    Meets KZN collection threshold! Estimated Payout: <strong>R${estimatedPayout.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}</strong>.
                `;
            } else {
                triageAlertBox.style.display = 'block';
                triageAlertBox.className = 'triage-alert triage-alert-info';
                triageAlertBox.innerHTML = `
                    <h4><i class="fas fa-truck text-primary"></i> KZN Collection Logistics</h4>
                    Local PMB & surrounds (< 1–2 hours): 20 tonnes standard minimum. Far distances in KZN (e.g. Jozini/Zululand): 34 tonnes minimum.
                `;
            }
        }
    }

    // Attach listeners for live evaluation
    if (provinceSelect) provinceSelect.addEventListener('change', evaluateQualificationAndPayout);
    if (glassConditionSelect) glassConditionSelect.addEventListener('change', evaluateQualificationAndPayout);
    if (volumeInput) volumeInput.addEventListener('input', evaluateQualificationAndPayout);

    // Initial evaluation
    updateEntityType();
    evaluateQualificationAndPayout();

    // ─── 5. DATA EXTRACTION & WHATSAPP FORMATTING ─────────────────────────────
    function getFormData() {
        const isIndividual = document.querySelector('input[name="entityType"]:checked')?.value === 'individual';
        const entityType = isIndividual ? 'Individual' : 'Business';
        const mode = getSelectedLogisticsMode();
        const modeText = mode === 'collection' ? 'Truck Collection Request' : 'Depot Self-Delivery (Mkondeni, PMB)';
        const name = document.getElementById('name').value.trim();
        const companyName = companyInput ? companyInput.value.trim() : '';
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const province = provinceSelect ? provinceSelect.value.trim() : '';
        const citySuburb = cityInput ? cityInput.value.trim() : '';
        const condition = glassConditionSelect ? glassConditionSelect.value : 'crushed';
        const conditionText = condition === 'crushed' ? 'Crushed Cullet (R600/t)' : 'Whole / Uncrushed Bottles (R500/t)';
        const volumeVal = volumeInput ? parseFloat(volumeInput.value) : 0;
        const rate = condition === 'crushed' ? (volumeVal >= 40 ? 650 : 600) : (volumeVal >= 40 ? 520 : 500);
        const payout = volumeVal > 0 ? (volumeVal * rate).toLocaleString('en-ZA', { minimumFractionDigits: 2 }) : 'TBD';
        const userMessage = messageInput ? messageInput.value.trim() : '';

        return {
            isIndividual,
            entityType,
            mode,
            modeText,
            name,
            companyName,
            phone,
            email,
            province,
            citySuburb,
            conditionText,
            volumeVal,
            payout,
            userMessage
        };
    }

    function generateTradeEnquiryMessage(data, isWhatsApp = true) {
        const wrapBold = (text) => isWhatsApp ? `*${text}*` : text;

        const lines = [];
        lines.push(`Hi Amabongo Solutions, I would like to sell glass.`);
        lines.push('');
        
        let fromLine = `My name is ${wrapBold(data.name)}`;
        if (!data.isIndividual && data.companyName) {
            fromLine += ` from ${wrapBold(data.companyName)}`;
        }
        lines.push(fromLine + '.');
        
        lines.push(`I am located in ${wrapBold(data.citySuburb)}, ${wrapBold(data.province)}.`);
        lines.push('');
        
        lines.push(`I have approx. ${wrapBold(data.volumeVal + ' Tonnes')} of ${data.conditionText.split('(')[0].trim()}.`);
        lines.push(`Preferred method: ${wrapBold(data.modeText)}.`);
        
        if (data.mode === 'collection') {
            lines.push('');
            lines.push('I confirm:');
            lines.push('✅ Packed in 1-Tonne Bulk Bags');
            lines.push('✅ Manual Loading Helpers Ready');
        }

        if (data.userMessage) {
            lines.push('');
            lines.push(`Notes: ${data.userMessage}`);
        }

        return lines.join('\n');
    }

    function generateSimpleEnquiryMessage(data, isWhatsApp = true) {
        const wrapBold = (text) => isWhatsApp ? `*${text}*` : text;
        const intentLabel = currentIntent === 'buy_cullet' ? 'CULLET PURCHASE ENQUIRY' : 'GENERAL ENQUIRY';

        const lines = [];
        lines.push(wrapBold(`AMABONGO SOLUTIONS - ${intentLabel}`));
        lines.push('──────────────────────────────────');
        lines.push(`From: ${wrapBold(data.name)}`);
        lines.push(`Phone: ${data.phone}`);
        if (data.email) lines.push(`Email: ${data.email}`);
        lines.push('──────────────────────────────────');
        if (data.userMessage) {
            lines.push(`Message: ${data.userMessage}`);
        }
        lines.push('──────────────────────────────────');
        lines.push(`Sent via amabongosolutions.co.za contact form`);

        return lines.join('\n');
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
        const honeypot = document.getElementById('website_hp');
        if (honeypot && honeypot.value.trim() !== '') {
            return true;
        }
        const now = Date.now();
        if (now - lastSubmitTime < 3000) {
            showNotice("Please wait a moment before sending another request.");
            return true;
        }
        lastSubmitTime = now;
        return false;
    }

    // ─── 6. FORM SUBMISSION ───────────────────────────────────────────────────
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const isMinimalMode = isGeneralIntent(currentIntent) || isBuyIntent(currentIntent);

        if (!isMinimalMode) {
            const mode = getSelectedLogisticsMode();
            const province = provinceSelect ? provinceSelect.value : '';
            const volumeVal = volumeInput ? parseFloat(volumeInput.value) : 0;

            // Block unviable long-distance collection
            if (mode === 'collection' && province !== 'KwaZulu-Natal' && volumeVal < 34) {
                alert(`Collection in ${province} requires a minimum load of 34 tonnes due to diesel and transport costs from Pietermaritzburg. You entered ${volumeVal} tonnes.\n\nPlease deliver to our Mkondeni depot or reach 34 tonnes before requesting truck collection.`);
                return;
            }

            // Check required checklist confirmations for collection
            if (mode === 'collection') {
                if (!ackBags?.checked || !ackLoading?.checked || !ackPhotos?.checked) {
                    alert("Please check all 3 Collection Readiness boxes to confirm you have 1-tonne bulk bags and manual loading helpers available.");
                    return;
                }
            }
        }

        if (isSpamOrThrottled()) return;

        const data = getFormData();
        const whatsappTargetNumber = "27648784287";
        const messageText = isMinimalMode
            ? generateSimpleEnquiryMessage(data, true)
            : generateTradeEnquiryMessage(data, true);

        showNotice("Opening WhatsApp with your enquiry...");
        const whatsappUrl = `https://wa.me/${whatsappTargetNumber}?text=${encodeURIComponent(messageText)}`;
        window.open(whatsappUrl, '_blank');
    });

    if (submitEmailBtn) {
        submitEmailBtn.addEventListener('click', function() {
            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            const isMinimalMode = isGeneralIntent(currentIntent) || isBuyIntent(currentIntent);

            if (!isMinimalMode) {
                const mode = getSelectedLogisticsMode();
                const province = provinceSelect ? provinceSelect.value : '';
                const volumeVal = volumeInput ? parseFloat(volumeInput.value) : 0;

                if (mode === 'collection' && province !== 'KwaZulu-Natal' && volumeVal < 34) {
                    alert(`Collection in ${province} requires a minimum of 34 tonnes due to diesel costs. Please switch to Depot Drop-off or reach 34 tonnes.`);
                    return;
                }

                if (mode === 'collection') {
                    if (!ackBags?.checked || !ackLoading?.checked || !ackPhotos?.checked) {
                        alert("Please check all 3 Collection Readiness boxes before sending.");
                        return;
                    }
                }
            }

            if (isSpamOrThrottled()) return;

            const data = getFormData();
            const emailTarget = "info@amabongosolutions.co.za";

            let subject, bodyText;
            if (isMinimalMode) {
                const intentLabel = currentIntent === 'buy_cullet' ? 'Cullet Purchase Enquiry' : 'General Enquiry';
                subject = encodeURIComponent(`${intentLabel} - ${data.name}`);
                bodyText = generateSimpleEnquiryMessage(data, false);
            } else {
                subject = encodeURIComponent(`Trade Enquiry: ${data.modeText} - ${data.name} (${data.volumeVal}t in ${data.province})`);
                bodyText = generateTradeEnquiryMessage(data, false);
            }

            showNotice("Opening your email client with your enquiry...");
            const mailtoUrl = `mailto:${emailTarget}?subject=${subject}&body=${encodeURIComponent(bodyText)}`;
            window.location.href = mailtoUrl;
        });
    }
});
