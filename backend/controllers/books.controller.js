const mongoose = require('mongoose');
const Book = require('../models/books.model');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const User = require('../models/users.model');

const add_book = async (req, res, next) => {
  const { bookData, id: userId } = req.body;

  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      next(
        new ApiError({
          statusCode: 404,
          message: 'Not able to find the user with given id',
        })
      );
    }

    const book = await Book.create({ ...bookData, seller: userId });

    user.bookList.push(new mongoose.Types.ObjectId(book._id));
    await user.save();

    res.status(201).json(
      new ApiResponse({
        statusCode: 201,
        message: `Book ${bookData.name} successfully added!`,
        data: book,
      })
    );
  } catch (err) {
    next(
      new ApiError({
        statusCode: 500,
        errors: err.errors,
        message: `Not able to add book ${bookData?.name}, ${err} occurred!`,
      })
    );
  }
};

const edit_book = async (req, res, next) => {
  try {
    const { editData } = req.body;
    const id = req.params.id;

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

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { ...editData },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    ).lean();

    if (!updatedBook) {
      return next(
        new ApiError({
          statusCode: 404,
          message: 'Book not found!',
        })
      );
    }

    res.status(201).json(
      new ApiResponse({
        data: updatedBook,
        statusCode: 201,
        message: 'Book details updated Successfully!',
      })
    );
  } catch (err) {
    next(
      new ApiError({
        statusCode: 500,
        errors: err,
        message:
          'Unfortunately, book cannot be updated right now. Please try again later!',
      })
    );
  }
};

const delete_book = async (req, res, next) => {
  try {
    const bookId = req.params.id;
    const userId = req.body.userId;

    if (!bookId || !userId) {
      return next(
        new ApiError({
          statusCode: 400,
          message: 'Not enough data to process the request!',
        })
      );
    }

    await Book.findByIdAndDelete(bookId);

    const user = await User.findOne({ _id: userId });
    user.bookList = user.bookList.filter((item) => item.toString() !== bookId);

    await user.save();

    res
      .status(204)
      .json(new ApiResponse({ message: 'Successfully removed book' }));
  } catch (err) {
    console.error(err);
    next(
      new ApiError({
        statusCode: 401,
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

const get_books_by_seller = async (req, res, next) => {
  try {
    const id = req.params.id;
    // get seller bookList details using popuplate
    const seller = await User.findOne({ _id: id }).populate('bookList').exec();
    // return all the books
    res.status(200).json(
      new ApiResponse({
        data: seller.bookList,
        message: `Fetched all books for seller ${seller.username}`,
      })
    );
  } catch (err) {
    next(
      new ApiError({
        statusCode: 400,
        message: 'Not able to fetch books for the seller',
      })
    );
  }
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
