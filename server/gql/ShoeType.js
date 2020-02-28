const graphql = require('graphql');

const User = require('../models/User');

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLFloat } = graphql;

const ShoeType = new GraphQLObjectType({
  name: 'Shoe',
  fields: {
    id: { type: GraphQLID },
    brand: { type: GraphQLString },
    model: { type: GraphQLString },
    size: { type: GraphQLFloat },
    distance: { type: GraphQLFloat },
    ownerId: {
      type: GraphQLID,
      args: { userId: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findById(args.userId);
      }
    }
  }
});

module.exports = ShoeType;
