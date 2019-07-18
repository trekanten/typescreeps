import { getTotalBodyPartCost, BodyPart } from '@typescreeps/common/dist';
import { spawnCreep } from '@/helpers/spawnMethods';
import { getClosestContainer } from '@/helpers/structureGetters';
import { deposit, widthdrawTombStone, pickup } from '@/helpers/creepActions';

const MINIMUM_GAIN = 100;
const ROBBER_BODY: BodyPart[] = [BodyPart.MOVE, BodyPart.CARRY];

function getRobberName(room: Room) {
  return `GraveRobber-${room.name}`;
}

function hasActiveGraveRobber(room: Room) {
  return !!Game.creeps[getRobberName(room)];
}

function getDroppedEnergy(room: Room) {
  return room.find(FIND_DROPPED_RESOURCES, {
    filter: resource => resource.resourceType === RESOURCE_ENERGY,
  }) as Resource<RESOURCE_ENERGY>[];
}

function getClosestEnergy(creep: Creep) {
  return creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
}

function getClosestNotEmptyTombStone(creep: Creep) {
  const tombStones = getTombStones(creep.room).filter(t => t.store.energy > 0);
  const sorted = tombStones.sort((a, b) =>
    Math.sqrt(Math.pow((creep.pos.x - a.pos.x), 2) + Math.pow((creep.pos.y - a.pos.y), 2))
    - Math.sqrt(Math.pow((creep.pos.x - b.pos.x), 2) + Math.pow((creep.pos.y - b.pos.y), 2)),
  );
  return sorted.length !== 0 ? sorted[0] : null;
}

function getTombStones(room: Room) {
  return room.find(FIND_TOMBSTONES) as Tombstone[];
}

function getEnergyAvailableInRoom(room: Room) {
  const droppedEnergy = getDroppedEnergy(room);
  const tombStones = getTombStones(room);

  const totalDroppedEnergy = droppedEnergy.map(r => r.amount).reduce((a, b) => a + b, 0);
  const totalTombStoneEnergy = tombStones.map(t => t.store.energy).reduce((a, b) => a + b, 0);

  return totalDroppedEnergy + totalTombStoneEnergy;
}

export function graveRobberRunner() {
  for (const key in Game.rooms) {
    try {
      const room = Game.rooms[key];

      if (hasActiveGraveRobber(room)) {
        runGraveRobber(room);
        continue;
      }

      if (Game.time % 8 !== 0) {
        continue;
      }

      const totalResources = getEnergyAvailableInRoom(room);
      if (totalResources - MINIMUM_GAIN > getTotalBodyPartCost(ROBBER_BODY)) {
        spawnCreep(ROBBER_BODY, getRobberName(room), room);
      }

    } catch (error) {
      console.log(error);
    }
  }
}

function runGraveRobber(room: Room) {
  const creep = Game.creeps[getRobberName(room)];
  if (!creep) {
    throw Error(`No grave robber with name ${getRobberName(room)} found`);
  }

  if (creep.carry.energy === 0) {
    creep.memory.deposit = false;
    creep.memory.targetId = null;
    creep.memory.targetType = null;
  } else {
    creep.memory.deposit = true;
    creep.memory.containerId = null;
  }

  if (creep.memory.deposit) {
    if (!creep.memory.containerId) {
      const container = getClosestContainer(creep);
      if (!container) {
        throw (`${creep.name} does not find any container`);
      }
      creep.memory.containerId = container.id;
    }
    const container = Game.getObjectById(creep.memory.containerId) as Structure;
    deposit(creep, container);
  } else {
    if (!creep.memory.targetId || !creep.memory.targetType) {
      const droppedEnergy = getClosestEnergy(creep);
      if (droppedEnergy) {
        creep.memory.targetId = droppedEnergy.id;
        creep.memory.targetType = 'energy';
      } else {
        const tombStone = getClosestNotEmptyTombStone(creep);
        if (tombStone) {
          creep.memory.targetId = tombStone.id;
          creep.memory.targetType = 'tombstone';
        }
      }
      if (!creep.memory.targetId || !creep.memory.targetType) {
        // throw (`${creep.name} does not find any target`);
        return;
      }
    }
    const target = Game.getObjectById(creep.memory.targetId);
    if (!target) {
      creep.memory.targetId = null;
      creep.memory.targetType = null;
      throw (`${creep.name} target not found`);
    }
    if (creep.memory.targetType === 'energy') {
      pickup(creep, target as Resource);
    } else if (creep.memory.targetType === 'tombstone') {
      widthdrawTombStone(creep, target as Tombstone);
    }
  }
}
