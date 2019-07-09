import { TaskType } from '@typescreeps/common';
import { makeTask } from './task/taskRunner';

export function addTask(type: TaskType, sourceId: string) {
  const task = makeTask(type, sourceId);
  if (!task) {
    throw Error(`Task of type ${type} is invalid`);
  }
  Memory.tasks.push(task);
}
