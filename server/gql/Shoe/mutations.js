const Shoe = require('../../models/Shoe');

const mutation = `
  addShoe(brand: String!, model: String!, size: Float!, distance: Float!, ownerId: ID!): Shoe
  addDistanceToShoe(id: ID!, distance: Float!): Shoe
  updateShoe(id: ID!, brand: String, model: String, size: Float, distance: Float, ownerId: ID): Shoe
`;

const resolver = {
  addShoe: async (parent, args) => {
    const { brand, model, size, distance, ownerId } = args;
    const shoe = new Shoe({
      brand,
      model,
      size,
      distance,
      ownerId
    });
    return await shoe.save();
  },
  addDistanceToShoe: async (parent, args) => {
    await Shoe.findByIdAndUpdate(
      { _id: args.id },
      { $inc: { distance: args.distance } }
    );
    return await Shoe.findById(args.id);
  },
  updateShoe: async (parent, args) => {
    const inputs = {
      brand: args.brand,
      model: args.model,
      size: args.size,
      distance: args.distance,
      ownerId: args.ownerId
    };
    const updates = filterUpdates(inputs);
    return await Shoe.findByIdAndUpdate({ _id: args.id }, updates, {
      new: true
    });
  }
};

module.exports = {
  mutation,
  mutationResolver: resolver
};