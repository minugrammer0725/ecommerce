// imports
const express = require('express');
const mongoose = require('mongoose');
// const cookies = require('cookie-parser');

// utils
const config = require('./utils/config');

// controllers


// initialize app
const app = express();

// connect to mongodb
mongoose.connect(config.MONGO_URI)
  .then(() => {
    console.log('connected to mongodb!');
  })
  .catch((err) => {
    console.log(err);
  });


// middlewares
app.use(express.json());
// app.use(cookies());

// route handlers


// static files
// app.use(express.static(...));

// unknown endpoints | error handler



module.exports = app;