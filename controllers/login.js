const loginRouter = require('express').Router();

const User = require('../models/User');
const config = require('../utils/config');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

loginRouter.post('/', async (request, response) => {
  // verify and login user.
  // If valid credential, attach a jwt to response headers.

  const {username, password} = request.body;
  if (!username || !password) response.status(400).send({error: "missing user credential"});

  try {
    const user = await User.findOne({username});
    // redirect to login page?
    if (!user) response.status(400).send({error: "invalid user credential"});

    const match = await bcrypt.compare(password, user.password);
    if (!match) response.status(400).send({error: "invalid user credential"}); 

    // valid user credential, generate and give jwt.
    const userToken = {
      ...request.body,
      id: user._id
    };

    const token = jwt.sign(userToken, config.JWT_KEY);
    // 3rd param: {expiresIn: 3600}
    response.status(200).send({token, user});

  } catch (error) {
    console.log(error);
  } 

})

module.exports = loginRouter;