const passportLocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/users.model");

module.exports = function (passport) {
  passport.use(
    new passportLocalStrategy((username, password, done) => {
      console.log("In passport config.js");
      User.findOne({ name: username }, (err, data) => {
        if (err) {
          throw err;
        }
        if (!data) {
          console.log("Passport auth local !data: ", data);
          return done(null, false);
        }
        console.log("Passport auth local data: ", data);
        bcrypt.compare(password, data.password, (err, result) => {
          if (err) {
            throw err;
          } else if (result) {
            console.log("Bcrypt compare result: ", result);
            return done(null, data);
          } else {
            return done(null, false);
          }
        });
      });
    })
  );

  passport.serializeUser((user, cb) => {
    console.log("Serialize user: ", user);
    cb(null, user._id);
  });
  passport.deserializeUser((id, cb) => {
    console.log("Deseialize user: ", id);
    User.findOne({ _id: id }, (err, data) => {
      cb(err, data);
    });
  });
};
