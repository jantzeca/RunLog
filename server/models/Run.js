const { Schema, model } = require('mongoose');

const runSchema = new Schema({
  distance: {
    type: Number,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  location: String,
  timeOfDay: String,
  // F.K.'s
  shoeId: String
});

module.exports = model('Runs', runSchema);