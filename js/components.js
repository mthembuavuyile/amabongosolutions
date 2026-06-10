/* === js/components.js ===
   Handles mobile navigation hamburger menu behavior.
   Loaded at the bottom of the body.
*/

(function () {
    'use strict';

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

    // Run immediately (script is loaded synchronously at the bottom of the body)
    initHamburger();

})();
