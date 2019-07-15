import { Task, GameRoom } from '@typescreeps/common/dist';

export function spawnCreepInAvailableRoom(task: Task) {
  const rooms = Memory.gameRooms as GameRoom[];
  if (rooms.length === 0) {
    throw Error(`${task.name} No rooms found in memory.gameRooms`);
  }

  let roomName = null;
  for (const key in rooms) {
    roomName = key;
  }

  if (!roomName) {
    throw Error(`${task.name} No rooms found in memory.gameRooms`);
  }

  const spawn = getSpawnFromRoom(Game.rooms[roomName]);
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
