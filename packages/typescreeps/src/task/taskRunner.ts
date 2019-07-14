import { TaskType, Task } from '@typescreeps/common/dist';
import { Mining, Carry } from './tasks';
import { Upgrade } from './tasks/upgrade';
import { Build } from './tasks/build';
import { MineBuild } from './tasks/miningBuild';

const TASK_SEGMENT = 5;

export function taskRunner() {

  const tasks = getTasks();
  if (!tasks) {
    return;
  }

  for (const task of tasks) {
    try {

      switch (task.type) {
        case TaskType.BUILD: {
          new Build(task).runTask();
          break;
        }
        case TaskType.CARRY: {
          new Carry(task).runTask();
          break;
        }
        case TaskType.MINE: {
          new Mining(task).runTask();
          break;
        }
        case TaskType.MINE_BUILD: {
          new MineBuild(task).runTask();
          break;
        }
        case TaskType.UPGRADE: {
          new Upgrade(task).runTask();
          break;
        }
        default: {
          throw Error(`Found invalid task of type ${task.type}`);
        }
      }

    } catch (error) {
      console.log(error);
    }
  }
}

function getTasks(): Task[] | any {
  try {
    const rawTasks = RawMemory.segments[TASK_SEGMENT];
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
