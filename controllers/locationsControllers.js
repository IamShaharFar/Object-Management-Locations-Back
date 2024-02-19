const objectsIntersector = require('../utils/objectsIntersector');
const objectModel = require('../models/objectModel');
const { getIO } = require('../utils/socket');
const axios = require('axios');

exports.start = async (req, res) => {
  const io = getIO();
  try {
    //fetch the mock to start mooving the objects
    const objects = await objectModel.find({});
    (async () => {
      objectsIntersector.startUpdateClientLocations(objects, io);
    })();
    res.status(200).json({ message: 'Update started in the background' });
  } catch (error) {
    console.error('Error starting update client locations:', error);
    res.status(500).json({ message: 'Error starting update' });
  }
};

exports.stop = async (req, res) => {
  try {
    //fetch the mock to stop mooving the objects
    (async () => {
      objectsIntersector.stopCheckingDistances();
    })();
    res.status(200).json({ message: 'Update stoped' });
  } catch (error) {
    console.error('Error stoping update client locations:', error);
    res.status(500).json({ message: 'Error stoping update' });
  }
}

exports.pushOut = async (req, res) => {
  try {

    const url = `${process.env.MOCK_API_URL}/api/mockActivator/pushOut`;

    const data = {
      id: req.body.areaId,
      meters: 300
    };

    axios.post(url, data);

    // Process the response
    res.status(200).json({
      message: 'Mooving Object Outside'
    });
  } catch (error) {
    // Error handling
    if (axios.isAxiosError(error)) {
      const status = error.response ? error.response.status : 500;
      const message = error.response ? error.response.data.message : 'Failed to make the request with body';
      res.status(status).json({ message });
    } else {
      res.status(500).json({ message: 'An unexpected error occurred' });
    }
  }
};