import { Task, getTotalBodyPartCost } from '@typescreeps/common/dist';

export function spawnCreepInAvailableRoom(task: Task) {
  const gameRooms = Memory.gameRooms as Room[];
  if (gameRooms.length === 0) {
    throw Error(`${task.name} No rooms found in memory.gameRooms`);
  }

  const creepCost = getTotalBodyPartCost(task.bodyParts);

  let spawn = null;
  for (const gameRoom of gameRooms) {
    try {
      if (creepCost > gameRoom.energyCapacityAvailable) {
        throw Error(`${gameRoom.name} does not have enough energy capacity for ${task.name}`);
      }
      spawn = getSpawnFromRoom(Game.rooms[gameRoom.name]);
      break;
    } catch (error) {
      console.log(error);
    }
  }

  if (!spawn) {
    throw Error(`${task.name} No suitable spawns found in memory.gameRooms`);
  }

  spawnCreep(task, spawn);
}

export function spawnCreep(task: Task, spawn: StructureSpawn) {
  try {

    spawn.createCreep(task.bodyParts, task.name);

  } catch (error) {
    throw error;
  }
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
