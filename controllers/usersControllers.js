const User = require('../models/userModel'); 

// Helper function to determine if an error is a Mongoose validation error or a uniqueness error
const isClientError = (error) => {
  return error.name === 'ValidationError' || error.code === 11000; // 11000 is the code for duplicate key error in MongoDB
};

// Fetch a user by ID
exports.fetchUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(isClientError(error) ? 400 : 500).json({ message: error.message });
  }
};

// Fetch all users
exports.fetchAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error occurred while fetching users.' });
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.log(error)
    res.status(isClientError(error) ? 400 : 500).json({ message: error.message });
  }
};

// Update a user by ID
exports.updateUserById = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(isClientError(error) ? 400 : 500).json({ message: error.message });
  }
};

// Delete a user by ID
exports.deleteUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error occurred while deleting the user.' });
  }
};
