document.addEventListener('DOMContentLoaded', () => {
    const openChatbotBtn = document.getElementById('open-chatbot-btn');
    const chatbotPopup = document.getElementById('chatbot-popup');

    if (!openChatbotBtn || !chatbotPopup) return;

    let chatbotLoaded = false;

    const toggleChatbot = () => {
        const isActive = chatbotPopup.classList.toggle('active');
        const icon = openChatbotBtn.querySelector('i');

        if (icon) {
            if (isActive) {
                icon.classList.remove('fa-robot');
                icon.classList.add('fa-times');
                openChatbotBtn.setAttribute('aria-label', 'Close Virtual Assistant');
                // Prevent background scrolling on mobile when modal sheet is open
                if (window.innerWidth <= 768) {
                    document.body.style.overflow = 'hidden';
                }
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-robot');
                openChatbotBtn.setAttribute('aria-label', 'Open Virtual Assistant');
                document.body.style.overflow = '';
            }
        }
    };

    // Initialize or bind close button
    const setupCloseButton = () => {
        let closeBtn = document.getElementById('close-chatbot-btn');
        if (!closeBtn) {
            closeBtn = chatbotPopup.querySelector('.close-btn');
        }
        if (!closeBtn) {
            closeBtn = document.createElement('button');
            closeBtn.id = 'close-chatbot-btn';
            closeBtn.className = 'close-btn';
            closeBtn.innerHTML = '&times;';
            closeBtn.setAttribute('aria-label', 'Close chat');
            chatbotPopup.appendChild(closeBtn);
        }
        closeBtn.onclick = toggleChatbot;
    };

    const loadChatbot = () => {
        // If chatbot is already loaded, just toggle its visibility
        if (chatbotLoaded) {
            toggleChatbot();
            return;
        }

        try {
            setupCloseButton();

            // Resolve relative path dynamically if on a subdirectory page (e.g. /blog/)
            const path = window.location.pathname.replace(/\\/g, '/');
            const isSubdir = path.includes('/blog/') || path.endsWith('/blog');
            const chatbotSrc = isSubdir ? '../chatbot/index.html' : 'chatbot/index.html';

            const iframe = document.createElement('iframe');
            iframe.src = chatbotSrc;
            iframe.setAttribute('title', 'Amabongo Solutions Virtual Assistant');
            iframe.setAttribute('allow', 'clipboard-write');

            chatbotPopup.appendChild(iframe);
            chatbotLoaded = true;

            setTimeout(toggleChatbot, 80);
        } catch (error) {
            console.error('Error loading chatbot:', error);
            chatbotPopup.innerHTML = '<p style="color:white; padding: 20px;">Sorry, the chat assistant could not be loaded.</p>';
            toggleChatbot();
        }
    };

    // Attach click listener to floating toggler
    openChatbotBtn.addEventListener('click', loadChatbot);

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && chatbotPopup.classList.contains('active')) {
            toggleChatbot();
        }
    });
});