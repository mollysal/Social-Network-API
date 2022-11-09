const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Schema to create Student model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, "Please enter a valid email address."]
    },
    thoughts: [
        {
            type: Schema.Types.ObjectID,
            ref: "thought",
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectID,
            ref: "user",
        }
    ]
  },
  {
    toJSON: {
    virtuals: true,
      getters: true,
    },
  }
);

// Virtual retrieves the length of the user's friends array field on query.
// Reference Activity 21
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
})

const User = model('user', userSchema);

module.exports = User;