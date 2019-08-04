import { getTotalBodyPartCost, BodyPart } from '@typescreeps/common/dist';

export function spawnCreep(bodyParts: BodyPart[], name: string, room: Room) {

  let spawn: StructureSpawn | undefined;
  try {
    spawn = getSpawnFromRoom(room);
  } catch (error) {
    console.log(`${name} not able find spawn in ideal room ${room.name}`);
  }

  const creepCost = getTotalBodyPartCost(bodyParts);

  if (spawn) {
    const canSpawnCreep = spawn.spawnCreep(bodyParts, name, { dryRun: true });

    if (canSpawnCreep === OK) {
      spawn.spawnCreep(bodyParts, name);
      return;
    }

    const hasCapacity = creepCost < spawn.room.energyCapacityAvailable;

    if (hasCapacity) {
      if (canSpawnCreep === ERR_NOT_ENOUGH_ENERGY) {
        throw Error(`${name}: Waiting for spawn ${spawn.name}, currently not enough energy`);
      }
      if (canSpawnCreep === ERR_BUSY) {
        throw Error(`${name}: Waiting for spawn ${spawn.name}, currently busy `);
      }
    }
  }

  const spawns: StructureSpawn[] = [];
  for (const spawnName in Game.spawns) {
    spawns.push(Game.spawns[spawnName]);
  }

  for (const spawnName in Game.spawns) {
    const spawn = Game.spawns[spawnName];

    if (creepCost < spawn.room.energyAvailable) {
      spawn.spawnCreep(bodyParts, name);
      throw Error(`${name} spawning in room ${spawn.room.name} [${spawn.name}]`);
    }
  }

  throw Error(`${name}: No suitable spawn found!`);
}

function getSpawnFromRoom(room: Room): StructureSpawn {
  for (const key in Game.spawns) {
    const spawn = Game.spawns[key];
    if (spawn.room.name === room.name) {
      return spawn;
    }
  }
  throw Error(`No spawn in room with name ${room.name}`);
}
