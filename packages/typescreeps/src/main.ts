
import { taskRunner } from './task/taskRunner';

export const loop = () => {
  taskRunner();

  console.log('hey yo!');
};

export * from './commands';
