document.getElementById('chat-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const inputField = document.getElementById('user-input');
  const userInput = inputField.value;
  if (!userInput) return;

  appendMessage('user', userInput);
  inputField.value = '';

  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: userInput }),
  });

  const data = await response.json();
  appendMessage('bot', data.reply);
});

function appendMessage(sender, message) {
  const chatBox = document.getElementById('chat-box');
  const messageDiv = document.createElement('div');
  messageDiv.className = sender === 'user' ? 'user-message' : 'bot-message';
  messageDiv.textContent = message;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}
