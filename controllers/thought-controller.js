const  Thought  = require("../models/Thought");

module.exports = {
    // get all thoughts
  getAllThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  //get thought by ID
  getThoughtById( req, res ) {
    Thought.findById(req.params.thoughtId)
        .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: "No thought found with this id!" });
        }
        res.json(thought); 
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },
  // create new thought
  createThought(req, res) {
    Thought.create(req.body)
    .then((thought) => res.json(thought))
    .catch(err => res.status(500).json(err));
  },

  //update thought by ID

  updateThought(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId }, 
        { $set: req.body },
        { runValidators: true, new: true },
      )
      .then((thought) => {
        if (!thought) {
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
  deleteThought( req,res ) {
    Thought.findByIdAndDelete(req.params.thoughtId)
      .then((thought) => {
        if (!thought) {
          return res
            .status(404).json({ message: "No thought found with this id! " });
        }
        res.json({ message: "Thought deleted successfully" });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },

// add reaction to thought by id
addReaction(req, res) {
  const { reactionBody } = req.body;
  Thought.findByIdAndUpdate(
    req.params.thoughtId,
    { $push: { reactions: { reactionBody } } },
    { new: true, runValidators: true }
  )
    .then((updatedThought) => {
      if (!updatedThought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }
      res.json(updatedThought);
    })
    .catch((err) => res.status(500).json(err));
},

  
  // remove reaction by reactionId
deleteReaction(req, res) {
  Thought.findByIdAndUpdate(
    req.params.thoughtId,
    { $pull: { reactions: { reactionId: req.params.reactionId } } },
    { runValidators: true, new: true }
  )
    .then((thought) => {
      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }
      res.json(thought);
    })
    .catch((err) => res.status(500).json(err));
} 
        
}
        
