import { Router } from 'express';

import app from '../app';

const router = Router();

router.get('/', (req, res) => {
  if (!req.user) {
    //res.render('login', { title: 'Login', app, req });
    res.send('Hello route');
  }
});

export default router;
