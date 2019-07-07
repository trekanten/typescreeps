import express, { Request, Response } from 'express';
import { getScreepsApi, getMemory, getMe } from './screepsApi';

let conLog: any = undefined;

const app = express();

const api = getScreepsApi();
api.socket.connect();
api.socket.subscribe('console');

api.socket.subscribe('room:shard3/W34N2', (event: any) => {
  return event;
});

api.socket.on('console', (event: any) => {
  // console.log(event.data);
  conLog = event.data;
});

app.get('/', (_: Request, res: Response) => {
  res.send('An alligator approaches!');
});

app.get('/memory', async (_: Request, res: Response) => {
  const memory = await getMemory(api, 'tasks');
  res.send(memory);
});

app.get('/me', async (_: Request, res: Response) => {
  const me = await getMe(api);
  res.send(me);
});

app.get('/console', async (_: Request, res: Response) => {
  res.send(conLog);
});

app.listen(3000, () => console.log('Typescreeps Server listening on port 3000!'));
