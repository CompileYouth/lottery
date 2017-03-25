import bodyParser from 'body-parser';
import config from 'config';
import cookieParser from 'cookie-parser';
import express from 'express';
import flash from 'connect-flash';
import passport from 'passport';
import path from 'path';
import session from 'express-session';

// Initialize passport with our own strategies.
import './passport/setup';

const app = express();

// Initialize app settings.
app.set('assets url prefix', config.get('web.assets.urlPrefix'));

// Set Pug as the default view engine.
app.set('view engine', 'pug');
app.set('views', path.resolve(__dirname, './views'));

// Add HTTP body parsers.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add cookie and session support.
app.use(cookieParser());

app.use(session({
  secret: 'i$love%cassiny!',
  resave: true,
  saveUninitialized: true
}));

// Add connect-flash middleware.
app.use(flash());

// Initialize passport.
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  if (['/', '/login'].indexOf(req.path) !== -1 || req.isAuthenticated()) {
    next();
  } else {
    res.redirect(`/login?redirect_url=${global.encodeURIComponent(req.url)}`);
  }
});

app.use('/', require('./routes').default);

app.getAssetUrl = function getAssetUrl(relPath) {
  const prefix = app.get('assets url prefix');
  return `${prefix}${relPath}`;
};

export default app;
