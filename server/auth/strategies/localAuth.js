//local authentication
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
var AdminAuthModel = require('../../models/localAuthModel.js');

module.exports = function() {
    
  passport.use(new LocalStrategy(
    function(adminLogin, adminPass, done) {
      AdminAuthModel.findOne({ adminLogin: adminLogin }, function (err, user) {
        console.log('User '+ adminLogin +' attempted to log in.');
        if (err) { 
          console.log("access denied");
          return done(err); }
        if (!user) { 
          console.log("access denied");
          return done(null, false);
        }
        if (!bcrypt.compareSync(adminPass, user.adminPass)) {
          console.log("access denied");
          return done(null, false); 
        }
        console.log("logged in");
        return done(null, user);
      });
    }
  ));
    
};