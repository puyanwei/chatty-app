// Make connection from front end

const socketFE = io.connect('http://localhost:4000');

// Query the DOM

let message = document.getElementById('message');
let handle = document.getElementById('handle');
let button = document.getElementById('send');
let output = document.getElementById('output');
let feedback = document.getElementById('feedback');

// Emit events

button.addEventListener('click', () => {
    if (message.value !== '' && handle.value !== '') {
        socketFE.emit('chat', {
            message: message.value,
            handle: handle.value
        });
        message.value = '';
    }
});

message.addEventListener('keyup', event => {
    if (event.keyCode === 13) {
        button.click();
    }
});

message.addEventListener('keypress', () => {
    socketFE.emit('typing', handle.value);
});

// Listen for events

socketFE.on('chat', data => {
    feedback.innerHTML = '';
    output.innerHTML += `<p><strong>${data.handle}   </strong>${
        data.message
    }</p>`;
});

socketFE.on('typing', data => {
    feedback.innerHTML = `<p><em>${data} is typing a message...</em></p>`;
});
