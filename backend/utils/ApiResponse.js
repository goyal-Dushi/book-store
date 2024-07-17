class ApiResponse {
  constructor({ statusCode = 200, message, data = null, type = 'success' }) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.type = type;
    this.success = this.statusCode < 400;
  }
}

module.exports = ApiResponse;
