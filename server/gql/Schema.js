const graphql = require('graphql');

// Mongo Schemas
const Run = require('../models/Run');
const Shoe = require('../models/Shoe');
const User = require('../models/User');

// GraphQLTypes
const { UserType, RunType, ShoeType } = require('./TypeDefs');

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

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    users: {
      type: GraphQLList(UserType),
      async resolve(parent, args) {
        // Potentially add isAdmin property to user
        // schema to be allowed to use this query
        return await User.find();
      }
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      async resolve(_, args) {
        return await User.findById(args.id);
      }
    },
    run: {
      type: RunType,
      args: { id: { type: GraphQLID } },
      async resolve(_, args) {
        return await Run.findById(args.id);
      }
    },
    runs: {
      type: GraphQLList(RunType),
      async resolve(parent, _) {
        return await Run.find({ userId: parent._id });
      }
    },
    shoe: {
      type: ShoeType,
      args: { id: { type: GraphQLID } },
      async resolve(_, args) {
        return await Shoe.findById(args.id);
      }
    },
    shoes: {
      type: GraphQLList(ShoeType),
      async resolve(parent, _) {
        return await Shoe.find({ ownerId: parent._id });
      }
    },
    owner: {
      type: UserType,
      async resolve(parent, _) {
        return await User.findById(parent.ownerId);
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
      async resolve(_, args) {
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
      async resolve(_, args) {
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
        return await user.save();
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
      async resolve(_, args) {
        const { brand, model, size, distance, ownerId } = args;
        const shoe = new Shoe({
          brand,
          model,
          size,
          distance,
          ownerId
        });
        return await shoe.save();
      }
    },
    addDistanceToShoe: {
      type: ShoeType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        distance: { type: new GraphQLNonNull(GraphQLFloat) }
      },
      async resolve(parent, args) {
        await Shoe.findByIdAndUpdate(
          { _id: args.id },
          { $inc: { distance: args.distance } }
        );
        return await Shoe.findById(args.id);
      }
    },
    deleteUser: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      async resolve(_, args) {
        return await User.findByIdAndDelete(args.id);
      }
    },
    updateUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        email: { type: GraphQLString },
        fname: { type: GraphQLString },
        lname: { type: GraphQLString },
        age: { type: GraphQLInt },
        height: { type: GraphQLInt },
        weight: { type: GraphQLFloat },
        measurementSystem: { type: GraphQLString }
      },
      async resolve(_, args) {
        let updates = {
          email: args.email,
          fname: args.fname,
          lname: args.lname,
          age: args.age,
          height: args.height,
          weight: args.weight,
          measurementSystem: args.measurementSystem
        };
        Object.keys(updates).forEach(
          key => updates[key] == null && delete updates[key]
        );
        return await User.findByIdAndUpdate({ _id: args.id }, updates, {
          new: true
        });
      }
    },
    updateRun: {
      type: RunType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        distance: { type: GraphQLFloat },
        time: { type: GraphQLString },
        location: { type: GraphQLString },
        timeOfDay: { type: GraphQLString },
        shoeId: { type: GraphQLID },
        userId: { type: GraphQLID }
      },
      async resolve(_, args) {
        let updates = {
          distance: args.distance,
          time: args.time,
          location: args.location,
          timeOfDay: args.timeOfDay,
          shoeId: args.shoeId,
          userId: args.userId
        };
        Object.keys(updates).forEach(
          key => updates[key] == null && delete updates[key]
        );
        return await Run.findByIdAndUpdate({ _id: args.id }, updates, {
          new: true
        });
      }
    },
    updateShoe: {
      type: ShoeType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        brand: { type: GraphQLString },
        model: { type: GraphQLString },
        size: { type: GraphQLFloat },
        distance: { type: GraphQLFloat },
        ownerId: { type: GraphQLID }
      },
      async resolve(_, args) {
        let updates = {
          brand: args.brand,
          model: args.model,
          size: args.size,
          distance: args.distance,
          ownerId: args.ownerId
        };
        Object.keys(updates).forEach(
          key => updates[key] == null && delete updates[key]
        );
        return await Shoe.findByIdAndUpdate({ _id: args.id }, updates, {
          new: true
        });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
