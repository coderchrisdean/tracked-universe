const { getAllUsers, getUserById, createUser, updateUser, deleteUser, addFriend, deleteFriend } = require('../controllers/user-controller');

//api routes

router.route('/')
    .get(getAllUsers) // get all users
    .post(createUser); // post new user

router.route('/:userId')
    .get(getUserById) // get a single user by _id and populated thought and friend data
    .put(updateUser) // update user by _id
    .delete(deleteUser); // remove user by _id

router.route('/:userId/friends/:friendId')
    .post(addFriend) // add new friend to a user's friends list
    .delete(deleteFriend); // remove a friend from a user's friends list




module.exports = router;