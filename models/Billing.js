const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const billingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phone: Number,
  email:  {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  zipcode: {
    type: Number,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  method: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Billing', billingSchema);