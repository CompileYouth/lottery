import { Router } from 'express';

const router = Router();

router.post('/lottery', (req, res) => {
  console.log(req.session);
  console.log(req.sessionID);

  // { msg: '', result: { lucky: true, prize: 'iPhone' }, isFinish: false }
  // { msg: '', result: { lucky: false, prize: '' }, isFinish: false }
  // { msg: '', result: { lucky: false, prize: '' }, isFinish: true } =>
  //    可以不返回这个数据，而直接 redirect 到活动结束界面
  res.send('haha');
});


export default router;
