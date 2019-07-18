
import { taskRunner } from './task/taskRunner';
import { linkRunner } from './structures/linkRunner';
import { towerRunner } from './structures/towerRunner';
import { memoryRunner } from './memory/memoryRunner';
import { graveRobberRunner } from './auto/graveRobber';

export const loop = () => {
  taskRunner();
  linkRunner();
  towerRunner();
  memoryRunner();
  graveRobberRunner();
};
