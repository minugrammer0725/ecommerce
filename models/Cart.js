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

cartSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
})

module.exports = mongoose.model('Cart', cartSchema);


