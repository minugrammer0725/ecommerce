const cartItemsRouter = require('express').Router();

const CartItem = require('../models/CartItem');

cartItemsRouter.get('/:cartItemId', async (request, response) => {
  // return a single cart item
  const {cartItemId} = request.params;
  if (!cartItemId) response.status(400).send({error: "missing cart-item id"});

  try {
    const cart = await CartItem.findById(cartItemId);
    response.status(200).json(cart);
  } catch (error) {
    console.log(error);
  }

})

cartItemsRouter.post('/', async (request, response) => {
  // create a new cart item (product + qty)

  const {product, quantity, cart} = request.body;
  
  try {
    const newCartItem = new CartItem({
      product,
      quantity,
      cart
    })
    const createdCartItem = await newCartItem.save();
    response.status(201).json(createdCartItem);
  } catch (error) {
    console.log(error);
  }
})

module.exports = cartItemsRouter;