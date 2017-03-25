import passport from 'passport';
import { Router } from 'express';

import app from '../app';

const router = Router();

router.get('/login', (req, res) => {
  res.render('login', { title: 'Login', app, req });
});

router.post('/login', passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: true
}), (req, res) => {
  // If successfully signed in
  res.redirect('/');
});

export default router;
