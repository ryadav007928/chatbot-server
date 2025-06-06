const express = require('express');
const app = express();
const cors = require('cors');

const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);

// Configure CORS for Express
app.use(cors({
  origin: '*', // Replace with your client URL
  credentials: true,              // Allow credentials (cookies, authorization headers, etc.)
  optionsSuccessStatus: 200,      // For legacy browsers support
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'], // Allowed HTTP methods
}));

// Configure CORS for Socket.IO
const io = new Server(server, {
  cors: {
    origin: 'https://chatbot-client-sqdg.onrender.com', // Replace with your client URL
    methods: ['GET', 'POST'],        // Allowed HTTP methods
    credentials: true                // Allow credentials
  }
});
// Handle Socket.IO connections
io.on('connection', (socket) => {
  console.log('A user connected##########');
  console.log(`UserID ${socket.id}`);

  //Handle socket.io disconnection
  socket.on('disconnect', () => {
    console.log(`User ${socket.id} disconnected@@@@@@`);
  });

//Handle to send a welcome message to the all connected users
  socket.emit('Welcome',` '${socket.id} ' Welcome to the chat!`);

  socket.broadcast.emit('NewUser', `A new user has joined the chat: ${socket.id}`);

  //Handle messages from the client
  socket.on('message', (msg) => {
    console.log(`Message from User ${socket.id}: ${msg}`);
     socket.broadcast.emit('message', `User From ${socket.id}: ${msg}`);
   
    
  });

});




app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
