const Book = require("../models/books.model");

const add_book = (req, res) => {
  const bookDetails = req.body;
  Book.create(bookDetails, (err) => {
    if (err) {
      res.status(400).json({ msg: "Not able to add book!", error: err });
    } else {
      res.status(200).json({ msg: "Book added successfully" });
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
      res.status(200).json({ msg: "Book details updated Successfully!" });
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

module.exports = {
  add_book,
  edit_book,
  delete_book,
  getAll_books,
};
