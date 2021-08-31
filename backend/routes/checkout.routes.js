const express = require("express");
const router = express.Router();
const Book = require("../models/books.model");
const User = require("../models/users.model");

router.route("/checkout/:id").patch((req, res) => {
  const custID = req.params.id;
  const books = req.body;
  books.map((book) => {
    Book.updateOne({ _id: book._id }, { $set: { ...book } }, (err) => {
      if (err) {
        res.status(403).json({ msg: "Unable to update book's details" });
      }
    });
    if (book?.sellerID === custID) {
      User.updateOne(
        { _id: book.sellerID },
        { $push: { soldList: book, boughtList: book } },
        (err) => {
          if (err) {
            res
              .status(403)
              .json({ msg: "Unable to update Sold list details!", error: err });
          } else {
            res.status(200).json({ msg: "Successfully updated List" });
          }
        }
      );
    }
  });
  User.updateOne({ _id: custID }, { $push: { boughtList: books } }, (err) => {
    if (err) {
      res
        .status(400)
        .json({ msg: "Unable to update cliend history", error: err });
    } else {
      res.status(200).json({ msg: "Books successfully set for Delivery!" });
    }
  });
});

module.exports = router;
