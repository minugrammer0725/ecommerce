const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: 'CartItem'
    }
  ],
  billing: {
    type: Schema.Types.ObjectId,
    ref: 'Billing'
  },
  totalPrice: {
    type: Number
  }
});

module.exports = mongoose.model('Cart', cartSchema);


