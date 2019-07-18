
import { taskRunner } from './task/taskRunner';
import { linkRunner } from './structures/linkRunner';
import { towerRunner } from './structures/towerRunner';
import { memoryRunner } from './memory/memoryRunner';
import { autoRobberRunner } from './auto/autoRobber';
import { autoDefenderRunner } from './auto/autoDefender';

export const loop = () => {
  taskRunner();
  linkRunner();
  towerRunner();

  autoDefenderRunner();
  autoRobberRunner();

  memoryRunner();
};
