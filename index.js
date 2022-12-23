const express = require('express');
const socketIo = require('socket.io');
const { createServer } = require('http');


const app = express()
const server = createServer(app)


const io = socketIo(server,{ 
    cors: {
      origin: 'http://localhost:5173'
    }
})


io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('room', ({room})=>{
        socket.join(room)
    });

    socket.on('chat message', ({from, msg, name, room})=>{
        io.to(room).emit('chat message', {from, msg, name, room})
    })
})

server.listen(3000, () => {
    console.log('App listening on port 3000!');
});
