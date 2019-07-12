import { TaskType, Task, MiningTask } from '@typescreeps/common';
import { mining } from './tasks/mining';
import { getId } from '../utils/id';

const TASK_SEGMENT = 5;

export function taskRunner() {

  const tasks = getTasks();
  if (!tasks) {
    return;
  }

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

function getTasks(): Task[] | any {
  try {
    const rawTasks = RawMemory.segments[TASK_SEGMENT];
    console.log(rawTasks);
    if (rawTasks === undefined) {
      RawMemory.setActiveSegments([TASK_SEGMENT]);
      throw Error(`Task segment is undefined. Setting segment ${TASK_SEGMENT} to active.`);
    }
    if (rawTasks === '') {
      RawMemory.segments[TASK_SEGMENT] = JSON.stringify([]);
      // tslint:disable-next-line:max-line-length
      throw Error(`Task segment is empty string. Initializing segment ${TASK_SEGMENT} to empty array.`);
    }
    return JSON.parse(rawTasks);
  } catch (error) {
    console.log(error);
    return null;
  }
}
