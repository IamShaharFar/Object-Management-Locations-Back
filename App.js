const express = require("express");
const cors = require("cors");
const socket = require('./utils/socket'); 
const http = require('http');
const { Server } = require("socket.io");
const { startUpdateClientLocations, stopCheckingDistances } = require('./utils/objectsIntersector');


const areaRoutes = require('./routes/areasRoutes')
const userssRoute = require('./routes/userssRoute')
const objectsRoute = require('./routes/objectsRoutes')
const authRoutes = require('./routes/authRoutes');
const locationsRoute = require('./routes/locationsRoute');

const app = express();

const server = http.createServer(app);
socket.init(server).then(() => {
  const io = socket.getIO();
  socket.socketIoSetup(server, io);
});

app.use(express.json());
app.use(cors());

app.use('/areas', areaRoutes);
app.use('/users', userssRoute);
app.use('/objects', objectsRoute);
app.use('/auth', authRoutes);
app.use('/locations', locationsRoute);

app.get("/", (req, res) => {
  res.send("<h2>Back is working!</h2>");
});

const objects = [
  { name: "Location 1", lat: 32.0853, lng: 34.7818, userId: "65cc975a848b94b95a1b874e" },
  { name: "Location 2", lat: 32.0873, lng: 34.7828, userId: "65cc975a848b94b95a1b874e"  },
  { name: "Location 3", lat: 32.0833, lng: 34.7798, userId: "65cc975a848b94b95a1b874e"  },
  { name: "Location 4", lat: 32.0863, lng: 34.7848, userId: "65cc975a848b94b95a1b874e"  },
];

const area = {
  centerLat: 32.0853,
  centerLng: 34.7818 ,
  radius: 250, 
};

// startUpdateClientLocations(objects, io);

const port = process.env.PORT || 3000;

// app.listen(port, () => console.log(`Listening on port ${port}`));
server.listen(port, () => console.log(`Listening on port ${port}`));