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
  User.findOne({ name: req.body.name }, async (err, data) => {
    if (err) {
      res.status(400).json({ msg: "Error Registering!", error: err });
    } else if (data?._id) {
      res.status(200).json({
        msg: "Looks like user already Registered! Try Loggin in!",
        status: false,
      });
    } else {
      const hashPwd = await bcrypt.hash(req.body.password, 8);
      const newUser = new User({
        ...req.body,
        password: hashPwd,
        boughtList: [],
        soldList: [],
      });
      newUser.save((err, user) => {
        if (err) {
          console.log("error user: ", err);
          res
            .status(400)
            .json({ msg: "Not able to register user!", error: err });
        } else {
          // console.log("user after saving: ", user);
          res.status(200).json({
            msg: "Successfully Registered " + user?.name,
            data: user,
            status: true,
          });
        }
      });
    }
  });
};

const user_login = (req, res) => {
  req.session.isAuth = true;
  // console.log("req.session:user_login ", req.session);
  res.status(200).json({
    msg: "User login successful!",
    status: true,
    data: req.session.passport.user,
  });
};

const user_logout = (req, res) => {
  req.session.isAuth = false;
  req.logout();
  // console.log("req.session in logout: ", req.session);
  res.status(200).json({ msg: "User logged out!" });
};

const get_user_profile = (req, res) => {
  console.log("get user, session: ", req.session);
  res.send(req?.user);
};

module.exports = {
  getAll_users,
  user_register,
  user_login,
  user_logout,
  get_user_profile,
};
