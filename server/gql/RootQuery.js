const graphql = require('graphql');

const Run = require('../models/Run');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {}
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addRun: {},
    addUser: {},
    addShoe: {}
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
