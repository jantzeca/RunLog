const User = require('../../models/User');

const query = `
  user(userId: ID!): User
  userById(id: ID!): User
  users: [User]
`;

const resolver = {
  user: async (parent, args) => await User.findById(parent.userId),
  userById: async (parent, args) => await User.findById(args.id),
  users: async (parent, args) => await User.find()
};

module.exports = {
  query,
  queryResolver: resolver
};