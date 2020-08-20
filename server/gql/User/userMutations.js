const User = require('../../models/User');
const filterUpdates = require('../utils');

const mutation = `
  addUser(email: String!, password: String!, fname: String, lname: String, birthday: String, gender: String, height: Int, weight: Float, measurementSystem: MeasurementSystem, isAdmin: Boolean, currentShoeId: ID): User
  deleteUser(id: ID!): User
  updateUser(id: ID!, email: String, password: String, fname: String, lname: String, birthday: String, gender: String, height: Int, weight: Float, measurementSystem: MeasurementSystem, isAdmin: Boolean, currentShoeId: ID): User
  setNewCurrentShoe(id: ID!, currentShoeId: ID!): User
`;

const resolver = {
  addUser: async (_, args) => {
    try {
      const user = new User({
        email: args.email,
        password: args.password,
        fname: args.fname,
        lname: args.lname,
        birthday: args.birthday,
        gender: args.gender,
        height: args.height,
        weight: args.weight,
        measurementSystem: args.measurementSystem,
        isAdmin: args.isAdmin,
        currentShoeId: args.currentShoeId
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
  deleteUser: async (_, args) => await User.findByIdAndDelete(args.id),
  updateUser: async (_, args) => {
    const inputs = {
      email: args.email,
      password: args.password,
      fname: args.fname,
      lname: args.lname,
      birthday: args.birthday,
      gender: args.gender,
      height: args.height,
      weight: args.weight,
      measurementSystem: args.measurementSystem,
      isAdmin: args.isAdmin,
      currentShoeId: args.currentShoeId
    };
    const updates = filterUpdates(inputs);
    return await User.findByIdAndUpdate({ _id: args.id }, updates, {
      new: true
    });
  },
  setNewCurrentShoe: async(_, args) => (
    await User.findByIdAndUpdate({ _id: args.id }, { currentShoeId: args.currentShoeId }, { new: true })
  )
};

module.exports = {
  mutation,
  mutationResolver: resolver
};
