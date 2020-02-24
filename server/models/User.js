const { Schema, model } = require('mongoose');

const heightSchema = new Schema({
  large: {
    type: Number,
    required: true
  },
  small: {
    type: Number,
    required: true
  }
});

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  fname: {
    type: String,
    required: true
  },
  lname: String,
  age: Number,
  height: heightSchema,
  weight: Number,
  measurement_system: {
    type: String,
    required: true
  },
  // F.K.'s
  shoes: String,
  runs: String
});

module.exports = model('User', userSchema);
