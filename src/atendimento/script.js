// Chat functionality
const chatForm = document.getElementById('chatForm');
const messageInput = document.getElementById('messageInput');
const chatMessages = document.getElementById('chatMessages');

chatForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const message = messageInput.value.trim();
    if (message) {
        // Add user message to chat
        addMessageToChat('Você', message);
        
        // Simulate sending to support (you'll need to implement actual backend integration)
        setTimeout(() => {
            addMessageToChat('Suporte', 'Recebemos sua mensagem! Em breve um de nossos atendentes entrará em contato.');
        }, 1000);
        
        // Clear input
        messageInput.value = '';
    }
});

function addMessageToChat(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'mb-4';
    messageElement.innerHTML = `
        <div class="font-bold ${sender === 'Você' ? 'text-blue-600' : 'text-green-600'}">${sender}:</div>
        <div class="bg-white p-2 rounded-lg shadow-sm">${message}</div>
    `;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// FAQ functionality
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const isHidden = answer.classList.contains('hidden');
        
        // Hide all answers first
        document.querySelectorAll('.faq-answer').forEach(a => {
            a.classList.add('hidden');
        });
        
        // Show clicked answer if it was hidden
        if (isHidden) {
            answer.classList.remove('hidden');
        }
    });
});
