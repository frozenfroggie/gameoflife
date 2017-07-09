const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/', (req,res) => {
  res.render(process.cwd() + '/public/adminAuthSubpage/adminAuth.pug');
});

router.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/admin', failureFlash: true }), (req,res) => {
  res.render(process.cwd() + '/public/index.pug');
});

module.exports = router;