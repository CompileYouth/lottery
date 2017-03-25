import express from 'express';

const app = express();



app.use('/', require('./routes').default);

export default app;
