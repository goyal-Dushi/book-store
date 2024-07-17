const mongoose = require('mongoose');
const { Schema } = mongoose;

const booksSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      index: true,
      minLength: [3],
      maxLength: [70],
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    soldOn: {
      type: Date,
    },
    price: {
      type: Number,
      required: true,
      max: 100000,
      min: 10,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model('Book', booksSchema);

module.exports = Book;
