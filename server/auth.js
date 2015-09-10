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
    res.redirect('/home');
  });

auth.get('/logout', function(req, res){
  req.logout();
  console.log("logging out...");
  res.redirect('/login');
});

module.exports = auth;