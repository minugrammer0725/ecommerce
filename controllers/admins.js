const adminsRouter = require('express').Router();

const User = require('../models/User');
const Order = require('../models/Order');

adminsRouter.get('/users', async (request, response) => {
  // return all user data
  try {
    const allUsers = await User.find({});
    response.status(200).json(allUsers); 

  } catch (error) {
    console.log(error);
  }
})

adminsRouter.get('/requests', async (request, response) => {
  // return all requests
  // requests => 'Pending' orders
  try {
    const orders = await Order.find({});
    const allRequests = orders.filter((order) => order.status === 'Pending');
    response.status(200).json(allRequests);

  } catch (error) {
    console.log(error);
  }
})

adminsRouter.put('/requests/:requestId', async (request, response) => {
  // update a request status ('Approved', 'Rejected')
  const {requestId} = request.params;
  const {status} = request.body;
  
  try {
    const updatedRequest = await Order.findByIdAndUpdate(requestId, {status}, {new: true});
    response.status(200).json(updatedRequest);

  } catch (error) {
    console.log(error);
  }

})

module.exports = adminsRouter;