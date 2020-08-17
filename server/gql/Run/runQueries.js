const Run = require('../../models/Run');

const query = `
  run(id: ID!): Run
  runs: [Run]
  runsByTitle(title: String!): [Run]
`;

const resolver = {
  run: async (_, { id }) => await Run.findById(id),
  runs: async (parent, _) => await Run.find({ userId: parent._id }),
  runsByTitle: async(_, { title }) => await Run.find({ title}) // TODO: Test this
};

// TODO: Query for a run by date, etc.

module.exports = {
  query,
  queryResolver: resolver
};
