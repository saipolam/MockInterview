const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.interimResults = false;
let currentQuestionIndex = 0;
const questions = [
    "Tell me about yourself.",
    "Why do you want to work here?",
    "What are your strengths and weaknesses?",
    "Where do you see yourself in five years?",
    "Do you have any questions for me?"
];

function startInterview() {
    currentQuestionIndex = 0;
    askNextQuestion();
}

function askNextQuestion() {
    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        displayBotMessage(question);
        const utterance = new SpeechSynthesisUtterance(question);
        window.speechSynthesis.speak(utterance);
        currentQuestionIndex++;
        startListening();
    } else {
        displayBotMessage("The interview is over. Thank you!");
    }
}

function startListening() {
    recognition.start();
}

recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    displayUserMessage(transcript);

    fetch('http://localhost:8080/api/ask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(transcript),
    })
    .then(response => response.text())
    .then(data => {
        
       
        
        askNextQuestion();
    });
}

function displayUserMessage(message) {
    const chatLog = document.getElementById('chat-log');
    const userMessage = document.createElement('div');
    userMessage.textContent = 'You: ' + message;
    chatLog.appendChild(userMessage);
}

function displayBotMessage(message) {
    const chatLog = document.getElementById('chat-log');
    const botMessage = document.createElement('div');
    botMessage.textContent = 'John: ' + message;
    chatLog.appendChild(botMessage);
}
