const Book = require("../models/books.model");

const add_book = (req, res) => {
  const bookDetails = req.body;
  Book.create(bookDetails, (err) => {
    if (err) {
      res.status(400).json({ msg: "Not able to add book!", error: err });
    } else {
      res.status(201).json({ msg: "Book added successfully" });
    }
  });
};

const edit_book = (req, res) => {
  const editData = req.body;
  const id = req.params.id;
  Book.updateOne({ _id: id }, { $set: { ...editData } }, (err) => {
    if (err) {
      res.status(400).json({ msg: "Book update error", error: err });
    } else {
      res.status(201).json({ msg: "Book details updated Successfully!" });
    }
  });
};

const delete_book = (req, res) => {
  const id = req.params.id;

  Book.findByIdAndDelete(id, (err, data) => {
    if (err) {
      res.status(402).json({ msg: "Book delete Error", error: err });
    } else {
      res.status(200).json({ msg: `Successfully removed ${data.name}` });
    }
  });
};

const getAll_books = (req, res) => {
  Book.find((err, data) => {
    if (err) {
      res.status(400).json({ msg: "Not able to find books", error: err });
    } else {
      res.status(200).json({ data });
    }
  });
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

const get_particular_book = (req, res) => {
  const id = req.params.id;
  Book.findOne({ _id: id }, (err, data) => {
    if (err) {
      res.json({ msg: "Book not found" });
    } else {
      res.status(200).json({ data });
    }
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
