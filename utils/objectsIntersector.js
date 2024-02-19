const geoDistance = require('./geoDistance');
const socket = require('./socket')
const objectModel = require('../models/objectModel');
const Area = require('../models/areaModel');
const User = require('../models/userModel');
const { getSocketIdFromUserId } = require('./socket')
const { sendWhatsApp } = require('./messagingUtility')
const axios = require('axios')

let intervalId = null;

exports.startUpdateClientLocations = (objects, io) => {
  if (intervalId !== null) {
    console.log("Already checking distances.");
    return;
  }
  axios.get(`${process.env.MOCK_API_URL}/api/mocActivator/start`);
  intervalId = setInterval(async () => {
    //fetch tags locations by area id
    //update the new object location in the db
    await fetchAndUpdateObjects();
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

const lookForCrossedObject = async (io) => {
  try {
    const objects = await objectModel.find({});
    const areas = await Area.find({});
    const now = new Date();
    const fourHoursAgo = new Date(now.getTime() - 4 * 60 * 60000);

    // Group objects by areaId
    const objectsByAreaId = objects.reduce((acc, obj) => {
      acc[obj.areaId.toString()] = acc[obj.areaId.toString()] || [];
      acc[obj.areaId.toString()].push(obj);
      return acc;
    }, {});

    // Check if objects are far from the center for each area
    for (const area of areas) {
      console.log("area", area.name)
      const areaObjects = objectsByAreaId[area._id.toString()] || [];
      const socketId = await getSocketIdFromUserId("65cc975a848b94b95a1b874e")
      const farObjects = geoDistance.checkObjectsFarFromCenter(areaObjects, area);
      const shouldNotify = farObjects.filter(obj =>
        !obj.lastNotifiedAt || obj.lastNotifiedAt < fourHoursAgo
      );
      if (shouldNotify.length > 0) {
        console.log("shouldNotify", shouldNotify)
        const user = await User.findById(shouldNotify[0].userId)
        const areaName = area.name;
        let message = `🚨 **Important Alert** 🚨\n\nHi ${user.name}, we\'ve detected some of your objects have moved outside their allowed area "${areaName}":\n`;
        shouldNotify.forEach(obj => {
          message += `\n- **Object**: ${obj.description}\n`;
        });
        message += '\nPlease check and take necessary action. Contact us for help or questions.\n\nThank you!';
        sendWhatsApp(area.contactNumber, message);

        shouldNotify.forEach(async obj => {
          await objectModel.findByIdAndUpdate(obj._id, { lastNotifiedAt: now });
        });

        // Emit the event
        if (socketId) {
          io.to(socketId).emit('objectCrossed', shouldNotify);
        }
      }
    }

  } catch (error) {
    console.error("Error fetching objects or areas:", error);
  }
}

async function fetchAndUpdateObjects() {
  try {
    // Fetch all objects to get their tagIds
    const allObjects = await objectModel.find({});
    const tagIds = allObjects.map(obj => obj.tagId);
    console.log("tagIds", tagIds)

    // Fetch data from the external API using axios
    const response = await axios.get(`${process.env.SAMSUNG_API_URL}/api/objects/getsome`, {
      params: { _ids: tagIds },
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(response.data[0])

    const tags = response.data; 

    for (const tag of tags) {
      await objectModel.findOneAndUpdate(
        { tagId: tag._id }, // filter
        { lat: tag.Lat, lan: tag.Lng }, // update
        { new: true } // options
      );
    }

    console.log('All matching objects have been updated with new lan and lat values.');
  } catch (error) {
    console.error(`Failed to fetch and update objects: ${error.message}`);
  }
}

exports.stopCheckingDistances = () => {
  if (intervalId === null) {
    console.log("No distance check in progress.");
    return;
  }
  axios.get(`${process.env.MOCK_API_URL}/api/mocActivator/stop`);
  clearInterval(intervalId);
  intervalId = null;
  console.log("Stopped checking distances.");
};
