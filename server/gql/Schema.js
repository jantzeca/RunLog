// TODO: Separate this out a bit
/**
 * Ideas:
 *   Make a file for each mutation, typeDef, and query and try to categorize them into run, team, shoe related
 */

const { gql } = require('apollo-server-express');
const { filterUpdates } = require('./utils');

// Mongo Schemas
const Run = require('../models/Run');
const Shoe = require('../models/Shoe');
const User = require('../models/User');

const RunSchema = require('./Run/runSchema');
const UserSchema = require('./User/userSchema');
const ShoeSchema = require('./Shoe/shoeSchema');

const typeDefs = gql`
  ${UserSchema.typeDef}
  ${RunSchema.typeDef}
  ${ShoeSchema.typeDef}

  type Mutation {
    ${RunSchema.mutation}
    ${UserSchema.mutation}
    ${ShoeSchema.mutation}
  }

  type Query {
    ${RunSchema.query}
    ${UserSchema.query}
    ${ShoeSchema.query}
  }
`;

const resolvers = {
  Query: {
    ...RunSchema.queryResolver,
    ...UserSchema.queryResolver,
    ...ShoeSchema.queryResolver
  },
  Mutation: {
    ...RunSchema.mutationResolver,
    ...UserSchema.mutationResolver,
    ...ShoeSchema.mutationResolver
  }
};

module.exports = {
  typeDefs,
  resolvers
};
