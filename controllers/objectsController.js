const ObjectModel = require('../models/objectModel');
const Area = require('../models/areaModel');

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
    const savedObject = await newObject.save();

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

    if (object.areaId) {
      await Area.findByIdAndUpdate(object.areaId, { $pull: { objects: objectId } });
    }

    await ObjectModel.findByIdAndDelete(objectId);
    res.status(200).json({ message: 'Object successfully deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
