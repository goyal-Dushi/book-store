const express = require("express");
const router = express.Router();
const Book = require("../models/books.model");

router.route("/").get((req, res) => {
  Book.find((err, data) => {
    if (err) {
      res.status(400).json({ msg: "Not able to find books", error: err });
    } else {
      res.status(200).json({ books: data });
    }
  });
});

router.route("/add").post((req, res) => {
  const bookDetails = req.body;
  Book.create(bookDetails, (err) => {
    if (err) {
      res.status(400).json({ msg: "Not able to add book!", error: err });
    } else {
      res.status(200).json({ msg: "Book added successfully" });
    }
  });
});

router.route("/edit/:id").patch((req, res) => {
  const editData = req.body;
  const id = req.params.id;
  Book.updateOne({ _id: id }, { $set: { ...editData } }, (err) => {
    if (err) {
      res.status(400).json({ msg: "Book update error", error: err });
    } else {
      res.status(200).json({ msg: "Book details updated Successfully!" });
    }
  });
});

module.exports = router;
