const Run = require('../../models/Run');
const { filterUpdates } = require('../utils');

const mutation = `
  addRun(distance: Float!, time: String!, location: String, timeOfDay: String, shoeId: ID, userId: ID!): Run
  updateRun(id: ID!, distance: Float, time: String, location: String, timeOfDay: String, shoeId: ID, userId: ID): Run
  deleteRun(id: ID!): Run
`;

const resolver = {
  addRun: async (parent, args) => {
    const { distance, time, location, timeOfDay, shoeId, userId } = args;
    const run = new Run({
      distance,
      time,
      location,
      timeOfDay,
      shoeId,
      userId
    });
    return await run.save();
  },
  updateRun: async (parent, args) => {
    const inputs = {
      distance: args.distance,
      time: args.time,
      location: args.location,
      timeOfDay: args.timeOfDay,
      shoeId: args.shoeId,
      userId: args.userId
    }
    const updates = filterUpdates(inputs);
    return await Run.findByIdAndUpdate({ _id: args.id }, updates, { new: true });
  },
  deleteRun: async (parent, args) => 
    await Run.findByIdAndDelete(args.id)
}

module.exports = {
  mutation,
  mutationResolver: resolver
}