const db = require('../config/connection');
const User = require('../models/User');
const Thought = require('../models/Thought');

db.once('open', async () => {
  try {
    // remove all existing data
    await User.deleteMany({});
    await Thought.deleteMany({});

    // create users and thoughts
    const users = await User.create([
      {
        username: 'coderchrisdean',
        email: 'coderchrisdean@example.com',
        thoughts: [],
        friends: []
      },
      {
        username: 'coderjane',
        email: 'coderjane@example.com',
        thoughts: [],
        friends: []
      }
    ]);

    const thoughts = await Thought.create([
      {
        thoughtText: 'This is a test thought.',
        createdAt: new Date(),
        username: 'coderchrisdean',
        reactions: [
          { reactionBody: '👍', username: 'coderjane' },
          { reactionBody: '❤️', username: 'coderjane' },
        ],
      },
      {
        thoughtText: 'This is another test thought.',
        createdAt: new Date(),
        username: 'coderjane',
        reactions: [
          { reactionBody: '👍', username: 'coderchrisdean' },
          { reactionBody: '😀', username: 'coderchrisdean' },
          { reactionBody: '🤔', username: 'coderchrisdean' },
        ],
      },
    ]);

    // associate thoughts with users
    await User.updateOne({ username: 'coderjane' }, { $push: { thoughts: thoughts[0]._id } });
    await User.updateOne({ username: 'coderjane' }, { $push: { thoughts: thoughts[1]._id } });

    // add friends
    await User.updateOne({ username: 'coderchrisdean' }, { $push: { friends: users[1]._id } });
    await User.updateOne({ username: 'coderchrisdean' }, { $push: { friends: users[0]._id } });

    console.log('Data seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
});
