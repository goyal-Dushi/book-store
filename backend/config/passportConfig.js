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
          if (err) {
            throw err;
          } else if (result) {
            const resObj = {...data};
            delete resObj.password;
            
            return done(null, resObj);
          } else {
            return done(null, false);
          }
        });
      });
    })
  );

  passport.serializeUser((user, cb) => {
    cb(null, user);
  });
  passport.deserializeUser((id, cb) => {
    User.findOne({ _id: id }, (err, data) => {
      cb(err, data);
    });
  });
};
