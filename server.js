const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

//initialize express app
const app = express();
const PORT = process.env.PORT || 3002;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use routes
app.use(routes);

// mongoose configuration
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/socialmediaDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


// server start
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
