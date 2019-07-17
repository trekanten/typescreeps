
import { taskRunner } from './task/taskRunner';
import { memoryRunner } from './memory/memoryRunner';
import { towerRunner } from './structures/towerRunner';
import { linkRuner } from './structures/linkRunner';

export const loop = () => {
  console.log();
  console.log(`--- ${Game.time} ---`);

  taskRunner();
  linkRuner();
  towerRunner();
  memoryRunner();
};
