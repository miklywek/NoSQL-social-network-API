const { Thought, User } = require("../models");
const thoughtsController = {
  addThought({ params, body }, res) {
    Thought.create(body)
      .then((_id) => {
        return User.findByIdAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res
            .status(400)
            .json({ message: "Thought created but no user with this id!" });
        }
        return res.json({ message: "Thought successfully created!" });
      })
      .catch((err) => {
        res.json(err);
      });
  },
  addReaction({ params, body }, res) {
    Thought.findByIdAndUpdate(
      { _id: params.id },
      { $push: { reactions: body } },
      { new: true }
    )
      .then((dbUsertData) => {
        if (!dbUsertData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUsertData);
      })
      .catch((err) => res.json(err));
  },
  removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id }, body, {
      new: true,
    })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No User found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },
  removeReaction({ params }, res) {
    Thought.findOneAndDelete(
      { _id: params.id },
      {
        $pull: {
          reactions: {
            reactionId: params.reactionId,
          },
        },
      },
      { new: true }
    )
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtsController;
