const signupRouter = require('express').Router();

signupRouter.get('/', (request, response) => {
  response.render('signup');
});

module.exports = signupRouter;