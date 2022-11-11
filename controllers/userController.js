const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
    // Get All Users
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    // Get a single User by its _ID
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .then((user) =>
                !user ? res.status(404).json({ message: 'No User found with that ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Create(POST) a new User
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err))
    },
    // Update (PUT) a new User by its _ID
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user ? res.status(404).json({ message: 'No user found with this ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Remove (DELETE) a User by its _ID
    deleteUser(req, res) {
        User.findOneAndDelete(
            { _id: req.params.userId }
        )
            .then((user) =>
                !user ? res.status(404).json({ message: 'No user found with this ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // BONUS
    //   Remove a User's Thoughts when Deleted

    // Add a friend
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $push: { friends: req.params.friendsId } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user found with this ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    // Delete a friend
    // deleteFriend(req, res) {
    //     User.findOneAndUpdate(
    //         { _id: req.params.userId },
    //         { $pull: { friends: { friendsId: req.params.friendsId } } },
    //         { runValidators: true, new: true }
    //     )
    //         .then((user) =>
    //             !user
    //                 ? res.status(404).json({ message: 'No user found with this ID' })
    //                 : res.json(user)
    //         )
    //         .catch((err) => res.status(500).json(err));
    // },

      // Remove assignment from a student
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends:  req.params.friendsId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No user found with that ID :(' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
}