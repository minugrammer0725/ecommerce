const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    required: true
  },
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: 'CartItem',
      required: true
    }
  ],
  billing: {
    type: Schema.Types.ObjectId,
    ref: "Billing",
    required: true
  },
  totalPrice: {
    type: Number  
  }
});

module.exports = mongoose.model('Order', orderSchema);


