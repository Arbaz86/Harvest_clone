const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const { v4: uuidv4 } = require("uuid");
const { UserModel } = require("../models/user.model");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      const { given_name, family_name, email } = profile?._json;

      const user = await UserModel({
        firstName: given_name,
        lastName: family_name,
        email,
        password: uuidv4(),
      });

      await user.save();

      return cb(null, {
        success: true,
        user,
      });
    }
  )
);

module.exports = { passport };
