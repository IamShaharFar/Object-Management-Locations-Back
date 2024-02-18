const objectsIntersector = require('../utils/objectsIntersector');
const objectModel = require('../models/objectModel');
const { getIO } = require('../utils/socket');

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