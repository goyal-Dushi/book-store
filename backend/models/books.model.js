const mongoose = require("mongoose");

const booksSchema = new mongoose.Schema(
  {
    name: {
      type: "String",
      required: true,
    },
    sellerID: {
      type: "ObjectId",
      required: true,
    },
    sellerName: {
      type: String,
      required: true,
    },
    sellerAddress: {
      type: String,
      required: true,
    },
    isAvailable: {
      type: Boolean,
    },
    stock: {
      type: Number,
      required: true,
      trim: true,
    },
    soldOn: {
      type: Date,
    },
    price: {
      type: Number,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", booksSchema);

module.exports = Book;
