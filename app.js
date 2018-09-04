const express = require('express');
const socket = require('socket.io');

// App setup
const app = express();

let port = process.env.PORT || 80;

const server = app.listen(port, () => {
    console.log(`listening for requests on port ${port}`);
});

// Static files
app.use(express.static('public'));

// Socket setup backend & pass server
let io = socket(server);

io.on('connection', socket => {
    console.log('made socket connection', socket.id);

    // Handle chat event
    socket.on('chat', data => {
        io.sockets.emit('chat', data);
    });

    socket.on('typing', data => {
        socket.broadcast.emit('typing', data);
    });
});
