const ApiError = require('../utils/ApiError');

function errorMiddleware(err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      message: err.message,
      type: err.type,
      stack: err.stack,
      errors: err.errors,
    });
  }

  return res.status(500).json({
    message: 'Internal Server Error',
    statusCode: 500,
    errors: err.message,
  });
}

module.exports = errorMiddleware;
