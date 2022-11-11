const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const { format_date, format_time } = require('../utils/helper');

// Schema to create Student model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createAt: {
            type: Date,
            default: Date.now(),
            get: format_time,
            // Use a getter method to format the timestamp on query
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

// Virtual retrieves the length of the user's friends array field on query.
// Reference Activity 21
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
})

const Thought = model('thought', thoughtSchema);

module.exports = Thought;