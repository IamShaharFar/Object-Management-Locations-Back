const geoDistance = require('./geoDistance');
const socket = require('./socket')
const objectModel = require('../models/objectModel');
const Area = require('../models/areaModel');
const { getSocketIdFromUserId } = require('./socket')

let intervalId = null;

exports.startUpdateClientLocations = (objects, io) => {
  if (intervalId !== null) {
    console.log("Already checking distances.");
    return;
  }
  intervalId = setInterval(async () => {
    //fetch tags locations by area id
    //update the new object location in the db
    await lookForCrossedObject(io);
    const objectsByUserId = objects.reduce((acc, obj) => {
      acc[obj.userId] = acc[obj.userId] || [];
      acc[obj.userId].push(obj);
      return acc;
    }, {});

    //send socket io to client with specific user id
    for (const [userId, userObjects] of Object.entries(objectsByUserId)) {
      const socketId = await getSocketIdFromUserId(userId);
      if (socketId) {
        io.to(socketId).emit('userObjects', userObjects);
      }
    }
  }, 5000);
};

lookForCrossedObject = async (io) => {
  try {
    const objects = await objectModel.find({});
    const areas = await Area.find({});

    // Group objects by areaId
    const objectsByAreaId = objects.reduce((acc, obj) => {
      acc[obj.areaId.toString()] = acc[obj.areaId.toString()] || [];
      acc[obj.areaId.toString()].push(obj);
      return acc;
    }, {});

    // Check if objects are far from the center for each area
    for (const area of areas) {
      const areaObjects = objectsByAreaId[area._id.toString()] || [];
      console.log("areaObjects", areaObjects)
      if(areaObjects.length > 0){
        console.log("userId", areaObjects[0].userId)
      }
      const socketId = await getSocketIdFromUserId("65cc975a848b94b95a1b874e")
        console.log("socketId out", socketId)
        const farObjects = geoDistance.checkObjectsFarFromCenter(areaObjects, area);
        if (farObjects.length > 0) {
          //console.log(`Objects far from center in area ${area._id}:`, farObjects);
          if (socketId) {
            io.to(socketId).emit('objectCrossed', farObjects);
          }
        }
    }

  } catch (error) {
    console.error("Error fetching objects or areas:", error);
  }
}

exports.stopCheckingDistances = () => {
  if (intervalId === null) {
    console.log("No distance check in progress.");
    return;
  }

  clearInterval(intervalId);
  intervalId = null;
  console.log("Stopped checking distances.");
};
