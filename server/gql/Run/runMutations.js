const Run = require('../../models/Run');
const { filterUpdates } = require('../utils');

const mutation = `
  addRun(distance: Float!, unit: String!, time: String!, location: String, timeOfDay: String, type: String, date: String, title: String!, comment: String, shoeId: ID, userId: ID!): Run
  updateRun(id: ID!, distance: Float, unit: String, time: String, location: String, timeOfDay: String, type: String, date: String, title: String, comment: String, shoeId: ID, userId: ID): Run
  deleteRun(id: ID!): Run
`;

const resolver = {
  addRun: async (_, args) => {
    // Can I just say const run = new Run(args); ??? Is anything else on args?
    const { distance, unit, time, location, timeOfDay, date, title, comment, shoeId, userId, type } = args;
    const run = new Run({
      distance,
      unit,
      time,
      location,
      timeOfDay,
      date,
      title,
      comment,
      shoeId,
      userId,
      type
    });
    return await run.save();
  },
  updateRun: async (_, args) => {
    const inputs = {
      distance: args.distance,
      unit: args.unit,
      time: args.time,
      location: args.location,
      timeOfDay: args.timeOfDay,
      date: args.date,
      comment: args.comment,
      shoeId: args.shoeId,
      userId: args.userId,
      type: args.type
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
