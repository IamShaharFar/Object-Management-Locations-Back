const Area = require('../models/areaModel');

// Helper function to determine if an error is a Mongoose validation error
const isValidationError = (error) => {
  return error.name === 'ValidationError';
};

// Fetch an area by ID
exports.fetchAreaById = async (req, res) => {
  try {
    const area = await Area.findById(req.params.id);
    if (!area) {
      return res.status(404).json({ message: 'Area not found' });
    }
    res.status(200).json(area);
  } catch (error) {
    res.status(isValidationError(error) ? 400 : 500).json({ message: error.message });
  }
};

// Fetch all areas
exports.fetchAllAreas = async (req, res) => {
  try {
    const areas = await Area.find({});
    res.status(200).json(areas);
  } catch (error) {
    res.status(500).json({ message: 'Server error occurred while fetching areas.' });
  }
};

// Create a new area
exports.createArea = async (req, res) => {
  try {
    const newArea = new Area(req.body);
    const savedArea = await newArea.save();
    res.status(201).json(savedArea);
  } catch (error) {
    res.status(isValidationError(error) ? 400 : 500).json({ message: error.message });
  }
};

// Update an area by ID
exports.updateAreaById = async (req, res) => {
  try {
    const updatedArea = await Area.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedArea) {
      return res.status(404).json({ message: 'Area not found' });
    }
    res.status(200).json(updatedArea);
  } catch (error) {
    res.status(isValidationError(error) ? 400 : 500).json({ message: error.message });
  }
};

// Delete an area by ID
exports.deleteAreaById = async (req, res) => {
  try {
    const area = await Area.findByIdAndDelete(req.params.id);
    if (!area) {
      return res.status(404).json({ message: 'Area not found' });
    }
    res.status(200).json({ message: 'Area deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error occurred while deleting the area.' });
  }
};
