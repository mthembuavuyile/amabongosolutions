/**
 * Contact Form WhatsApp Redirection
 * Handles the contact form submission and redirects to WhatsApp with a pre-filled message.
 */

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;

            // WhatsApp details
            const phoneNumber = "27648784287"; // International format for 064 878 4287
            
            // Construct the message
            // Uses *bold* for WhatsApp formatting
            const text = `*New Website Inquiry*%0A%0A` +
                         `*Name:* ${encodeURIComponent(name)}%0A` +
                         `*Email:* ${encodeURIComponent(email)}%0A` +
                         `*Phone:* ${encodeURIComponent(phone)}%0A%0A` +
                         `*Message:*%0A${encodeURIComponent(message)}`;

            // Create WhatsApp URL
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${text}`;

            // Open in new tab
            window.open(whatsappUrl, '_blank');

            // Optional: Provide feedback to the user
            // alert('Redirecting to WhatsApp...');
        });
    }
});
