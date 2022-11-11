const { User, Thought } = require('../models');
const { ObjectId } = require('mongoose').Types;

module.exports = {
    // Get all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err))
    },
    // Get a single thought by _id
    getSingleThought(req, res) {
        Thought.findOne(
            { _id: req.params.thoughtId }

        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No Thought found with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Create (POST) thought (push _id to user's thought's array)
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: thought._id } },
                    { new: true }
                )
            })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'Thought created, but found no user with that ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Update (PUT) thought by _id
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No Thought found with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Delete thought by _id
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No Thought found with that ID' })
                    : res.json(thought)
            )
            .then(() => res.json({ message: 'Thought deleted.' }))
            .catch((err) => res.status(500).json(err));
    },
    // Create (POST) reaction in single thought's reaction array
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No Thought found with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Delete reaction by reactionID 
    deleteReaction(req, res) {
        // Reference Activity 25 videoController.js
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No Thought found with that ID!' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    }
}