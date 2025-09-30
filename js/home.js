/* === js/home.js === */

// --- Active Navigation Link on Scroll (for single-page navigation) ---
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-menu a");

window.addEventListener("scroll", navHighlighter);

function navHighlighter() {
    let scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 150; // Offset for header height + buffer
        let sectionId = current.getAttribute("id");

        const navLink = document.querySelector(".nav-menu a[href*=" + sectionId + "]");

        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                // Remove active class from all links first
                navLinks.forEach(link => link.classList.remove('active-link'));
                // Add active class to the current link
                navLink.classList.add("active-link");
            } else {
                // This 'else' part is important to remove the class when you scroll past the section
                navLink.classList.remove("active-link");
            }
        }
    });

    // Special case for top of page
    if (scrollY < sections[0].offsetTop - 150) {
        navLinks.forEach(link => link.classList.remove('active-link'));
        const homeLink = document.querySelector(".nav-menu a[href='index.html']");
        if(homeLink) homeLink.classList.add("active-link");
    }
}