
import { taskRunner } from './task/taskRunner';
import { memoryRunner } from './memory/memoryRunner';
import { towerRunner } from './structures/towerRunner';

export const loop = () => {
  taskRunner();
  towerRunner();
  memoryRunner();
};
