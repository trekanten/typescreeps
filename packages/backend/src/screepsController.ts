import { Router, Request, Response } from 'express';
import { getMe, getSegment, setSegment, getMemory } from './screepsApi';
import { Task } from '@typescreeps/common';

const TASK_SEGMENT = '5';

const router: Router = Router();

router.get('/', async (_: Request, res: Response) => {
  res.send('Test');
});

router.get('/rooms', async (_: Request, res: Response) => {
  const gameRooms = await getMemory('gameRooms');
  const roomNames: string[] = [];
  for (const gameRoom of gameRooms) {
    roomNames.push(gameRoom.name);
  }
  res.send(roomNames);
});

router.get('/tasks', async (_: Request, res: Response) => {
  const tasks = await getSegment(TASK_SEGMENT);
  res.send(tasks);
});

router.post('/tasks', async (req: Request, res: Response) => {
  const body = req.body as Task;
  const tasks = await getSegment(TASK_SEGMENT) as Task[];
  tasks.push(body);
  await setSegment(TASK_SEGMENT, tasks);
  res.sendStatus(200);
});

router.delete('/tasks/:taskName', async (req: Request, res: Response) => {
  const taskName = req.params.taskName;
  const tasks = await getSegment(TASK_SEGMENT) as Task[];
  const updatedTasks = tasks.filter(task => task.name !== taskName);
  await setSegment(TASK_SEGMENT, updatedTasks);
  res.sendStatus(200);
});

router.patch('/tasks/:taskName', async (req: Request, res: Response) => {
  const taskName = req.params.taskName;
  const body = req.body as Task;
  const tasks = await getSegment(TASK_SEGMENT) as Task[];
  const updatedTasks = tasks.filter(task => task.name !== taskName);
  updatedTasks.push(body);
  await setSegment(TASK_SEGMENT, updatedTasks);
  res.sendStatus(200);
});

router.get('/segment/:segmentNr', async (req: Request, res: Response) => {
  const segmentNr = req.params.segmentNr;
  const segment = await getSegment(segmentNr);
  res.send(segment);
});

router.post('/segment/:segmentNr', async (req: Request, res: Response) => {
  const data = req.body;
  const segmentNr = req.params.segmentNr;
  await setSegment(segmentNr, data);
  res.sendStatus(200);
});

router.get('/me', async (_: Request, res: Response) => {
  const me = await getMe();
  res.send(me);
});

export const screepsController: Router = router;
