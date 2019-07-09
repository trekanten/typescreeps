require('dotenv').config();

import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { screepsController } from './screepsController';

const app = express();

app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.raw({
  inflate: true,
  limit: '100kb',
  type: 'application/octet-stream',
}));

app.use('/screeps', screepsController);

app.get('/', (_: Request, res: Response) => {
  res.send('Welcome to Typescreeps backend!');
});

app.listen(3000, () => console.log('Typescreeps Server listening on port 3000!'));
