import { TaskType, Task } from '@typescreeps/common/dist';

import { Upgrade } from './tasks/upgrade';
import { Build } from './tasks/build';
import { MineBuild } from './tasks/miningBuild';
import { Repair } from './tasks/repair';
import { SpawnDistribution } from './tasks/spawnDistributor';
import { Claim } from './tasks/claim';
import { Reserve } from './tasks/reserve';
import { Carry } from './tasks/carry';
import { Mining } from './tasks/mining';
import { RoomDefend } from './tasks/roomDefend';

const TASK_SEGMENT = 5;

export function taskRunner() {

  const tasks = getTasks();
  if (!tasks) {
    return;
  }

  for (const task of (tasks as any[])) {
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
        case TaskType.CLAIM: {
          new Claim(task).runTask();
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
        case TaskType.REPAIR: {
          new Repair(task).runTask();
          break;
        }
        case TaskType.RESERVE: {
          new Reserve(task).runTask();
          break;
        }
        case TaskType.ROOM_DEFEND: {
          new RoomDefend(task).runTask();
          break;
        }
        case TaskType.SPAWN_DISTRIBUTOR: {
          new SpawnDistribution(task).runTask();
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

function getTasks(): Task[] | null {
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
