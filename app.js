const express = require('express');
const socket = require('socket.io');

// App setup
const app = express();
const server = app.listen(4000, () => {
    console.log('listening for requests on port 4000,');
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
});
