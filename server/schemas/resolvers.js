// require AuthError from Apollo-Server-Express
const { AuthenticationError } = require('apollo-server-express');
// import User from models
const { User } = require('../models');
// require signToken from utils
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            // conditional check for existing User
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id }).select(
                    "-__v -password"
                );
                return userData;
            }
            throw new AuthenticationError("User is not logged in! Please login.");
        },
    },

    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            // conditional check for existing user with email
            if (!user) {
                throw new AuthenticationError("Email is incorrect/not found.")
            }
            const correctPassword = await user.isCorrectPassword(password);
            // conditional check for matching password to user
            if (!correctPassword) {
                throw new AuthenticationError("Password is incorrect.");
            }
            const token = signToken(user);
            return { token, user };
        },
        // use token and user id to create new User
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user }
        },
        
        saveBook: async (parent, { input }, context) => {
            // conditional check if user is logged in to save book in relation to user
            if (context.user) {
                const updatedUser =  await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: input }},
                    { 
                        new: true, 
                        runValidators: true
                    }
                );
                return updatedUser;
            }
            throw new AuthenticationError("User is not logged in! Please login.");
        },

        removeBook: async (parent, { bookId }, context) => {
            // conditional check if user is logged in to save book in relation to user
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId: bookId }}},
                    { new: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError("User is not logged in! Please login.");
        },
    },
};

// export module as Resolvers
module.exports = resolvers;