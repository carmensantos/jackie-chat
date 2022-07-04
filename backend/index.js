import { createServer } from 'http';
import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';
import { Users } from './users.js';
import router from './router.js';

const PORT = 5000;
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ["GET", "POST"]
  },
  allowEIO3: true
});

app.use(cors());
app.use(router);

io.on('connect', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = Users.addUser({ id: socket.id, name, room });
    if (error) {
      return callback(error);
    }

    socket.join(user.room);

    socket.emit('message', { user: 'admin', text: `Welcome to chatroom ${user.room}, ${user.name}`});
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} joined the chatroom!` });

    io.to(user.room).emit('roomData', { room: user.room, users: Users.getUsersInRoom(user.room) });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = Users.getUser(socket.id);
    io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
  });

  socket.on('disconnect', () => {
    const user = Users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: Users.getUsersInRoom(user.room)});
    }
  })
});

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));