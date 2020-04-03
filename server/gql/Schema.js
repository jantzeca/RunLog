// TODO: Separate this out a bit

const { gql } = require('apollo-server-express');
const { filterUpdates } = require('./utils');

// Mongo Schemas
const Run = require('../models/Run');
const Shoe = require('../models/Shoe');
const User = require('../models/User');

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    password: String!
    fname: String!
    lname: String
    age: Int
    height: Float
    weight: Float
    measurementSystem: MeasurementSystem!
    isAdmin: Boolean
    run(runId: ID!): Run
    runs: [Run]
    shoeById(shoeId: ID!): Shoe
    shoes: [Shoe]
  }

  type Run {
    id: ID!
    distance: Float!
    time: String!
    location: String
    timeOfDay: String
    shoeId: String
    userId: String!
    user: User
    shoe: Shoe
  }

  type Shoe {
    id: ID!
    brand: String!
    model: String!
    size: Float!
    distance: Float!
    userId: ID!
    user: User
  }

  enum MeasurementSystem {
    metric
    imperial
  }

  type Mutation {
    addRun(distance: Float!, time: String!, location: String, timeOfDay: String, shoeId: ID, userId: ID!): Run
    addUser(email: String!, password: String!, fname: String!, lname: String, age: Int, height: Int, weight: Float, measurementSystem: MeasurementSystem!, isAdmin: Boolean!): User
    addShoe(brand: String!, model: String!, size: Float!, distance: Float!, ownerId: ID!): Shoe
    addDistanceToShoe(id: ID!, distance: Float!): Shoe
    deleteUser(id: ID!): User
    updateUser(id: ID!, email: String, password: String, fname: String, lname: String, age: Int, height: Int, weight: Float, measurementSystem: MeasurementSystem, isAdmin: Boolean): User
    updateRun(id: ID!, distance: Float, time: String, location: String, timeOfDay: String, shoeId: ID, userId: ID): Run
    updateShoe(id: ID!, brand: String, model: String, size: Float, distance: Float, ownerId: ID): Shoe
  }

  type Query {
    run(runId: ID!): Run
    runs: [Run]
    shoe: Shoe
    shoeById(shoeId: ID!): Shoe
    shoes: [Shoe]
    user(userId: ID!): User
    users: [User]
  }
`;

const resolvers = {
  Query: {
    run: async (parent, { runId }) => await Run.findById(runId),
    runs: async (parent, args) => await Run.find({ userId: parent._id }),
    shoe: async (parent, args) => await Shoe.find({ shoeId: parent.shoeId }),
    shoeById: async (parent, { shoeId }) => await Shoe.findById(shoeId),
    shoes: async (parent, args) => await Shoe.find({ ownerId: parent._id }),
    user: async (parent, args) => await User.findById(parent.userId),
    users: async (parent, args) => await User.find()
  },
  Mutation: {
    addRun: async (parent, args) => {
      const { distance, time, location, timeOfDay, shoeId, userId } = args;
      const run = new Run({
        distance,
        time,
        location,
        timeOfDay,
        shoeId,
        userId
      });
      return await run.save();
    },
    addUser: async (parent, args) => {
      const {
        email,
        password,
        fname,
        lname,
        age,
        height,
        weight,
        measurementSystem,
        isAdmin
      } = args;
      try {
        const user = new User({
          email,
          password,
          fname,
          lname,
          age,
          height,
          weight,
          measurementSystem,
          isAdmin
        });
        return await user.save();
      } catch (err) {
        console.error(err);
        return {
          success: false,
          message: 'Bad Request'
        };
      }
    },
    addShoe: async (parent, args) => {
      const { brand, model, size, distance, ownerId } = args;
      const shoe = new Shoe({
        brand,
        model,
        size,
        distance,
        ownerId
      });
      return await shoe.save();
    },
    addDistanceToShoe: async (parent, args) => {
      await Shoe.findByIdAndUpdate(
        { _id: args.id },
        { $inc: { distance: args.distance } }
      );
      return await Shoe.findById(args.id);
    },
    deleteUser: async (parent, args) => await User.findByIdAndDelete(args.id),
    updateUser: async (parent, args) => {
      const inputs = {
        email: args.email,
        password: args.password,
        fname: args.fname,
        lname: args.lname,
        age: args.age,
        height: args.height,
        weight: args.weight,
        measurementSystem: args.measurementSystem,
        isAdmin: args.isAdmin
      };
      const updates = filterUpdates(inputs);
      return await User.findByIdAndUpdate({ _id: args.id }, updates, {
        new: true
      });
    },
    updateRun: async (parent, args) => {
      const inputs = {
        distance: args.distance,
        time: args.time,
        location: args.location,
        timeOfDay: args.timeOfDay,
        shoeId: args.shoeId,
        userId: args.userId
      };
      const updates = filterUpdates(inputs);
      return await Run.findByIdAndUpdate({ _id: args.id }, updates, {
        new: true
      });
    },
    updateShoe: async (parent, args) => {
      const inputs = {
        brand: args.brand,
        model: args.model,
        size: args.size,
        distance: args.distance,
        ownerId: args.ownerId
      };
      const updates = filterUpdates(inputs);
      return await Shoe.findByIdAndUpdate({ _id: args.id }, updates, {
        new: true
      });
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
