// node built-in
const path = require('path');

// imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// utils
const config = require('./utils/config');
const middleware = require('./utils/middleware');

// controllers
const usersRouter = require('./controllers/users');
const productsRouter = require('./controllers/products');
const reviewsRouter = require('./controllers/reviews');
const ordersRouter = require('./controllers/orders');
const cartItemsRouter = require('./controllers/cartItems');
const cartsRouter = require('./controllers/carts');
const billingsRouter = require('./controllers/billings');
const loginRouter = require('./controllers/login');
const signupRouter = require('./controllers/signup');
const adminsRouter = require('./controllers/admins');

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


// view engine
app.set('view engine', 'ejs');

// middlewares
app.use(express.json());
app.use(cors());

app.get('/', (request, response) => {
  response.render('index');
})

// route handlers
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/cartItems', cartItemsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/billings', billingsRouter);
app.use('/api/login', loginRouter);
app.use('/api/signup', signupRouter);
app.use('/api/admins', adminsRouter);

// static files
// app.use(express.static(path.join(__dirname, '/public/views')));
app.use(express.static(path.join(__dirname, '/public/styles')));
app.use(express.static(path.join(__dirname, '/public/scripts')));
app.use(express.static(path.join(__dirname, '/public/assets')));

// unknown endpoints | error handler
app.use(middleware.unknownEndpoints);
app.use(middleware.errorHandler);



module.exports = app;