const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    minLength: 2,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    minLength: 2,
    required: true
  },
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Order' 
    }
  ],
  cart: {
    type: Schema.Types.ObjectId,
    ref: 'Cart'
  },
  isAdmin: {
    type: Boolean,
    required: true
  }
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  }
})



module.exports = mongoose.model('User', userSchema);