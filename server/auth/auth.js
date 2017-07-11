 //authentication
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const mongoose = require("mongoose");
var LocalAuthModel = require('../models/localAuthModel.js');
var GithubAuthModel = require('../models/githubAuthModel.js');
var FacebookAuthModel = require('../models/facebookAuthModel.js');
var GoogleAuthModel = require('../models/googleAuthModel.js');

module.exports = function(app) {
    mongoose.connect(process.env.MONGO_URI);
    app.use(session({
        store: new MongoStore({mongooseConnection: mongoose.connection}),
        saveUninitialized: false, 
        resave: false,
        secret: process.env.SESSION_SECRET
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    
    passport.serializeUser((user, done) => {
      done(null, user._id);
    });
   
    passport.deserializeUser((id, done) => {
        GoogleAuthModel.findById({_id: new mongoose.mongo.ObjectId(id)}, function(err, user) {
            if(err) return done(err);
            if(user) {
                done(null, user);
            } else {
            FacebookAuthModel.findById({_id: new mongoose.mongo.ObjectId(id)}, function(err, user) {
                if(err) return done(err);
                if(user) {
                    done(null, user);
                } else {
                    GithubAuthModel.findById({_id: new mongoose.mongo.ObjectId(id)}, function(err, user) {
                        if(err) return done(err);
                        if(user) {
                            done(null, user);
                        } else {
                            LocalAuthModel.findById({_id: new mongoose.mongo.ObjectId(id)}, function(err, admin) {
                                if(err) return done(err);
                                done(null, admin);
                            });//end of local
                        }
                    });//end of git
                }
            });//end of fb
            }
        });//end of google+
    });//end of deserializeUser
    
};