/* === js/main.js ===
   Shared utilities loaded on every page.
   Hamburger menu is handled by components.js.
*/

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


/*calculate rate*/
function calculatePrice() {
    let weight = parseFloat(document.getElementById("weight").value);
    let unit = document.getElementById("unit").value;
    let rate = parseFloat(document.getElementById("type").value);
    let resultWrapper = document.getElementById("result");
    let resultValue = document.getElementById("result-value");

    if (!weight || weight <= 0) {
        resultWrapper.style.display = "block";
        resultValue.innerText = "Please enter a valid weight.";
        resultValue.style.color = "red";
        return;
    }

    // Convert tons to kg
    if (unit === "ton") {
        weight = weight * 1000;
    }

    let total = weight * rate;

    resultWrapper.style.display = "block";
    resultValue.style.color = ""; // reset color
    resultValue.innerText = `R${total.toFixed(2)}`;
}