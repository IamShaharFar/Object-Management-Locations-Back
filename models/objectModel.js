const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Objects Schema
const objectSchema = new Schema({
  description: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 90,
  },
  lan: {
    type: Number,
    required: true,
    validate: {
      validator: function(v) {
        return v >= -180 && v <= 180;
      },
      message: props => `${props.value} is not a valid longitude!`
    }
  },
  lat: {
    type: Number,
    required: true,
    validate: {
      validator: function(v) {
        return v >= -90 && v <= 90;
      },
      message: props => `${props.value} is not a valid latitude!`
    }
  },
  userId: {
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  },
  areaId: {
    type: Schema.Types.ObjectId, 
    ref: 'Area'
  },
  tagId: {
    type: Schema.Types.ObjectId, 
    required: true
  }
});

const ObjectModel = mongoose.model('Object', objectSchema);

module.exports = ObjectModel;
