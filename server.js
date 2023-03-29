const express = require('express');
const mongoose = require('mongoose');

//initialize express app
const app = express();
const PORT = process.env.PORT || 3001;

// middleware

app.use(express.json());

// mongoose configuration

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/tracked-universe', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

// use routes

app.use(require('./routes'));

// server start

app.listeners(PORT, () => {
    console.log('server started on port ${PORT}');
});
