const express = require("express");
const Book = require("../models/books.model");
const router = express.Router();
const User = require("../models/users.model");

router.route("/").get((req, res) => {
  User.find((err, data) => {
    if (err) {
      res.status(400).json({ msg: "Not able to get all users" });
    } else {
      res.status(200).json({ data });
    }
  });
});

router
  .route("/register")
  .get((req, res) => {
    console.log("User Registration page");
  })
  .post((req, res) => {
    const data = req.body;

    User.create(data, (err) => {
      if (err) {
        res.status(400).json({ msg: "Registration Error", error: err });
      } else {
        res.status(200).json({ msg: "User Registration Successful!" });
      }
    });
  });

router
  .route("/login")
  .get((req, res) => {
    console.log("User Login page");
  })
  .post((req, res) => {
    const loginData = req.body;

    User.find(loginData, (err, data) => {
      if (err) {
        res.status(400).json({ msg: "Login Error!", error: err });
      } else if (!data) {
        res.status(401).json({ msg: "Sorry, User not found!" });
      } else {
        res
          .status(200)
          .json({ msg: "User Login Successful", userID: data[0]._id });
      }
    });
  });

router
  .route("/:id")
  .get((req, res) => {
    const id = req.params.id;
    User.findById(id, (err, data) => {
      if (err) {
        res.status(404).json({ msg: "User Id Error, not found!", error: err });
      } else {
        res.status(200).json({ userData: data });
      }
    });
  })
  .post((req, res) => {
    const bookDetail = req.body;
    const id = req.params.id;
    console.log("book detail: ", bookDetail);
    User.findByIdAndUpdate(
      id,
      { $push: { boughtList: bookDetail } },
      (err, data) => {
        if (err) {
          res
            .status(400)
            .json({ msg: "Book not added to Bought list", error: err });
        } else {
          res
            .status(200)
            .json({ msg: "Bought Books list updated successfully!" });
        }
      }
    );
  });

module.exports = router;
