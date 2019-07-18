import { Router, Request, Response } from 'express';
import { getMe, getSegment, setSegment, getMemory } from './screepsApi';
import { Task, TASK_SEGMENT, LINK_SEGMENT, LinkJob } from '@typescreeps/common';

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

// Get all links
router.get('/links', async (_: Request, res: Response) => {
  const tasks = await getSegment(LINK_SEGMENT);
  res.send(tasks);
});

// Add link
router.post('/links', async (req: Request, res: Response) => {
  const body = req.body as LinkJob;
  const linkJobs = await getSegment(LINK_SEGMENT) as LinkJob[];
  linkJobs.push(body);
  await setSegment(LINK_SEGMENT, linkJobs);
  res.sendStatus(200);
});

// Delete link by ID
router.delete('/links/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  const linkJobs = await getSegment(LINK_SEGMENT) as LinkJob[];
  const updatedLinkJobs = linkJobs.filter(linkJob => linkJob.id !== id);
  await setSegment(LINK_SEGMENT, updatedLinkJobs);
  res.sendStatus(200);
});

// Get all tasks
router.get('/tasks', async (_: Request, res: Response) => {
  const tasks = await getSegment(TASK_SEGMENT);
  res.send(tasks);
});

// Add task
router.post('/tasks', async (req: Request, res: Response) => {
  const body = req.body as Task;
  const tasks = await getSegment(TASK_SEGMENT) as Task[];
  tasks.push(body);
  await setSegment(TASK_SEGMENT, tasks);
  res.sendStatus(200);
});

// Delete task by taskName
router.delete('/tasks/:taskName', async (req: Request, res: Response) => {
  const taskName = req.params.taskName;
  const tasks = await getSegment(TASK_SEGMENT) as Task[];
  const updatedTasks = tasks.filter(task => task.name !== taskName);
  await setSegment(TASK_SEGMENT, updatedTasks);
  res.sendStatus(200);
});

// Patch/Replace task by taskName
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
