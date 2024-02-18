const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

// Custom validator for latitude
const latitudeValidator = {
  validator: function(v) {
    return v >= -90 && v <= 90;
  },
  message: props => `${props.value} is not a valid latitude! Latitude must be between -90 and 90.`
};

// Custom validator for longitude
const longitudeValidator = {
  validator: function(v) {
    return v >= -180 && v <= 180;
  },
  message: props => `${props.value} is not a valid longitude! Longitude must be between -180 and 180.`
};

// Area Schema
const AreaSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [50, 'Name cannot be more than 50 characters long']
  },
  contactNumber: {
    type: String,
    required: [true, 'Contact number is required'],
    validate: {
      validator: function(v) {
        return /^\+[1-9]\d{1,14}$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  centerLat: {
    type: Number,
    required: [true, 'Center latitude is required'],
    validate: latitudeValidator
  },
  centerLng: {
    type: Number,
    required: [true, 'Center longitude is required'],
    validate: longitudeValidator
  },
  radius: {
    type: Number,
    required: [true, 'Radius is required']
  },
  userId: {
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  },
  objects: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Object' }],
    default: [] 
  }
});

const Area = mongoose.model('Area', AreaSchema);

module.exports = Area;
