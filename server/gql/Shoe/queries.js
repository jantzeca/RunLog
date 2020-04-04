const Shoe = require('../../models/Shoe');

const query = `
  shoe: Shoe
  shoeById(id: ID!): Shoe
  shoes: [Shoe]
`;

const resolver = {
  shoe: async (parent, args) => await Shoe.find({ shoeId: parent.shoeId }),
  shoeById: async (parent, { id }) => await Shoe.findById(id),
  shoes: async (parent, args) => await Shoe.find({ ownerId: parent._id })
};

module.exports = {
  query,
  queryResolver: resolver
};