const { Server } = require("socket.io");

const socketIoSetup = (server) => {
  const io = new Server(server);

  io.on('connection', (socket) => {
    console.log('A user connected');

    // Emitting an event every 2 seconds
    const interval = setInterval(() => {
      socket.emit('testEvent', { message: 'This is a test event from the server!' });
      console.log("socket emit");
    }, 2000);

    socket.on('disconnect', () => {
      console.log('A user disconnected');
      clearInterval(interval);
    });
  });
};

module.exports = socketIoSetup;
