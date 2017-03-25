import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

passport.use(new LocalStrategy({
  usernameField: 'login_name',
  passwordField: 'password',
  passReqToCallback: true,
  session: true,
}, async (req, loginName, password, done) => {
  console.log(loginName, password);
}));
