// imports
const express = require('express');
const mongoose = require('mongoose');
// const cookies = require('cookie-parser');

// utils
const config = require('./utils/config');
const middleware = require('./utils/middleware');

// controllers
const usersRouter = require('./controllers/users');
const productsRouter = require('./controllers/products');
const reviewsRouter = require('./controllers/reviews');
const ordersRouter = require('./controllers/orders');


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
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/orders', ordersRouter);


// static files
// app.use(express.static(...));

// unknown endpoints | error handler
app.use(middleware.unknownEndpoints);
app.use(middleware.errorHandler);



module.exports = app;