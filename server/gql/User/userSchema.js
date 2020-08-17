const { mutation, mutationResolver } = require('./userMutations');
const { query, queryResolver } = require('./userQueries');

const typeDef = `
  type User {
    id: ID!
    email: String!
    password: String!
    fname: String!
    lname: String
    age: Int
    height: Float
    weight: Float
    isAdmin: Boolean
    currentShoeId: ID
    run(runId: ID!): Run
    runs: [Run]
    runsByTitle: [Run]
    shoeById(shoeId: ID!): Shoe
    shoes: [Shoe]
  }
`;

module.exports = {
  typeDef,
  mutation,
  query,
  mutationResolver,
  queryResolver
}
