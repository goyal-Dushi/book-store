const mongoose = require("mongoose");

const booksSchema = new mongoose.Schema(
  {
    name: {
      type: "String",
      required: true,
    },
    sellerID: {
      type: "ObjectId",
      // required : true,
    },
    sellerName: {
      type: "String",
      required: true,
    },
    sellerAddress: {
      type: "String",
      required: true,
    },
    isAvailable: {
      type: "Boolean",
    },
    stock: {
      type: "Number",
    },
    soldOn: {
      type: "Date",
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", booksSchema);

module.exports = Book;
