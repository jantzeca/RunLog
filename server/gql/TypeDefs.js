const graphql = require('graphql');

// Mongo Schemas
const Run = require('../models/Run');
const Shoe = require('../models/Shoe');
const User = require('../models/User');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLID,
  GraphQLList
} = graphql;

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    fname: { type: GraphQLString },
    lname: { type: GraphQLString },
    age: { type: GraphQLInt },
    height: { type: GraphQLInt },
    weight: { type: GraphQLFloat },
    measurementSystem: { type: GraphQLString },
    run: {
      type: RunType,
      args: { runId: { type: GraphQLID } },
      async resolve(_, args) {
        return await Run.findById(args.runId);
      }
    },
    runs: {
      type: GraphQLList(RunType),
      async resolve(parent, _) {
        return await Run.find({ userId: parent._id });
      }
    },
    shoes: {
      type: GraphQLList(ShoeType),
      async resolve(parent, _) {
        return await Shoe.find({ ownerId: parent._id });
      }
    }
  })
});

const RunType = new GraphQLObjectType({
  name: 'Run',
  fields: () => ({
    id: { type: GraphQLID },
    distance: { type: GraphQLFloat },
    time: { type: GraphQLString },
    location: { type: GraphQLString },
    timeOfDay: { type: GraphQLString },
    shoeId: { type: GraphQLID },
    userId: { type: GraphQLID },
    user: {
      type: UserType,
      async resolve(parent, _) {
        return await User.findById(parent.userId);
      }
    },
    shoe: {
      type: ShoeType,
      async resolve(parent, _) {
        return await Shoe.findById(parent.shoeId);
      }
    }
  })
});

const ShoeType = new GraphQLObjectType({
  name: 'Shoe',
  fields: {
    id: { type: GraphQLID },
    brand: { type: GraphQLString },
    model: { type: GraphQLString },
    size: { type: GraphQLFloat },
    distance: { type: GraphQLFloat },
    ownerId: { type: GraphQLID },
    owner: {
      type: UserType,
      async resolve(parent, _) {
        return await User.findById(parent.ownerId);
      }
    }
  }
});

module.exports = { UserType, RunType, ShoeType };
