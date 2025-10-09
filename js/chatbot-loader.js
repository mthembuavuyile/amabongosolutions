document.addEventListener('DOMContentLoaded', () => {
    const openChatbotBtn = document.getElementById('open-chatbot-btn');
    const chatbotPopup = document.getElementById('chatbot-popup');
    let chatbotLoaded = false;

    const toggleChatbot = () => {
        chatbotPopup.classList.toggle('active');
        const icon = openChatbotBtn.querySelector('i');
        
        if (chatbotPopup.classList.contains('active')) {
            // Change to close icon
            icon.classList.remove('fa-robot');
            icon.classList.add('fa-times');
            openChatbotBtn.setAttribute('aria-label', 'Close AI Chat Assistant');
        } else {
            // Change back to robot icon
            icon.classList.remove('fa-times');
            icon.classList.add('fa-robot');
            openChatbotBtn.setAttribute('aria-label', 'Open AI Chat Assistant');
        }
    };

    const loadChatbot = () => {
        // If chatbot is already loaded, just toggle its visibility
        if (chatbotLoaded) {
            toggleChatbot();
            return;
        }

        // --- Load for the first time ---
        try {
            // 1. Create the close button for the popup
            const closeBtn = document.createElement('button');
            closeBtn.innerHTML = '&times;';
            closeBtn.className = 'close-btn';
            closeBtn.setAttribute('aria-label', 'Close chat');
            closeBtn.onclick = toggleChatbot; // Clicking it closes the popup
            chatbotPopup.appendChild(closeBtn);

            // 2. Create the iframe that will securely contain the chatbot
            const iframe = document.createElement('iframe');
            iframe.src = 'chatbot/bot.html'; // Path to your self-contained chatbot
            iframe.setAttribute('title', 'Amabongo Solutions AI Chat Assistant');
            
            // 3. Append the iframe to the popup container
            chatbotPopup.appendChild(iframe);

            chatbotLoaded = true; // Set flag so we don't load it again

            // Wait a moment before showing the animation
            setTimeout(toggleChatbot, 100);

        } catch (error) {
            console.error('Error loading chatbot:', error);
            chatbotPopup.innerHTML = '<p style="color:white; padding: 20px;">Sorry, the chat assistant could not be loaded.</p>';
            toggleChatbot(); // Show the error message
        }
    };

    // Attach the event listener to the main button
    openChatbotBtn.addEventListener('click', loadChatbot);
});
