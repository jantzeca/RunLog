const { Schema, model } = require('mongoose');

const shoeSchema = new Schema(
  {
    brand: {
      type: String,
      required: true
    },
    model: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      required: true
    },
    distance: {
      type: Number,
      required: true
    },
    isDefault: {
      type: Boolean,
      required: true
    },
    ownerId: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    collection: 'shoes'
  }
);

module.exports = model('Shoe', shoeSchema);
