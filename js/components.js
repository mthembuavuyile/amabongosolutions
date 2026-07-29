/* === js/components.js ===
   Handles single-source header injection and mobile navigation hamburger menu behavior.
*/

(function () {
    'use strict';

    function renderHeader() {
        const headerContainer = document.getElementById('main-header') || document.querySelector('header.header');
        if (!headerContainer) return;

        // Determine current page filename for active link highlighting
        const path = window.location.pathname;
        const page = path.split('/').pop() || 'index.html';

        const isHome = page === '' || page === 'index.html';
        const isServices = page === 'services.html';
        const isPricing = page === 'pricing.html';
        const isContact = page === 'contact.html';

        headerContainer.innerHTML = `
        <nav class="container nav-container">
            <a href="index.html" class="logo">
                <img src="images/amabongo-transparent-logo.png" alt="Amabongo Glass Recycling Logo" class="header-logo-img">
                <span class="logo-text">
                    <span class="brand-name">AMABONGO SOLUTIONS</span>
                    <span class="brand-tag">GLASS RECYCLING</span>
                </span>
            </a>
            <ul class="nav-menu">
                <li><a href="index.html" class="nav-link ${isHome ? 'active-link' : ''}">Home</a></li>
                <li><a href="services.html" class="nav-link ${isServices ? 'active-link' : ''}">Services</a></li>
                <li><a href="index.html#industries" class="nav-link">Industries Served</a></li>
                <li><a href="pricing.html" class="nav-link ${isPricing ? 'active-link' : ''}">Pricing</a></li>
                <li><a href="contact.html" class="nav-link ${isContact ? 'active-link' : ''}">Contact</a></li>
                <li><a href="contact.html#rfq" class="cta-btn">Request Quote (RFQ)</a></li>
            </ul>
            <div class="hamburger">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </div>
        </nav>
        `;
    }

    function renderFooter() {
        const footerContainer = document.getElementById('main-footer') || document.querySelector('footer.footer');
        if (!footerContainer) return;

        footerContainer.innerHTML = `
        <div class="container">
            <div class="footer-grid">
                <!-- Column 1: Brand Info -->
                <div class="footer-col footer-brand">
                    <a href="index.html" class="logo">
                        <img src="images/amabongo-transparent-logo.png" alt="Amabongo Glass Recycling Logo" class="header-logo-img footer-logo-img">
                        <span class="logo-text">
                            <span class="brand-name">AMABONGO SOLUTIONS</span>
                            <span class="brand-tag">GLASS RECYCLING</span>
                        </span>
                    </a>
                    <p>South Africa's premier Level 1 B-BBEE industrial glass cullet supplier & commercial glass recycling partner — turning waste glass into instant cash.</p>
                </div>

                <!-- Column 2: Quick Links -->
                <div class="footer-col footer-links-col">
                    <h4 class="footer-heading">Quick Links</h4>
                    <ul class="footer-links">
                        <li><a href="index.html">Home</a></li>
                        <li><a href="services.html">Services</a></li>
                        <li><a href="pricing.html">Pricing</a></li>
                        <li><a href="contact.html">Contact</a></li>
                        <li><a href="privacy-policy.html">Privacy Policy</a></li>
                        <li><a href="terms.html">Terms & Conditions</a></li>
                    </ul>
                </div>

                <!-- Column 3: Downloads & Resources -->
                <div class="footer-col footer-downloads-col">
                    <h4 class="footer-heading">Downloads & Resources</h4>
                    <div class="footer-downloads-list">
                        <a href="contact.html" class="footer-download-item">
                            <i class="fas fa-file-pdf"></i>
                            <div>
                                <strong>Company Profile</strong>
                                <span>Credentials & Capabilities</span>
                            </div>
                        </a>
                        <a href="contact.html#rfq" class="footer-download-item">
                            <i class="fas fa-clipboard-check"></i>
                            <div>
                                <strong>Vendor Onboarding</strong>
                                <span>Supplier Registration</span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>

            <!-- Divider Line -->
            <hr class="footer-divider">

            <!-- Bottom Legal & Dev Credit (Centered) -->
            <div class="footer-bottom">
                <div class="footer-info">
                    <p>&copy; 2026 AMABONGO SOLUTIONS t/a AMABONGO GLASS RECYCLING. Enterprise: K2025490106/07. All Rights Reserved.</p>
                    <p class="footer-legal-links">
                        <a href="privacy-policy.html">Privacy Policy</a> &bull; <a href="terms.html">Terms & Conditions</a>
                    </p>
                </div>
                <div class="dev-credit">
                    Developed by <a href="https://vylex.co.za" target="_blank" rel="noopener noreferrer">Vylex</a>
                </div>
            </div>
        </div>
        `;
    }

    function initHamburger() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        if (!hamburger || !navMenu) return;

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                if (hamburger.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        });
    }

    function init() {
        renderHeader();
        renderFooter();
        initHamburger();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

