const { mutation, mutationResolver } = require('./mutations');
const { query, queryResolver } = require('./queries');

const typeDef = `
  type Run {
    id: ID!
    distance: Float!
    time: String!
    location: String
    timeOfDay: String
    shoeId: String
    userId: String!
    user: User
    shoe: Shoe
  }
`;

module.exports = {
  typeDef,
  mutation,
  query,
  queryResolver,
  mutationResolver
};
