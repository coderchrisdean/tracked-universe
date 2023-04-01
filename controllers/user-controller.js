const User  = require("../models/User");

module.exports = {
  // get all users
  getAllUsers(req, res) {
    User.find()
      .populate({
        path: "thoughts",
      })
      .populate({
        path: "friends",
      })
      .sort({ _id: -1 })
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  // get one user by id
  getUserById(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate({
        path: "thoughts",
      })
      .populate({
        path: "friends",
      })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "No user with that ID" });
        }
        res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },

  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  // update a user by id
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "No user with that ID" });
        }
        res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },

// delete a user by id
deleteUser(req, res) {
  User.findOneAndDelete({ _id: req.params.id })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }
      res.json({ message: "User deleted successfully!" });
    })
    .catch((err) => res.json(err));
},

  // add a friend to friend array
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $push: { friends: req.body.friendId } },
      { new: true, runValidators: true }
    )
      .populate({
        path: "friends",
      })
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },

  // remove a friend from user
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .populate({
        path: "friends",
      })
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No user found" });
          return;
        }
        res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  }
  
};
