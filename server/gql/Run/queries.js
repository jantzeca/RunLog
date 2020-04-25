const Run = require('../../models/Run');

const query = `
  run(id: ID!): Run
  runs: [Run]
`;

const resolver = {
  run: async (_, { id }) => await Run.findById(id),
  runs: async (parent, _) => await Run.find({ userId: parent._id })
};

module.exports = {
  query,
  queryResolver: resolver
};