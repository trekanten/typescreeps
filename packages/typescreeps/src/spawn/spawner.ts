import { Task, TaskType } from '@typescreeps/common/dist';

const DEFAULT_PRIORITY = 10;

interface SpawnCreep {
  task: Task;
  room: Room;
}

function getTaskTypeSpawnPriority(taskType: TaskType | string) {
  switch (taskType) {
    case TaskType.SPAWN_DISTRIBUTOR: return 1;
    default: return DEFAULT_PRIORITY;
  }
}

function getSpawnPriority(spawnCreep: SpawnCreep): number {
  if (spawnCreep.task.options && spawnCreep.task.options.spawnPriority) {
    return spawnCreep.task.options.spawnPriority;
  }

  return getTaskTypeSpawnPriority(spawnCreep.task.type);
}

function sortOnSpawnPriority(spawnCreeps: SpawnCreep[]) {
  return spawnCreeps.sort((a, b) => getSpawnPriority(b) - getSpawnPriority(a));
}

function getMySpawns(): StructureSpawn[] {
  const spawns: StructureSpawn[] = [];
  for (const key in Game.spawns) {
    const spawn = Game.spawns[key];
    if (spawn.my) {
      spawns.push(spawn);
    }
  }
  return spawns;
}

class Spawner {

  spawnList: SpawnCreep[] = [];

  public clear() {
    this.spawnList = [];
  }

  public addCreep(spawnCreep: SpawnCreep) {
    this.spawnList.push(spawnCreep);
    this.spawnList = sortOnSpawnPriority(this.spawnList);
  }

  public spawnCreeps() {
    // TODO
    // const spawns = getMySpawns();
    // const spawn = spawns[0];
  }

  public printList() {
    console.log();
    console.log('__Creeps Waiting to spawn__');
    for (const spawnCreep of this.spawnList) {
      console.log(`${getSpawnPriority(spawnCreep)}, ${spawnCreep.task.name}, in spawn list`);
    }
    console.log('___________________________');
    console.log();
  }
}

const spawner = new Spawner();

export { spawner };
