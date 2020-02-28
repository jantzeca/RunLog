const graphql = require('graphql');

const ShoeType = require('./ShoeType');
const Shoe = require('../models/Shoe');
const RunsType = require('./RunsType');
const Runs = require('../models/Runs');

const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat
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
    runs: {
      type: GraphQLList(RunsType),
      resolve(parent, args) {
        return Runs.find({ userId: parent.id });
      }
    },
    shoes: {
      type: GraphQLList(ShoeType),
      resolve(parent, args) {
        return Shoe.find({ ownerId: parent.id });
      }
    }
  })
});

module.exports = UserType;
