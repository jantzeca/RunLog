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
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
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
      resolve(parent, args) {
        return Run.findById(args.runId);
      }
    },
    runs: {
      type: GraphQLList(RunType),
      resolve(parent, args) {
        return Run.find({ userId: parent._id });
      }
    },
    shoes: {
      type: GraphQLList(ShoeType),
      resolve(parent, args) {
        return Shoe.find({ ownerId: parent._id });
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
      resolve(parent, args) {
        return User.findById(parent.userId);
      }
    },
    shoe: {
      type: ShoeType,
      resolve(parent, args) {
        return Shoe.findById(parent.shoeId);
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
      resolve(parent, args) {
        return User.findById(parent.ownerId);
      }
    }
  }
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findById(args.id);
      }
    },
    run: {
      type: RunType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Run.findById(args.id);
      }
    },
    runs: {
      type: GraphQLList(RunType),
      resolve(parent, args) {
        return Run.find({ userId: parent._id });
      }
    },
    shoe: {
      type: ShoeType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Shoe.findById(args.id);
      }
    },
    shoes: {
      type: GraphQLList(ShoeType),
      resolve(parent, args) {
        return Shoe.find({ ownerId: parent._id });
      }
    },
    owner: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.ownerId);
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addRun: {
      type: RunType,
      args: {
        distance: { type: new GraphQLNonNull(GraphQLFloat) },
        time: { type: new GraphQLNonNull(GraphQLString) },
        location: { type: GraphQLString },
        timeOfDay: { type: GraphQLString },
        shoeId: { type: GraphQLID },
        userId: { type: GraphQLID }
      },
      resolve(parent, args) {
        const { distance, time, location, timeOfDay, shoeId, userId } = args;
        const run = new Run({
          distance,
          time,
          location,
          timeOfDay,
          shoe,
          userId
        });
        return run.save();
      }
    },
    addUser: {
      type: UserType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        fname: { type: new GraphQLNonNull(GraphQLString) },
        lname: { type: GraphQLString },
        age: { type: GraphQLInt },
        height: { type: GraphQLInt },
        weight: { type: GraphQLFloat },
        measurementSystem: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        const {
          email,
          fname,
          lname,
          age,
          height,
          weight,
          measurementSystem
        } = args;
        const user = new User({
          email,
          fname,
          lname,
          age,
          height,
          weight,
          measurementSystem
        });
        return user.save();
      }
    },
    addShoe: {
      type: ShoeType,
      args: {
        brand: { type: new GraphQLNonNull(GraphQLString) },
        model: { type: new GraphQLNonNull(GraphQLString) },
        size: { type: new GraphQLNonNull(GraphQLFloat) },
        distance: { type: new GraphQLNonNull(GraphQLFloat) },
        ownerId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        const { brand, model, size, distance, ownerId } = args;
        const shoe = new Shoe({
          brand,
          model,
          size,
          distance,
          ownerId
        });
        return shoe.save();
      }
    },
    addDistanceToShoe: {
      type: ShoeType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        distance: { type: new GraphQLNonNull(GraphQLFloat) }
      },
      // TODO: Fix this to update every time it's called
      resolve(parent, args) {
        Shoe.update({ _id: args.id }, { $inc: { distance: args.distance } });
        return Shoe.findById(args.id);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
