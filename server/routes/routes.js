const passport = require('passport');
const express = require('express');
const socialAuthRoutes = require('./socialAuthRoutes');
const adminAuthRoutes = require('./adminAuthRoutes');
const crudRoutes = require('./crudRoutes');
//const fs = require('fs');

module.exports = function(app) {
    app.use('/', express.static("./public"));

    app.get('/', (req, res) => {
      res.render(process.cwd() + '/public/index.pug');

      //console.log('./public/index.pug: ', fs.existsSync('./public/index.pug'));
      //console.log('process.cwd(): ',  fs.existsSync(process.cwd() + '/public/index.pug'));
    });
    
    app.use('/crud', crudRoutes);  
    
    app.use('/admin', adminAuthRoutes);
    
    app.use('/auth', socialAuthRoutes);  
    
    app.get('/authentication', (req,res) => {
      if(req.isAuthenticated()) {
        if(req.session.passport.user === "5954e71cf36d28458af6392d") {
          res.json({adminAuth: true, userAuth: false, user: "Admin" });
        } else {
          res.json({adminAuth: false, userAuth: true, user: req.user.profile });
        }
      } else {
        res.json({adminAuth: false, userAuth: false});
      }
    });
    
    app.post('/logout', (req, res) => {
      req.logout();
      console.log("logged out");
      res.redirect('/');
    });
    
    app.use((req, res, next) => {
      res.status(404).type('text').send('Given url is not found');
    });
};