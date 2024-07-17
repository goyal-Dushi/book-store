class ApiError extends Error {
  constructor({
    statusCode,
    stack,
    message = 'Error occurred!',
    errors = [],
    type = 'danger',
  }) {
    super(message);

    this.message = message;
    this.statusCode = statusCode;
    this.errors = errors;
    this.success = false;
    this.type = type;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = ApiError;
