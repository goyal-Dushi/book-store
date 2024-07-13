const mongoose = require('mongoose');

const booksSchema = new mongoose.Schema(
  {
    name: {
      type: 'String',
      required: true,
    },
    sellerID: {
      type: 'ObjectId',
      required: false,
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
      required: false,
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

const Book = mongoose.model('Book', booksSchema);

module.exports = Book;
