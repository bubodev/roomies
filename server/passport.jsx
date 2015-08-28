import passport                                   from 'passport';
import GoogleStrategy                             from 'passport-google-oauth';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from './secrets';
import User from '../config/models/Users';

passport.serializeUser( (user, done) => {
  done(null, user);
})

passport.deserializeUser( (obj, done) => {
  done(null, obj);
})

passport.use(new GoogleStrategy.OAuth2Strategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "http://127.0.0.1:8080/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    let user;

    User.findOne({ googleId: profile.id }, function(err, foundUser) {
      user = foundUser;

      if(!user) {
        console.log("creating new user...");
        user = new User({ 
          googleId: profile.id,
          name: profile.displayName,
          token: accessToken
        });

        user.save((err) => {
          if(err)
            console.log(err)
          console.log("succesfully created new user");
        })
      } else {
        console.log("user found!");
      }

      return done(null, user)
    });
  }
));

module.exports = passport;