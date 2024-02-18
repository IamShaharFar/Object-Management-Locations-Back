const Area = require('../models/areaModel');
const User = require('../models/userModel');

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
    const user = await User.findById(savedArea.userId);
    if (!user.areas.includes(savedArea._id)) {
      user.areas.push(savedArea._id); // Add the new area's ID to the user's areas array
      await user.save(); 
    }
    res.status(201).json(savedArea);
  } catch (error) {
    res.status(isValidationError(error) ? 400 : 500).json({ message: error.message });
  }
};

// Update an area by ID
exports.updateAreaById = async (req, res) => {
  try {
    const area = await Area.findById(req.params.id);
    if (!area) {
      return res.status(404).json({ message: 'Area not found' });
    }

    if (req.body.userId && req.body.userId !== area.userId.toString()) {
      const oldUser = await User.findById(area.userId);
      if (oldUser) {
        oldUser.areas = oldUser.areas.filter(areaId => areaId.toString() !== area._id.toString());
        await oldUser.save();
      }

      const newUser = await User.findById(req.body.userId);
      if (newUser && !newUser.areas.includes(area._id)) {
        newUser.areas.push(area._id);
        await newUser.save();
      }
    }

    const updatedArea = await Area.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).json(updatedArea);
  } catch (error) {
    res.status(isValidationError(error) ? 400 : 500).json({ message: error.message });
  }
};

// Delete an area by ID
exports.deleteAreaById = async (req, res) => {
  try {
    const area = await Area.findById(req.params.id);
    if (!area) {
      return res.status(404).json({ message: 'Area not found' });
    }

    const user = await User.findById(area.userId);
    if (user) {
      user.areas = user.areas.filter(areaId => areaId.toString() !== area._id.toString());
      await user.save();
    }

    await area.remove(); 
    res.status(200).json({ message: 'Area deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error occurred while deleting the area.' });
  }
};
