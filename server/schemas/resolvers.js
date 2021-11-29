const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const Data = await User.findOne({ _id: context.user._id }).select('-__v -password');
        return Data;
      }
      throw new AuthenticationError('Not logged in');
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPassword = await user.isCorrectPassword(password);

      if (!correctPassword) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, { Data }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id }
          , { $push: { savedBooks: Data } }
          , { new: true }
        );

        return updatedUser;
      }
      throw new AuthenticationError('You need to log in!');
    },
    removeBook: async (parent, { book }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id }
          , { $pull: { savedBooks: { book } } }
          , { new: true }
        );

        return updatedUser;
      }

      throw new AuthenticationError('You need to log in!');
    },
  },
};

module.exports = resolvers;
