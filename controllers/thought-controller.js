const { Thought, User } = require("../models");

const thoughtController = {
  // get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .populate({
        path: "reactions",
      })
      .sort({ createdAt: -1 })
      .then((thoughtData) => res.json(thoughtData))
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },

  //get thought by ID
  getThoughtById({ params }, res) {
    Thought.findById(params.thoughtId)
      .populate({
        path: "reactions",
      })
      .then((thoughtData) => {
        if (!thoughtData) {
          return res
            .status(404)
            .json({ message: "No thought found with this id!" });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },
  // create new thought
  createThought({ body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { username: body.username },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "Thought created successfully" });
      });
  },

  //update thought by ID

  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId }, body, {
      new: true,
      runValidators: true,
    })
      .then((thoughtData) => {
        if (!thoughtData) {
          return res
            .status(404)
            .json({ message: "No thought found with this id!" });
        }
        res.json({ message: "Thought updated successfully!" });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },

  //delete thought by id
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then((thoughtData) => {
        if (!thoughtData) {
          return res
            .status(404)
            .json({ message: "No thought found with this id! " });
        }
        return User.findOneAndUpdate(
          { username: thoughtData.username },
          { $pull: { thoughts: params.thoughtId } },
          { new: true }
        );
      })
      .then((userData) => {
        if (!userData) {
          return res
            .status(404)
            .json({ message: "No user found with this id" });
        }
        res.json({ message: "Thought deleted successfully" });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },

  // add reaction to thought by id

  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .populate({
        path: "reactions",
      })
      .then((thoughtData) => {
        res.json(thoughtData);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },
};
