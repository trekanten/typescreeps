
import { taskRunner } from './task/taskRunner';
import { memoryRunner } from './memory/memoryRunner';
import { towerRunner } from './structures/towerRunner';
import { linkRunner } from './structures/linkRunner';

export const loop = () => {
  console.log();
  console.log(`--- ${Game.time} ---`);

  taskRunner();
  linkRunner();
  towerRunner();
  memoryRunner();
};
