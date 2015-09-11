import passport                                   from 'passport';
import GoogleStrategy                             from 'passport-google-oauth';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from './secrets';
import User from '../config/models/Users';

passport.use(new GoogleStrategy.OAuth2Strategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "http://127.0.0.1:8080/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({ googleId: profile.id }, function(err, user) {
      if(!user) {
        user = new User({ 
          googleId: profile.id,
          name: profile.displayName,
          hasHome: false,
        });

        user.save((err) => {
          if(err)
            done(null, false)
        })
      } 
      return done(null, user)
    });
  }
));

passport.serializeUser( (user, done) => {
  done(null, user.id);
})

passport.deserializeUser( (id, done) => {
  User.findById(id, function(err, user) {
    done(err, user);
  });
})

module.exports = passport;

