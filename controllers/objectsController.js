const ObjectModel = require('../models/objectModel'); 

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
    await newObject.save();
    res.status(201).json(newObject);
  } catch (error) {
    res.status(isClientError(error) ? 400 : 500).json({ message: error.message });
  }
};

// Update an object by ID
exports.updateObjectById = async (req, res) => {
  try {
    const updatedObject = await ObjectModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedObject) {
      return res.status(404).json({ message: 'Object not found' });
    }
    res.status(200).json(updatedObject);
  } catch (error) {
    res.status(isClientError(error) ? 400 : 500).json({ message: error.message });
  }
};

// Delete an object by ID
exports.deleteObjectById = async (req, res) => {
  try {
    const result = await ObjectModel.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Object not found' });
    }
    res.status(200).json({ message: 'Object successfully deleted' });
  } catch (error) {
    res.status(isClientError(error) ? 400 : 500).json({ message: error.message });
  }
};
