import { Task, getTotalBodyPartCost } from '@typescreeps/common/dist';

export function spawnCreep(task: Task, spawn: StructureSpawn) {
  const canSpawnCreep = spawn.spawnCreep(task.bodyParts, task.name, { dryRun: true }) === OK;

  if (canSpawnCreep) {
    spawn.spawnCreep(task.bodyParts, task.name);
    return;
  }

  const creepCost = getTotalBodyPartCost(task.bodyParts);
  if (creepCost < spawn.room.energyCapacityAvailable) {
    throw Error(`${task.name}: Waiting for spawn ${spawn.name}, currently not enough energy`);
  }

  for (const spawnName in Game.spawns) {
    const spawn = Game.spawns[spawnName];

    if (creepCost < spawn.room.energyAvailable) {
      spawn.spawnCreep(task.bodyParts, task.name);
      throw Error(`${task.name} spawning in spawn ${spawn.name}`);
    }
  }

  throw Error(`${task.name} no suitable spawn found!`);
}

export function getSpawnFromRoom(room: Room): StructureSpawn {
  for (const key in Game.spawns) {
    const spawn = Game.spawns[key];
    if (spawn.room.name === room.name) {
      return spawn;
    }
  }
  throw Error(`No spawn in room with name ${room.name}`);
}

export function getSpawnFromRoomObject(targetObject: RoomObject): StructureSpawn {
  const targetRoom = targetObject.room;
  if (!targetRoom) {
    throw Error(`Room not found for object ${JSON.stringify(targetObject)}`);
  }

  return getSpawnFromRoom(targetRoom);
}
