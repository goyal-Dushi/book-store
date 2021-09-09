const express = require("express");
const router = express.Router();
const booksController = require("../controllers/books.controller");
const Book = require("../models/books.model");

router.route("/").get(booksController.getAll_books);
router.route("/add").post(booksController.add_book);
router.route("/edit/:id").patch(booksController.edit_book);
router.route("/delete/:id").delete(booksController.delete_book);

router.route("/:id").get((req, res) => {
  const id = req.params.id;

  Book.find({ sellerID: id }, (err, data) => {
    if (err) {
      res
        .status(400)
        .json({ msg: "Not able to fetch seller's books", error: err });
    } else {
      res.status(200).json({ data });
    }
  });
});

module.exports = router;
