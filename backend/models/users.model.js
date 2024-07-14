const mongoose = require("mongoose");
// const Book = require("./books.model");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  boughtList: {
    type: Array,
  },
  soldList: {
    type: Array,
  },
  isSeller: {
    type: Boolean,
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
