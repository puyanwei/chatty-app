let express = require('express');
let socket = require('socket.io');

// Server setup

let app = express();
let server = app.listen(4000, () => {
    console.log('listening to requests on port 4000');
});

// Static files
app.use(express.static('public'));

// Socket setup. Listens in the server or the browser for to make a websocket connection

let io = socket(server);

io.on('connection', socket => {
    console.log('make socket connection');
});
