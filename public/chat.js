// Make connection from front end

const socketFE = io.connect(window.location.hostname);

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
    output.innerHTML += `<div class="chat-message"><h3><strong>${
        data.handle
    } - ${timeAndDate()}</strong></h3>
    <p>${data.message}</p>
    </div>`;
});

socketFE.on('typing', data => {
    feedback.innerHTML = `<p><em>${data} is typing a message...</em></p>`;
});

// Add time and date
const timeAndDate = () => {
    let date = new Date();
    let timeOfDay = date.toTimeString().slice(0, 5);
    let dayOfMonth = date.toDateString().slice(0, 11);
    return `${dayOfMonth} @ ${timeOfDay}`;
};
