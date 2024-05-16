function uploadDocument() {
    var fileInput = document.getElementById('file-input');
    var file = fileInput.files[0];
    if (!file) return;

    var formData = new FormData();
    formData.append('file', file);

    fetch('/api/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            alert('Document uploaded successfully.');
        } else {
            alert('Error uploading document.');
        }
    })
    .catch(error => console.error('Error:', error));
}

function sendMessage() {
    var messageInput = document.getElementById('message-input');
    var message = messageInput.value.trim();
    if (message === '') return;

    appendMessage('You', message);

    fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    })
    .then(response => response.text())
    .then(data => {
        appendMessage('Bot', data);
    })
    .catch(error => console.error('Error:', error));

    messageInput.value = '';
}

function appendMessage(sender, message) {
    var messagesDiv = document.getElementById('messages');
    var messageElement = document.createElement('div');
    messageElement.innerHTML = '<strong>' + sender + ':</strong> ' + message;
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}
