/* === js/components.js ===
   Injects the shared header and footer into every page.
   Must be loaded BEFORE main.js.
   
   Usage in HTML:
     <div id="site-header"></div>
     ... page content ...
     <div id="site-footer"></div>
     <script src="js/components.js"></script>
     <script src="js/main.js"></script>
*/

(function () {
    'use strict';

    // ──────────────────────────────────────
    //  NAV CONFIGURATION (single source)
    // ──────────────────────────────────────
    const NAV_LINKS = [
        { href: 'index.html',    label: 'Home' },
        { href: 'services.html', label: 'Services' },
        { href: 'pricing.html',  label: 'Pricing' },
        { href: 'contact.html',  label: 'Contact' },
    ];

    const CTA = { href: 'tel:+27648784287', label: 'Get a Quote' };

    const FOOTER_NAV = [
        ...NAV_LINKS,
        { href: 'chatbot/index.html', label: 'ChatBot' },
    ];

    // ──────────────────────────────────────
    //  DETECT CURRENT PAGE
    // ──────────────────────────────────────
    function getCurrentPage() {
        let path = decodeURIComponent(window.location.pathname);
        // Strip trailing slash
        if (path.endsWith('/')) path = path.slice(0, -1);
        // Get the filename
        let page = path.substring(path.lastIndexOf('/') + 1);
        // Default to index for empty or root
        if (!page || page === '') page = 'index';
        // Strip .html extension for consistent matching
        return page.replace(/\.html$/i, '').toLowerCase();
    }

    // Helper: strip .html for comparison
    function baseName(href) {
        return href.replace(/\.html$/i, '').toLowerCase();
    }

    // ──────────────────────────────────────
    //  BUILD HEADER HTML
    // ──────────────────────────────────────
    function buildHeader() {
        const currentPage = getCurrentPage();

        const navItems = NAV_LINKS.map(link => {
            const isActive = currentPage === baseName(link.href) ? ' active-link' : '';
            return `<li><a href="${link.href}" class="nav-link${isActive}">${link.label}</a></li>`;
        }).join('\n                ');

        return `
    <header class="header">
        <nav class="container nav-container">
            <a href="index.html" class="logo">AMABONGO <span>SOLUTIONS</span></a>
            <ul class="nav-menu">
                ${navItems}
                <li><a href="${CTA.href}" class="cta-btn">${CTA.label}</a></li>
            </ul>
            <div class="hamburger">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </div>
        </nav>
    </header>`;
    }

    // ──────────────────────────────────────
    //  BUILD FOOTER HTML
    // ──────────────────────────────────────
    function buildFooter() {
        const footerLinks = FOOTER_NAV.map(link =>
            `<a href="${link.href}">${link.label}</a>`
        ).join('\n                    ');

        return `
    <footer class="footer">
        <div class="container">
            <div class="footer-top">
                <div class="footer-brand">
                    <a href="index.html" class="logo">AMABONGO <span>SOLUTIONS</span></a>
                    <p>Your trusted partner for sustainable glass recycling across South Africa.</p>
                </div>
                <nav class="footer-nav">
                    ${footerLinks}
                </nav>
            </div>
            <div class="footer-bottom">
                <div class="footer-info">
                    <p>&copy; ${new Date().getFullYear()} AMABONGO SOLUTIONS. All Rights Reserved. | Enterprise: K2025490106</p>
                </div>
                <div class="dev-credit">
                    Developed by <a href="https://vylex.co.za" target="_blank" rel="noopener noreferrer">Vylex</a>
                </div>
            </div>
        </div>
    </footer>`;
    }

    // ──────────────────────────────────────
    //  INJECT INTO PAGE
    // ──────────────────────────────────────
    function inject() {
        const headerSlot = document.getElementById('site-header');
        const footerSlot = document.getElementById('site-footer');

        if (headerSlot) {
            headerSlot.outerHTML = buildHeader();
        }

        if (footerSlot) {
            footerSlot.outerHTML = buildFooter();
        }

        // Initialise hamburger menu after injection
        initHamburger();
    }

    // ──────────────────────────────────────
    //  HAMBURGER MENU
    // ──────────────────────────────────────
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

    // Run immediately (script is loaded synchronously in <body>)
    inject();

})();
