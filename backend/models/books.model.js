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
