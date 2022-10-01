const usersRouter = require('express').Router();

const User = require('../models/User');
const config = require('../utils/config');

const bcrypt = require('bcrypt');


usersRouter.get('/:userId', async (request, response) => {
  // return a single user.
  const {userId} = request.params;
  if (!userId) {
    response.status(400).send({error: 'missing user id'});
  }

  try {
    const user = await User.findById(userId);
    response.status(200).json(user);
  } catch (error) {
    console.log(error);
  }

})

// USE THIS WITH CAUTION!
usersRouter.get('/', async (request, response) => {
  // check authorization...
  try {
    const allUsers = await User.find({});
    response.status(200).json(allUsers); 
  } catch (error) {
    console.log(error);  
  }
});

usersRouter.post('/', async (request, response) => {
  // create new user.
  const {username, email, password} = request.body;
  if (!username || !email || !password) {
    response.status(400).send({error: "missing user credential"});
  }
  
  try {
    const hashed = await bcrypt.hash(password, Number(config.SALT));
    const newUser = new User({
      username,
      email,
      password: hashed,
      isAdmin: false
    })

    const createdUser = await newUser.save();
    console.log('new user created!\n', createdUser);
    response.status(201).json(createdUser);
  } catch (error) {
    console.log(error);
  }
});

usersRouter.put('/:userId', async (request, response) => {
  // update user profile data(username?)
  const {userId} = request.params;
  if(!userId) response.status(400).send({error: "missing user id"});

  const newBlog = request.body;
  if(!newBlog) response.status(400).send({error: "missing request body"});

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, newBlog, {new: true});
    response.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
  }
})



module.exports = usersRouter;