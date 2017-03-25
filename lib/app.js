import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello Lottery');
})

export default app;
