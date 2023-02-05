const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");
const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => {
        new Types.ObjectId();
      },
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Data,
      default: Data.now,
      get: (createdAtVal) => {
        dateFormat(createdAtVal);
      },
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const ThoughtSchema =
  ({
    thoughtText: {
      type: String,
      required: "thoughtText is required",
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },

    userName: {
      type: String,
      unique: true,
      required: "Username is Required",
    },
    reaction: [ReactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  });
ThoughtSchema.virtuals("reactionCount").get(function () {
  return this.reaction.length;
});

const Thought = model("Thought", ThoughtSchema);
module.exports = Thought;
