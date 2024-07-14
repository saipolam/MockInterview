
function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    const chatLog = document.getElementById('chat-log');

    const userMessage = document.createElement('div');
    userMessage.textContent = 'You: ' + userInput;
    chatLog.appendChild(userMessage);

    fetch('/api/ask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInput),
    })
    .then(response => response.text())
    .then(data => {
        const botMessage = document.createElement('div');
        botMessage.textContent = 'Bot: ' + data;
        chatLog.appendChild(botMessage);
    });

    document.getElementById('user-input').value = '';
}
