// Make connection from front end

const socketFE = io.connect('http://localhost:4000');

// Query the DOM

let message = document.getElementById('message');
let handle = document.getElementById('handle');
let button = document.getElementById('send');
let output = document.getElementById('output');

// Emit events

button.addEventListener('click', () => {
    socketFE.emit('chat', {
        message: message.value,
        handle: handle.value
    });
});

// Listen for events

socketFE.on('chat', data => {
    output.innerHTML += `<p><strong>${data.handle} - </strong>${
        data.message
    }</p>`;
});
