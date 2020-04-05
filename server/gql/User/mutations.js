const User = require('../../models/User');

const mutation = `
  addUser(email: String!, password: String!, fname: String!, lname: String, age: Int, height: Int, weight: Float, measurementSystem: MeasurementSystem!, isAdmin: Boolean!): User
  deleteUser(id: ID!): User
  updateUser(id: ID!, email: String, password: String, fname: String, lname: String, age: Int, height: Int, weight: Float, measurementSystem: MeasurementSystem, isAdmin: Boolean): User
`;

const resolver = {
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
  }
};

module.exports = {
  mutation,
  mutationResolver: resolver
};
