const User = require("../models/users.model");
const bcrypt = require("bcryptjs");

const getAll_users = (req, res) => {
  User.find((err, data) => {
    if (err) {
      res.status(400).json({ msg: "Not able to get all users" });
    } else {
      res.status(200).json({ data });
    }
  });
};

const user_register = (req, res) => {
  console.log("Registration backend: ", req.body);
  User.findOne({ name: req.body.name }, async (err, data) => {
    if (err) {
      res.status(400).json({ msg: "Error Registering!", error: err });
    } else if (data?._id) {
      res
        .status(200)
        .json({ msg: "Looks like user already Registered! Try Loggin in!" });
    } else {
      const hashPwd = await bcrypt.hash(req.body.password, 8);
      const newUser = new User({
        ...req.body,
        password: hashPwd,
        boughtList: [],
        soldList: [],
      });
      console.log("New user in DB: ", newUser);
      newUser.save((err, user) => {
        if (err) {
          console.log("error user");
          res
            .status(400)
            .json({ msg: "Not able to register user!", error: err });
        } else {
          console.log("user after saving: ", user);
          res.status(200).json({
            msg: "User Registration Successful!",
            userID: newUser._id,
          });
        }
      });
    }
  });
};

const user_login = (req, res) => {
  //   User.findOne({ name: req.body.name }, async (err, user) => {
  //     if (err) {
  //       res
  //         .status(200)
  //         .json({ msg: "Error occurred while Loggin in!", error: err });
  //     } else if (!user) {
  //       res.json({
  //         msg: "User not found, either your username is incorrect or you are not Registered!",
  //       });
  //     } else {
  //       const isMatch = await bcrypt.compare(req.body.password, user.password);
  //       if (!isMatch) {
  //         res.json({
  //           msg: "Password incorrect, Please check your password!",
  //         });
  //       } else {
  //         req.session.isAuth = true;
  //         console.log("logged in user: ", user);
  //         res.redirect("/" + user._id);
  //       }
  //     }
  //   });
  req.session.isAuth = true;
  console.log("req.session:user_login ", req.session);
  res.status(200).json({
    msg: "User login successful!",
    userID: req.session.passport.user,
  });
};

const get_user_profile = (req, res) => {
  const id = req.params.id;
  User.findById(id, (err, data) => {
    if (err) {
      res.status(404).json({ msg: "User Id Error, not found!", error: err });
    } else {
      res.status(200).json({ data });
    }
  });
  //   } else {
  // res.json({ msg: "User not logged in!", status: false });
  //   }
};

module.exports = {
  getAll_users,
  user_register,
  user_login,
  get_user_profile,
};
