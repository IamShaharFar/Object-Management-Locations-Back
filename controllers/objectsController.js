const ObjectModel = require('../models/objectModel');
const Area = require('../models/areaModel');
const axios = require('axios')

// Helper function to determine if an error is a client-side error
const isClientError = (error) => {
  const clientErrorStatusCodes = [400, 401, 403, 404];
  return clientErrorStatusCodes.includes(error.statusCode);
};

// Fetch all objects
exports.fetchAllObjects = async (req, res) => {
  try {
    const objects = await ObjectModel.find();
    res.status(200).json(objects);
  } catch (error) {
    res.status(isClientError(error) ? 400 : 500).json({ message: error.message });
  }
};

// Fetch all objects by userId
exports.fetchObjectsByUserId = async (req, res) => {
  try {
    const userId = req.body.userId; 

    if (!userId) {
      return res.status(400).json({ message: 'UserId is required' });
    }

    const objects = await ObjectModel.find({ userId: userId });

    res.status(200).json(objects);
  } catch (error) {
    res.status(isClientError(error) ? 400 : 500).json({ message: error.message });
  }
};


// Fetch an object by ID
exports.fetchObjectById = async (req, res) => {
  try {
    const object = await ObjectModel.findById(req.params.id);
    if (!object) {
      return res.status(404).json({ message: 'Object not found' });
    }
    res.status(200).json(object);
  } catch (error) {
    res.status(isClientError(error) ? 400 : 500).json({ message: error.message });
  }
};

// Create a new object
exports.createObject = async (req, res) => {
  try {
    const newObject = new ObjectModel(req.body);
    const axiosRequestBody = {
      description: newObject.description,
      Lat: newObject.lat,
      Lng: newObject.lan
    };
    const response = await axios.post(`${process.env.SAMSUNG_API_URL}/api/objects/create`, axiosRequestBody);
    const tagId = response.data.insertedId;

    if (tagId) {
      newObject.tagId = tagId;
    }

    const savedObject = await newObject.save();
    console.log(Area.find({}))
    if (savedObject.areaId) {
      const area = await Area.findById(savedObject.areaId);
      if (!area) {
        return res.status(404).json({ message: 'Area not found' });
      }
      area.objects.push(savedObject._id);
      await area.save();
    }

    res.status(201).json(savedObject);
  } catch (error) {
    res.status(isClientError(error) ? 400 : 500).json({ message: error.message });
  }
};

// Update an object by ID
exports.updateObjectById = async (req, res) => {
  try {
    const objectId = req.params.id;
    const updates = req.body;

    const object = await ObjectModel.findById(objectId);
    if (!object) {
      return res.status(404).json({ message: 'Object not found' });
    }

    if (updates.areaId && updates.areaId !== object.areaId.toString()) {
      if (object.areaId) {
        await Area.findByIdAndUpdate(object.areaId, { $pull: { objects: objectId } });
      }
      await Area.findByIdAndUpdate(updates.areaId, { $addToSet: { objects: objectId } });
    }

    const updatedObject = await ObjectModel.findByIdAndUpdate(objectId, updates, { new: true, runValidators: true });
    res.status(200).json(updatedObject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Delete an object by ID
exports.deleteObjectById = async (req, res) => {
  try {
    const objectId = req.params.id;

    const object = await ObjectModel.findById(objectId);
    if (!object) {
      return res.status(404).json({ message: 'Object not found' });
    }
    await axios.delete(`${process.env.SAMSUNG_API_URL}/api/objects/delete/${object.tagId}`)
      .catch(error => {
        throw new Error(error.response ? error.response.data.message : 'Failed to delete object externally');
      });

    if (object.areaId) {
      await Area.findByIdAndUpdate(object.areaId, { $pull: { objects: objectId } });
    }

    await ObjectModel.findByIdAndDelete(objectId);
    res.status(200).json({ message: 'Object successfully deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
