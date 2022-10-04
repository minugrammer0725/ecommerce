const ordersRouter = require('express').Router();

const Order = require('../models/Order');


// USE WITH CAUTION
ordersRouter.get('/', async (request, response) => {
  // return all orders..!
  try {
    const orders = await Order.find({});
    response.status(200).json(orders);
  } catch (error) {
    console.log(error);
  }
})

ordersRouter.get('/user/:userId', async (request, response) => {
  // return orders for a specific user
  const {userId} = request.params;
  if (!userId) response.status(400).send({error: "missing user id"});

  try {
    const ordersFromUser = await Order.find({user: userId});
    response.render('order', {
      data: ordersFromUser
    });
  } catch (error) {
    console.log(error);
  }
})

ordersRouter.get('/:orderId', async (request, response) => {
  // return a specific order
  const {orderId} = request.params;
  if (!orderId) response.status(400).send({error: "missing order id"});

  try {
    const order = await Order.findById(orderId);
    response.status(200).json(order);
  } catch (error) {
    console.log(error);
  }

})

ordersRouter.post('/', async (request, response) => {
  // creates a new order
  const {user} = request.body;
  // TODO: missing params => items: [id], billing: id, totalPrice: number
  // totalPrice => calculated by going through each items.
  try {
    
    const newOrder = new Order({
      user,
      status: "Pending"    
    });

    const createdOrder = await newOrder.save();
    response.status(201).json(createdOrder);

  } catch (error) {
    console.log(error);
  }
})


module.exports = ordersRouter;