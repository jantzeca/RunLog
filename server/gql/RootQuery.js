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
  fields: {
    run: {
      type: RunType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Run.findById(args.id);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
  // mutation: Mutation
});
