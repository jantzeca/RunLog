const { Schema, model } = require('mongoose');

const usersSchema = new Schema({
  // F.K.'s
  users_id: [
    {
      type: String
    }
  ]
});

module.exports = model('Users', usersSchema);
