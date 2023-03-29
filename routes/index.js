const router = require('express').Router(); // router for express
const { getAllUsers, getUserById, createUser, updateUser, deleteUser, addFriend, deleteFriend } = require('../controllers/user-controller');
const { getAllThoughts, getThoughtById, createThought, updateThought, deleteThought, addReaction, deleteReaction } = require('../controllers/thought-controller');

//api routes

router.route('/api/users')
    .get(getAllUsers) // get all users
    .post(createUser); // post new user

router.route('/api/users/:userId')
    .get(getUserById) // get a single user by _id and populated thought and friend data
    .put(updateUser) // update user by _id
    .delete(deleteUser); // remove user by _id

router.route('/api/users/:userId/friends/:friendId')
    .post(addFriend) // add new friend to a user's friends list
    .delete(deleteFriend); // remove a friend from a user's friends list


//thought routes
router.route('/api/thoughts')
    .get(getAllThoughts) //get all thoughts
    .post(createThought); //post new thought

router.route('/thoughts/:thoughtId')
    .get(getThoughtById) // get thought by Id
    .put(updateThought) //update thought by Id
    .delete(deleteThought); //remove thought by Id

router.route('/thoughts/:thoughtId/reactions')
    .post(addReaction)  //create reaction stored in a single thoughts reactions array
    .delete(deleteReaction); // pull and remove reaction by reactions reactionId value

module.exports = router;



