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

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// MAKE SURE thought is 't' is lowercase
// /api/Thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/Thoughts/:thoughtID/reactions
router.route('/:thoughtId/reactions').post(createReaction)

// /api/Thoughts/:thoughtID/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router; 