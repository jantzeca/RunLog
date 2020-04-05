const Shoe = require('../../models/Shoe');

const query = `
  shoe: Shoe
  shoeById(id: ID!): Shoe
  shoes: [Shoe]
`;

const resolver = {
  shoe: async (parent, args) => await Shoe.findById(parent.shoeId),
  shoeById: async (parent, { id }) => await Shoe.findById(id),
  shoes: async (parent, args) => await Shoe.find({ userId: parent._id })
};

module.exports = {
  query,
  queryResolver: resolver
};