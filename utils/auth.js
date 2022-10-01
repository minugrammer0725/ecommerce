const jwt = require('jsonwebtoken');
const config = require('./config');

const authJWT = async (request, response, next) => {
  // incoming request will send a json token in a cookie.
  const userToken = request.cookies.JWT;
  
      // Set JWT cookie from frontend logic.
      // document.cookie = `JWT=${jwt}`;

  try {
    // jwt.verify() returns decoded userToken payload
    const {token, user} = jwt.verify(userToken, config.JWT_KEY);
    console.log(`user ${user.username} verified.`);
    console.log(`token: ${token}`);
    next();
  } catch (error) {
    console.log(error);
    response.status(400).send({error: "invalid jwt token"});
    // redirect to login page! {redirect: './login.html'}
  }
}


module.exports = {
  authJWT,
}