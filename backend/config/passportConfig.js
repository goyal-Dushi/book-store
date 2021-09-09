const passportLocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/users.model");

module.exports = function (passport) {
  passport.use(
    new passportLocalStrategy((username, password, done) => {
      User.findOne({ name: username }, (err, data) => {
        if (err) {
          throw err;
        }
        if (!data) {
          return done(null, false);
        }
        bcrypt.compare(password, data.password, (err, result) => {
          console.log("Error in bcrypt compare: ", err);
          console.log("result in bcrypt compare: ", result);
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
    cb(null, user);
  });
  passport.deserializeUser((id, cb) => {
    console.log("Deseialize user: ", id);
    User.findOne({ _id: id }, (err, data) => {
      cb(err, data);
    });
  });
};
