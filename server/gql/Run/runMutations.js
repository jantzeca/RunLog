const Run = require('../../models/Run');
const { filterUpdates } = require('../utils');

const mutation = `
  addRun(distance: Float!, time: String!, location: String, timeOfDay: String, date: String, comment: String, shoeId: ID, userId: ID!): Run
  updateRun(id: ID!, distance: Float, time: String, location: String, timeOfDay: String, date: String, comment: String, shoeId: ID, userId: ID): Run
  deleteRun(id: ID!): Run
`;

const resolver = {
  addRun: async (_, args) => {
    const { distance, time, location, timeOfDay, date, comment, shoeId, userId } = args;
    const run = new Run({
      distance,
      time,
      location,
      timeOfDay,
      date,
      comment,
      shoeId,
      userId
    });
    return await run.save();
  },
  updateRun: async (_, args) => {
    const inputs = {
      distance: args.distance,
      time: args.time,
      location: args.location,
      timeOfDay: args.timeOfDay,
      date: args.date,
      comment: args.comment,
      shoeId: args.shoeId,
      userId: args.userId
    }
    const updates = filterUpdates(inputs);
    return await Run.findByIdAndUpdate({ _id: args.id }, updates, { new: true });
  },
  deleteRun: async (_, args) => (
    await Run.findByIdAndDelete(args.id)
  )
};

module.exports = {
  mutation,
  mutationResolver: resolver
};