const { mutation, mutationResolver } = require('./mutations');
const { query, queryResolver } = require('./queries');

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
    measurementSystem: MeasurementSystem!
    isAdmin: Boolean
    run(runId: ID!): Run
    runs: [Run]
    shoeById(shoeId: ID!): Shoe
    shoes: [Shoe]
  }

  enum MeasurementSystem {
    metric
    imperial
  }
`;

module.exports = {
  typeDef,
  mutation,
  query,
  mutationResolver,
  queryResolver
}