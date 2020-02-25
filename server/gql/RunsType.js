const graphql = require('graphql');

const UserType = require('./UserType');
const RunType = require('./RunType');

const Run = require('../models/Run');
const User = require('../models/User');

const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLString,
  GraphQLInt
} = graphql;

const RunsType = new GraphQLObjectType({
  name: 'Runs',
  fields: () => ({
    id: { type: GraphQLID },
    userId: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.userId);
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
