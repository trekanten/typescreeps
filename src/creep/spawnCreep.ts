export function spawnCreep(creepName: string, targetObject: RoomObject) {
  try {
    const spawn = getSpawn(targetObject);
    if (!spawn.canCreateCreep) {
      return;
    }
    const body: BodyPartConstant[] = [
      MOVE,
      MOVE,
      CARRY,
      WORK,
    ];

    spawn.createCreep(body, creepName);

  } catch (error) {
    throw error;
  }
}

export function getSpawn(targetObject: RoomObject): StructureSpawn {
  const targetRoom = targetObject.room;
  if (!targetRoom) {
    throw Error(`Room not found for object ${JSON.stringify(targetObject)}`);
  }

  for (const key in Game.spawns) {
    const spawn = Game.spawns[key];
    if (spawn.room.name === targetRoom.name) {
      return spawn;
    }
  }

  throw Error(`No spawn in room with name ${targetRoom.name}`);
}
