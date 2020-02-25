const { Schema, model } = require('mongoose');

const runsSchema = new Schema({
  // F.K.'s
  userId: String,
  runIds: [
    {
      type: String
    }
  ]
});

module.exports = model('Runs', runsSchema);
