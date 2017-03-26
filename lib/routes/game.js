import { Router } from 'express';

import app from '../app';

const router = Router();

router.post('/lottery', (req, res) => {
  console.log(req.path);
  res.send('jhhjhj');
});


export default router;
