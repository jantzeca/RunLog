const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
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
    height: Number,
    weight: Number,
    measurementSystem: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      required: true
    },
    // F.K.'s
    currentShoeId: String,
    shoes: String,
    runs: String
  },
  {
    timestamps: true,
    collection: 'users'
  }
);

module.exports = model('User', userSchema);
// TODO: All time best 1 mile, 5k, 10k, 13.1 mile, 26.2 mile...
// Also need to add this to the user gql schema/mutations