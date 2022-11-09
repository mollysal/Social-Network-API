const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction,
} = require("../../controllers/ThoughtController")

// /api/Thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/Thoughts/:ThoughtId
router.route('/:ThoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/Thoughts/:ThoughtID/thoughts/:thoughtId
router.route('/:ThoughtID/thoughts/:thoughtsId').post(createReaction).delete(deleteReaction);

module.exports = router; 