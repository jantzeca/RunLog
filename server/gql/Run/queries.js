const Run = require('../../models/Run');

const query = `
  run(id: ID!): Run
  runs: [Run]
`;

const resolver = {
  run: async (parent, { id }) => await Run.findById(id),
  runs: async (parent, args) => await Run.find({ userId: parent._id })
}

module.exports = {
  query,
  queryResolver: resolver
}