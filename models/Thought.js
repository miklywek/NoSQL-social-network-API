const { Schema, model } = require("mongoose");
const thoughtSchema = {
  thoughtText: {
    type: String,
    required: "thoughtText is required",
    minLength: 1,
    maxLength: 280,
  },
  createdAt: {
    type: Date,
    default: Data.now,
  },
};
const Thought = model("Thought", thoughtSchema);
module.exports = Thought;
