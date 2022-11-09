const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction,
} = require("../../controllers/thoughtController")

// /api/Thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/Thoughts/:ThoughtId
router.route('/:ThoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/Thoughts/:ThoughtID/reactions
router.route('/:ThoughtId/reactions').post(createReaction)

// /api/Thoughts/:ThoughtID/reactions/:reactionId
router.route('/:ThoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router; 