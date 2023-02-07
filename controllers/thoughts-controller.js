const { Thought, User } = require("../models");
const thoughtsController = {
  getAllThoughts(req, res) {
    Thought.find({})
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  getAllThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({
        path: "reaction",
        select: "-__v",
      })
      .select("-__v")
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: "No thought with this id!" });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  createThought({ params, body }, res) {
    Thought.create(body)
      .then((data) => {
        return User.findByIdAndUpdate(
          { _id: params.id },
          { $push: { thoughts: data._id } },
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
  updateThought({ params, body }, res) {
    Thought.findByIdAndUpdate({ _id: params.id }, body, {
      new: true,
    })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true }
    )
      .then((dbUsertData) => {
        if (!dbUsertData) {
          res.status(404).json({ message: "No thoughtfound with this id!" });
          return;
        }
        res.json(dbUsertData);
      })
      .catch((err) => res.json(err));
  },
  removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
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
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtsController;
