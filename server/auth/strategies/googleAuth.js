//facebook authentication
const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const GoogleAuthModel = require('../../models/googleAuthModel.js');

module.exports = function() {
    
  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_APP_ID,
      clientSecret: process.env.GOOGLE_APP_SECRET,
      callbackURL: "https://enigmatic-island-38218.herokuapp.com/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
      GoogleAuthModel.findOrCreate({ googleId: profile.id, profile: profile.displayName }, function (err, user) {
        if(err) return cb(err);
        console.log("logged in");
        return cb(err,user);
      });
    }
  ));

};