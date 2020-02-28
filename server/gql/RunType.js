const graphql = require('graphql');
const ShoeType = require('./ShoeType');
const Shoe = require('../models/Shoe');

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLFloat } = graphql;

const RunType = new GraphQLObjectType({
  name: 'Run',
  fields: () => ({
    id: { type: GraphQLID },
    distance: { type: GraphQLFloat },
    time: { type: GraphQLString },
    location: { type: GraphQLString },
    timeOfDay: { type: GraphQLString },
    shoe: {
      type: ShoeType,
      args: { shoeId: { type: GraphQLID } },
      resolve(parent, args) {
        return Shoe.findById(args.shoeId);
      }
    }
  })
});

module.exports = RunType;
