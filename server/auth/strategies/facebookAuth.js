//facebook authentication
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const FacebookAuthModel = require('../../models/facebookAuthModel.js');

module.exports = function() {
    
    passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "https://enigmatic-island-38218.herokuapp.com/auth/facebook/callback" 
  },
  function(accessToken, refreshToken, profile, cb) {
    FacebookAuthModel.findOrCreate({ facebookId: profile.id, profile: profile.displayName }, function (err, user) {
                console.log("logged in");
                return cb(err, user);
            });
      }
    ));

};