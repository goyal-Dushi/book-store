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
  User.findOne(
    { $or: [{ name: req.body.name }, { email: req.body.email }] },
    async (err, data) => {
      if (err) {
        res.status(400).json({ msg: "Error Registering!", error: err });
      } else if (data?._id) {
        res.status(200).json({
          msg: "Looks like user already Registered with same username or email! Try Loggin in or register with another username & email!",
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
            res.status(201).json({
              msg:
                "Successfully Registered " +
                user?.name +
                ". Please Log in to Continue!",
              status: true,
            });
          }
        });
      }
    }
  );
};

const user_login = (req, res) => {
  req.session.isAuth = true;
  res.status(201).json({
    msg: "User login successful!",
    status: true,
  });
};

const check_user_login = (req, res) => {
  console.log("check_user_login: ", req.session);
  if (req.session?.isAuth) {
    User.findById(req.session?.passport?.user, (err, data) => {
      res.status(200).json({ loggedIn: true, data: data });
    });
  } else {
    res.status(401).json({ loggedIn: false });
  }
};

const user_logout = (req, res) => {
  req.session.isAuth = false;
  req.logout();
  res.status(200).json({ msg: "User logged out!" });
};

const get_user_profile = (req, res) => {
  User.findById(req.session?.passport?.user, (err, data) => {
    res.status(200).json({ data: data });
  });
};

module.exports = {
  getAll_users,
  user_register,
  user_login,
  user_logout,
  get_user_profile,
  check_user_login,
};
