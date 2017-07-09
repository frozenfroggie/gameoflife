const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback', passport.authenticate('google', { successRedirect: '/', failureRedirect: '/' }));

router.get('/facebook', passport.authenticate('facebook'));
  
router.get('/facebook/callback', passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/', failureFlash: true }));

router.get('/github', passport.authenticate('github'));
  
router.get('/github/callback', passport.authenticate('github', { successRedirect: '/', failureRedirect: '/', failureFlash: true }));

module.exports = router;