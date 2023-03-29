const router = require('express').Router();
const { getAllThoughts, getThoughtById, createThought, updateThought, deleteThought, addReaction, deleteReaction } = require('../controllers/thought-controller');


//thought routes
router.route('/')
    .get(getAllThoughts) //get all thoughts
    .post(createThought); //post new thought

router.route('/:thoughtId')
    .get(getThoughtById) // get thought by Id
    .put(updateThought) //update thought by Id
    .delete(deleteThought); //remove thought by Id

router.route('/thoughtId/reactions')
    .post(addReaction)  //create reaction stored in a single thoughts reactions array
    .delete(deleteReaction); // pull and remove reaction by reactions reactionId value

module.exports = router;
