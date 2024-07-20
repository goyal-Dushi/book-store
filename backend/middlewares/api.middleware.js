const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');

async function apiMiddleware(req, res, next) {
  try {
    const token = req.cookies.token;
    if(!token){
      return next(new ApiError({
        statusCode: 403,
        message: "Token not found!",
      }));
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY);
    next();
  } catch (err) {
    res.clearCookie('token');

    next(
      new ApiError({
        statusCode: 401,
        type: 'danger',
      })
    );
  }
}

module.exports = apiMiddleware;
