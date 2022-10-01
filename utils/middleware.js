const unknownEndpoints = (request, response, next) => {
  response.status(404).send({error: "404 Unknown Endpoint"});
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
}