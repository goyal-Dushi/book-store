const mongoose = require('mongoose');
const Book = require('../models/books.model');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');

const add_book = async (req, res, next) => {
  const bookDetails = req.body;

  try {
    await Book.create(bookDetails);
    res.status(201).json(
      new ApiResponse({
        statusCode: 201,
        message: `Book ${bookDetails.name} successfully added!`,
      })
    );
  } catch (err) {
    next(
      new ApiError({
        statusCode: 400,
        errors: err.errors,
        message: `Not able to add book ${bookDetails.name}, ${err} occurred!`,
      })
    );
  }
};

const edit_book = async (req, res, next) => {
  const editData = req.body;
  const id = req.params.id;

  console.log('edit data: ', editData);

  if (!editData || !Object.keys(editData).length || !id) {
    return next(
      new ApiError({
        statusCode: 400,
        message: 'Failed to updated Book data. Please try again later!',
      })
    );
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(
      new ApiError({
        statusCode: 400,
        message: 'Invalid book ID!',
      })
    );
  }

  try {
    await Book.updateOne({ _id: id }, { $set: { ...editData } });
    res.status(201).json(
      new ApiResponse({
        statusCode: 201,
        message: 'Book details updated Successfully!',
      })
    );
  } catch (err) {
    next(
      new ApiError({
        statusCode: 400,
        errors: err,
        message:
          'Unfortunately, book cannot be updated right now. Please try again later!',
      })
    );
  }
};

const delete_book = async (req, res, next) => {
  const id = req.params.id;

  try {
    await Book.findByIdAndDelete(id);
    res
      .status(402)
      .json(new ApiResponse({ message: `Successfully removed ${data.name}` }));
  } catch (err) {
    next(
      new ApiError({
        statusCode: 402,
        message: 'Book delete Error',
        errors: err.errors,
      })
    );
  }
};

const getAll_books = async (req, res, next) => {
  try {
    const books = await Book.find();
    res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: 'All books being returned!',
        data: books,
      })
    );
  } catch (err) {
    next(
      new ApiError({
        stack: err.stack,
        statusCode: 400,
        message: 'Not able to fetch all the books',
        errors: err,
      })
    );
  }
};

const get_books_by_seller = (req, res) => {
  const id = req.params.id;

  Book.find({ sellerID: id }, (err, data) => {
    if (err) {
      res
        .status(400)
        .json({ msg: "Not able to fetch seller's books", error: err });
    } else if (!data) {
      res.status(200).json({
        status: false,
      });
    } else {
      res.status(200).json({ status: true, data: data });
    }
  });
};

const get_particular_book = async (req, res, next) => {
  const id = req.params.id;
  await Book.findOne({ _id: id })
    .then((data) => {
      res.status(200).json(new ApiResponse({ data }));
    })
    .catch((err) => {
      next(
        new ApiError({
          statusCode: 400,
          message: 'Book not found',
          errors: err,
        })
      );
    });
};

module.exports = {
  add_book,
  edit_book,
  delete_book,
  getAll_books,
  get_books_by_seller,
  get_particular_book,
};
