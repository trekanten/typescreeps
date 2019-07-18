
import { taskRunner } from './task/taskRunner';
import { memoryRunner } from './memory/memoryRunner';
import { towerRunner } from './structures/towerRunner';
import { graveRobberRunner } from './auto/graveRobber';

export const loop = () => {
  taskRunner();
  towerRunner();
  memoryRunner();
  graveRobberRunner();
};
