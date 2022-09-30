const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  cart: {
    type: Schema.Types.ObjectId,
    ref: "Cart",
    required: true
  }
});

module.exports = mongoose.model('CartItem', cartItemSchema);


