const { Schema, Types } = require('mongoose');
const { format_date, format_time } = require('../utils/helper');

const reactionSchema = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: format_time,
            required: true,
        }
    }
);

module.exports = reactionSchema;