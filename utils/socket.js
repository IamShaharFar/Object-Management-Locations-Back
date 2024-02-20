// utils/socket.js
const userSocketMap = new Map();

let io;

const init = async (httpServer) => {
  io = require("socket.io")(httpServer, {
    cors: {
      origin: "*", // Client's origin
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
    }
  });
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
const getSocketIdFromUserId = (userId) => {
  console.log("Map contents:", Array.from(userSocketMap.entries()));
  const socketId = userSocketMap.get(userId.toString());
  return socketId;
};

module.exports = { init, getIO,socketIoSetup, getSocketIdFromUserId };
