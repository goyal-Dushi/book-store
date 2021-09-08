const mongoose = require("mongoose");
const Book = require("./books.model");
const passportLocalMongoose = require("passport-local-mongoose");

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
    type: [Book.schema],
  },
  soldList: {
    type: [Book.schema],
  },
  isSeller: {
    type: Boolean,
    required: true,
  },
});

UserSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", UserSchema);

module.exports = User;
