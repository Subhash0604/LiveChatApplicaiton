const express = require('express');
const app = express();
const { Server } = require('socket.io')
const http = require('http');

const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

io.on('connection', (socket) =>{
    console.log('connected');
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg);
    })
})

server.listen(3000, ()=>{
    console.log("Listening on the port 3000....")
})