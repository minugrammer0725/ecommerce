const cartItemsRouter = require('express').Router();

const Cart = require('../models/Cart');
const CartItem = require('../models/CartItem');

const {authJwt} = require('../utils/middleware');

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

// JWT Auth Needed => Only logged in user can add to cart
cartItemsRouter.post('/', authJwt, async (request, response) => {
  // create a new cart item (product + qty)

  const {product, quantity, cart} = request.body;
  
  try {
    const newCartItem = new CartItem({
      product,
      quantity,
      cart
    })
    const createdCartItem = await newCartItem.save();

    // push the cartItem to user's cart items array
    const userCart = await Cart.findById(newCartItem.cart);
    userCart.items = userCart.items.concat(newCartItem._id);
    await userCart.save();
    console.log('new cart item created successfully!');
    response.status(201).json(createdCartItem);
    
  } catch (error) {
    console.log(error);
  }
})

module.exports = cartItemsRouter;