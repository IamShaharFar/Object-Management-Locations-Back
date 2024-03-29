const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;

// Users Schema
const UsersSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [50, 'Name cannot be more than 50 characters long']
  },
  secondName: {
    type: String,
    required: [true, 'Second name is required'],
    minlength: [2, 'Second name must be at least 2 characters long'],
    maxlength: [50, 'Second name cannot be more than 50 characters long']
  },
  phoneNumber: {
    type: String,
    required: [true, 'Contact number is required'],
    validate: {
      validator: function(v) {
        return /^\+[1-9]\d{1,14}$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: [validator.isEmail, 'Please fill a valid email address'] 
  },
  areas: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Area' }],
    default: [] 
  }
});

const User = mongoose.model('User', UsersSchema);

module.exports = User;
