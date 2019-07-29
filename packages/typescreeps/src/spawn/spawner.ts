import { Task } from '@typescreeps/common/dist';

interface SpawnCreep {
  task: Task;
  room: Room;
  priority?: number;
}

const DEFAULT_PRIORITY = 10;

function getSpawnPriority(task: Task): number {
  if (!task.options || !task.options.spawnPriority) {
    return DEFAULT_PRIORITY;
  }
  return task.options.spawnPriority;
}

function sortOnSpawnPriority(spawnCreeps: SpawnCreep[]) {
  return spawnCreeps.sort((a, b) => getSpawnPriority(b.task) - getSpawnPriority(a.task));
}

class Spawner {

  spawnList: SpawnCreep[] = [];

  public clear() {
    this.spawnList = [];
  }

  public addCreep(spawnCreep: SpawnCreep) {
    this.spawnList.push(spawnCreep);
  }

  public printList() {
    console.log();
    console.log('__Creeps Waiting to spawn__');
    const sortedSpawnList = sortOnSpawnPriority(this.spawnList);
    for (const spawnCreep of sortedSpawnList) {
      console.log(`${getSpawnPriority(spawnCreep.task)}, ${spawnCreep.task.name}, in spawn list`);
    }
    console.log('___________________________');
    console.log();
  }
}

const spawner = new Spawner();

export { spawner };
