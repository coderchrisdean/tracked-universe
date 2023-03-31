const express = require('express');
const db = require('./config/connection')
const routes = require('./routes');

//initialize express app
const app = express();
const PORT = process.env.PORT || 3002;

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Use routes
app.use(routes);

// mongoose configuration
db.once('open', () => {
  
// server start
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
  });
});
