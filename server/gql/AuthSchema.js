const graphql = require('graphql');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const User = require('../models/User');

const { UserType } = require('./TypeDefs');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLID,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const AuthRootQuery = new GraphQLObjectType({
  name: 'AuthRootQuery',
  fields: {
    signin: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      async resolve(parent, args, context) {
        const { email, password } = args;
        const res = await User.find({ email, password });
        const user = res.length === 1 ? res[0] : null;
        console.log(email, password);
        if (user) {
          try {
            let token = await jwt.sign({ user }, process.env.SECRETKEY, {
              expiresIn: '3600s'
            });
            user['token'] = `Bearer ${token}`;
            return user;
          } catch (err) {
            return err;
          }
        }
        return {};
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: AuthRootQuery
});
