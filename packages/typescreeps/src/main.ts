
import { taskRunner } from './task/taskRunner';
import { linkRunner } from './structures/linkRunner';
import { towerRunner } from './structures/towerRunner';
import { memoryRunner } from './memory/memoryRunner';
import { autoRobberRunner } from './auto/autoRobber';
import { autoDefenderRunner } from './auto/autoDefender';
import { spawner } from './spawn/spawner';

export const loop = () => {
  spawner.clear();

  taskRunner();
  linkRunner();
  towerRunner();

  autoDefenderRunner();
  autoRobberRunner();

  memoryRunner();

  spawner.printList();
};
