// utils/socket.js
const userSocketMap = new Map();

let io;

const init = async (httpServer) => {
  io = require("socket.io")(httpServer);
  return io;
}
const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
}


const socketIoSetup = (server) => {
  io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId) {
      userSocketMap.set(userId, socket.id);
      console.log(`User ${userId} connected with socket ID ${socket.id}`);
    }

    socket.on('disconnect', () => {
      if (userId) {
        userSocketMap.delete(userId);
        console.log(`User ${userId} disconnected`);
      }
    });
  });
};

// Function to get socket ID from user ID
const getSocketIdFromUserId = async (userId) => {
  const socketId = await userSocketMap.get(userId);
  //console.log("socketId in", socketId)
  return socketId;
};

module.exports = { init, getIO,socketIoSetup, getSocketIdFromUserId };
