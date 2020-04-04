const { mutation, mutationResolver } = require('./mutations');
const { query, queryResolver } = require('./queries');

const typeDef = `
  type Shoe {
    id: ID!
    brand: String!
    model: String!
    size: Float!
    distance: Float!
    userId: ID!
    user: User
  }
`;

module.exports = {
  typeDef,
  mutation,
  query,
  mutationResolver,
  queryResolver
};
