const { gql } = require('apollo-server-express');

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
  },
  User: {
    ...RunSchema.queryResolver,
    shoeById: ShoeSchema.queryResolver.shoeById,
    shoes: ShoeSchema.queryResolver.shoes
  },
  Run: {
    user: UserSchema.queryResolver.user,
    shoe: ShoeSchema.queryResolver.shoe
  },
  Shoe: {
    user: UserSchema.queryResolver.user
  }
};

module.exports = {
  typeDefs,
  resolvers
};
