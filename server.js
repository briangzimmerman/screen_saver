const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const ipstack = require(__dirname+'/modules/api/ipstack');

var lat = null;
var lon = null;

//------------------------------------------------------------------------------

app.use(express.static(`${__dirname}/public`));

server.listen(4444, () => {
    console.log('Listening on port 4444...');
});

ipstack.getLocation()
.then((location) => {
    lat = location.latitude;
    lon = location.longitude;

    io.emit('location', {lat, lon});
});

//------------------------------------------------------------------------------
//Socket.io

io.on('connection', (socket) => {
    console.log('User connected');

    socket.emit('location', {lat, lon});
});