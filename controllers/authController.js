const User = require('../models/userModel'); 

exports.login = async (req, res) => {
  const { email, password } = req.body; 

  try {
    const user = await User.findOne({ email });
    console.log("body", req.body)
    if (user) {
      if (password === "1111") {
        return res.status(200).json({
          message: 'User successfully logged in',
          userId: user._id
        });
      } else {
        return res.status(401).json({
          message: 'Incorrect password'
        });
      }
    } else {
      return res.status(404).json({
        message: 'User not found'
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      message: 'Internal server error'
    });
  }
};
