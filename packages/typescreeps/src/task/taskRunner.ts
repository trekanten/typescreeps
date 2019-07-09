import { TaskType, Task } from '@typescreeps/common';
import { mining, MiningTask } from './tasks/mining';
import { getId } from '@/utils/id';

export function taskRunner() {

  if (!Memory.tasks) {
    Memory.tasks = [];
    return;
  }

  const tasks = Memory.tasks as Task[];

  for (const task of tasks) {
    switch (task.type) {
      case TaskType.MINE: {
        mining.runTask(task as MiningTask);
        break;
      }
      default: {
        throw Error(`Found invalid task of type ${task.type}`);
      }
    }
  }
}

export function makeTask(type: TaskType, sourceId: string): Task | null {
  switch (type) {
    case TaskType.MINE: {
      return mining.createTask({ sourceId, creepName: getId() });
    }
    default: {
      return null;
    }
  }
}
