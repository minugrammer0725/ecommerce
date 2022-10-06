const jwt = require('jsonwebtoken');

const config = require('../utils/config');

const unknownEndpoints = (request, response, next) => {
  response.render('redirect');
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }
  next()
}

const authJwt = (request, response, next) => {
  const token = request.token;
  console.log('User Auth: token ', token);

  try {
    jwt.verify(token, config.JWT_KEY);
    next();
  } catch (error) {
    console.log(error);
    response.send(error);
  }
}

const errorHandler = (error, request, response, next) => {
  console.log(error.message);
  if (error.name === 'CastError') {
    response.status(404).send({error: 'malformatted id'});
  } else if (error.name === 'ValidationError') {
    response.status(404).send({error: "Validation error"});
  } else if (error.name === 'JsonWebTokenError') {
    response.status(401).send({error: "invalid web token"});
  } else if (error.name === 'TokenExpiredError') {
    response.status(401).send({error: "token expired"});
  }
  next(error);
}

module.exports = {
  unknownEndpoints,
  errorHandler,
  authJwt,
  tokenExtractor
}