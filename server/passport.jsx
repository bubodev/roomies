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
    User.findOne({ googleId: profile.id }, function(err, user) {
      if(!user) {
        user = new User({ 
          googleId: profile.id,
          name: profile.displayName,
        });

        user.save((err) => {
          if(err){
            console.log(err)
            done(null, false)
          }
        })
      } 
      return done(null, user)
    });
  }
));

module.exports = passport;