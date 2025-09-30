/* === js/main.js === */

// --- Hamburger Menu Toggle ---
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-menu a").forEach(n => n.addEventListener("click", () => {
    // This will close the menu when a link is clicked, useful for single-page nav or changing pages.
    if (hamburger.classList.contains('active')) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }
}));


// --- Scroll-on-reveal Animation ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach((el) => {
    observer.observe(el);
});