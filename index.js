const express = require('express');
const socketIo = require('socket.io');
const { createServer } = require('http');

const port = process.env.PORT || 3000;

const app = express()
const server = createServer(app)


const io = socketIo(server,{ 
    cors: {
      origin: 'https://chatche.vercel.app'
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

server.listen(port, () => {
    console.log('App listening on port 3000!');
});
