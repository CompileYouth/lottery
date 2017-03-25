import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import UserManager from '../user/UserManager';
import UserIdentity from '../user/UserIdentity';

passport.use(new LocalStrategy({
  usernameField: 'login_name',
  passwordField: 'password',
  passReqToCallback: true,
  session: true,
}, async (req, loginName, password, done) => {
  const user = await UserManager.verifyPassword(loginName, password);
  if (user) {
    const userIdentity = new UserIdentity({
      id: user.id,
      username: user.username
    });
    done(null, userIdentity);
  } else {
    done(null, false, 'Invalid username or password.');
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.serialize());
});

passport.deserializeUser(async (id, done) => {
  const userIdentity = await UserIdentity.deserialize(id);
  done(null, userIdentity);
});
