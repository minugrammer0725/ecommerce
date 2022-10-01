const cartsRouter = require('express').Router();

const Cart = require('../models/Cart');

cartsRouter.get('/:userId', async (request, response) => {
  // return a cart for specified user
  const {userId} = request.params;
  if (!userId) response.status(400).send({error: "missing user id"});

  try {
    const cart = await Cart.find({user: userId});
    response.status(200).json(cart);
  } catch (error) {
    console.log(error);
  }

})

cartsRouter.post('/', async (request, response) => {
  // creates a new cart for user (triggered after POST /api/users)
  
  // empty items array, no billing info yet.
  const {user} = request.body;

  try {
    const newCart = new Cart({
      user
    });
    
    const createdCart = await newCart.save();
    response.status(201).json(createdCart);
    
  } catch (error) {
    console.log(error);
  }

})

cartsRouter.put('/:cartId', async (request, response) => {
  // update cart (adding cart item, update billing info)

  const {cartId} = request.params;
  if (!cartId) response.status(400).send({error: "missing cart id"});
  console.log('cart id:', cartId);

  try {
    const newCart = request.body;
    console.log('new cart:', newCart);
    const updatedCart = await Cart.findByIdAndUpdate(cartId, newCart, {new: true});
    console.log('updated!', updatedCart);
    response.status(200).json(updatedCart); 

  } catch (error) {
    console.log(error);
  }

})


module.exports = cartsRouter;