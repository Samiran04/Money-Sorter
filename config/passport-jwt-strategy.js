const passport = require("passport");
const strategyJWT = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const env = require("./environment");

const User = require("../models/user");

let opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: env.jwt_secret_key,
};

passport.use(
  new strategyJWT(opts, function (JWTpayload, done) {
    User.findById(JWTpayload._id, function (err, user) {
      if (err) {
        console.log("Error JWT Strategy", err);
        return done(err);
      }

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

module.exports = passport;
