const graphql = require('graphql');

const { GraphQLObjectType, GraphQLList, GraphQLID } = graphql;

const UsersType = new GraphQLObjectType({
  name: 'Users',
  fields: () => ({
    id: { type: GraphQLID },
    users: {
      type: GraphQLList,
      resolve(parent, args) {
        return User.findById(parent.id);
      }
    }
  })
});
