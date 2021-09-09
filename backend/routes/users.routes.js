const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../config/passportConfig")(passport);
const userController = require("../controllers/user.controller");

router.route("/").get(userController.getAll_users);

router
  .route("/register")
  .get((req, res) => {
    console.log("User Registration page");
  })
  .post(userController.user_register);

router
  .route("/login")
  .get((req, res) => {
    console.log("User Login page");
  })
  .post(passport.authenticate("local"), userController.user_login);

router.route("/logout").get(userController.user_logout);

router.route("/profile").get(userController.get_user_profile);

module.exports = router;
