const mongoose = require("mongoose");
const Book = require("./books.model");

const UserSchema = new mongoose.Schema({
  name: {
    type: "String",
    required: true,
  },
  email: {
    type: "String",
    required: true,
  },
  password: {
    type: "String",
    required: true,
  },
  boughtList: {
    type: [Book.schema],
  },
  soldList: {
    type: [Book.schema],
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
