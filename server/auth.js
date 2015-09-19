import express  from 'express';
import passport from './passport';

let auth = express.Router();

auth.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }),
  function(req, res){
  });

auth.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/auth/google' }),
  function(req, res) {
    res.cookie('userId', req.user._id, { maxAge: 2592000000 });
    res.redirect('/home/dashboard');
  });

auth.get('/logout', function(req, res){
  req.logout();
  res.clearCookie('userId');
  res.redirect('/login');
});

module.exports = auth;