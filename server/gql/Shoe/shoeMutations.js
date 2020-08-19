const Shoe = require('../../models/Shoe');

const mutation = `
  addShoe(brand: String!, model: String!, size: Float, distance: Float!, isDefault: Boolean!, ownerId: ID!): Shoe
  addDistanceToShoe(id: ID!, distance: Float!): Shoe
  updateShoe(id: ID!, brand: String, model: String, size: Float, distance: Float, isDefault: Boolean, ownerId: ID): Shoe
`;

const resolver = {
  addShoe: async (_, args) => {
    const { brand, model, size, distance, isDefault, ownerId } = args;
    const shoe = new Shoe({
      brand,
      model,
      size,
      distance,
      isDefault,
      ownerId
    });
    return await shoe.save();
  },
  addDistanceToShoe: async (_, args) => {
    await Shoe.findByIdAndUpdate(
      { _id: args.id },
      { $inc: { distance: args.distance } }
    );
    return await Shoe.findById(args.id);
  },
  updateShoe: async (_, args) => {
    const inputs = {
      brand: args.brand,
      model: args.model,
      size: args.size,
      distance: args.distance,
      isDefault: args.isDefault,
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
