const { mutation, mutationResolver } = require('./shoeMutations');
const { query, queryResolver } = require('./shoeQueries');

const typeDef = `
  type Shoe {
    id: ID!
    brand: String!
    model: String!
    size: Float
    distance: Float!
    isDefault: Boolean!
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
