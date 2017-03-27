import { Router } from 'express';

import EnterFilter from '../game/EnterFilter';
import GameManager from '../game/GameManager';

const router = Router();
let reqCount = 0;

const enterFilter = new EnterFilter();
const gameManager = new GameManager();

router.post('/lottery', (req, res) => {
  if (!gameManager.ifHasPrizes()) {
    res.render('over', { title: 'Game Over' });
    return;
  }

  if (!enterFilter.totalNumberFilter(reqCount)) {
    res.send({ msg: 'Please try again later.', result: { lucky: false, prize: '' }, isFinish: false });
    return;
  }

  if (!enterFilter.sessionFilter(req.sessionID)) {
    res.send({ msg: 'Please try again after 10s.', result: { lucky: false, prize: '' }, isFinish: false });
    return;
  }

  reqCount += 1;

  if (!gameManager.ifWinPrize()) {
    reqCount -= 1;
    res.send({ msg: 'Pity! Please try again later.', result: { lucky: false, prize: '' }, isFinish: false });
    return;
  }

  const prize = gameManager.pickPrize();
  reqCount -= 1;
  res.send({ msg: 'Congratulation!', result: { lucky: true, prize }, isFinish: false });
});


export default router;
