
import { taskRunner } from './task/taskRunner';
import { memoryRunner } from './memory/memoryRunner';

export const loop = () => {
  taskRunner();
  memoryRunner();
};
