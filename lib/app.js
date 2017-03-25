import express from 'express';
import path from 'path';

const app = express();

app.set('view engine', 'pug');
app.set('views', path.resolve(__dirname, './views'));

app.use('/', require('./routes').default);

export default app;
