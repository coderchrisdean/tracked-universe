const mongoose = require('mongoose');
const User = require('../models/User');

const seed = [
  {
    username: 'coderchrisdean',
    email: 'john.doe@example.com',
    age: 30,
  },
  {
    username: 'coderjanesmith',
    email: 'jane.smith@example.com',
    age: 29,
  },

];


const mongodb = 'mongodb://127.0.0.1:27018/socialmediaDB';

mongoose
  .connect(mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB...');
    return User.deleteMany();
  })
  .then(() => {
    return User.insertMany(seed);
  })
  .then((users) => {
    console.log('Seed data added successfully:', users);
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error('Error seeding data:', error);
    mongoose.connection.close();
  });
