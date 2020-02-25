const graphql = require('graphql');

const UserType = require('./UserType');
const RunType = require('./RunType');

const User = require('../models/User');
const Run = require('../models/Run');

const { GraphQLObjectType, GraphQLList, GraphQLID } = graphql;

const RunsType = new GraphQLObjectType({
  name: 'Runs',
  fields: () => ({
    id: { type: GraphQLID },
    user: {
      type: UserType,
      args: { userId: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findById(args.userId);
      }
    },
    runIds: {
      type: GraphQLList(RunType),
      args: { userId: { type: GraphQLID } },
      resolve(parent, args) {
        return Run.find({ _id: args.id });
      }
    }
  })
});

module.exports = RunsType;
