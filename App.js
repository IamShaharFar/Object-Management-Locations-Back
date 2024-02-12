const express = require("express");
const cors = require("cors");
const socketIoSetup = require('./utils/socket'); 
const http = require('http');


const areaRoutes = require('./routes/areasRoutes')
const userssRoute = require('./routes/userssRoute')


const app = express();
const server = http.createServer(app);
socketIoSetup(server);

app.use(express.json());
app.use(cors());

app.use('/areas', areaRoutes);
app.use('/users', userssRoute);

app.get("/", (req, res) => {
  res.send("<h2>Back is working!</h2>");
});

const port = process.env.PORT || 3000;

// app.listen(port, () => console.log(`Listening on port ${port}`));
server.listen(port, () => console.log(`Listening on port ${port}`));