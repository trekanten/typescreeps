// tslint:disable:max-line-length

type EnergyStructure =
  | StructureExtension
  | StructureLink
  | StructureNuker
  | StructurePowerSpawn
  | StructureSpawn
  // | StructureStorage
  // | StructureTerminal
  | StructureTower;

function sortStructuresOnClosest<T extends AnyStructure>(creep: Creep, structures: T[]) {
  return structures.sort((a, b) =>
    Math.sqrt(Math.pow((creep.pos.x - a.pos.x), 2) + Math.pow((creep.pos.y - a.pos.y), 2))
    - Math.sqrt(Math.pow((creep.pos.x - b.pos.x), 2) + Math.pow((creep.pos.y - b.pos.y), 2)),
  );
}

function sortStructuresOnLowestHealth<T extends AnyStructure>(structures: T[]) {
  return structures.sort((a, b) => a.hits / a.hitsMax - b.hits / b.hitsMax);
}

function filterNotFull<T extends EnergyStructure>(structures: T[]) {
  return structures.filter(structure => structure.energy !== structure.energyCapacity);
}

function getStructures<T extends AnyStructure>(creep: Creep, constant: StructureConstant) {
  return creep.room.find(FIND_MY_STRUCTURES, {
    filter: structure => structure.structureType === constant,
  }) as T[];
}

function getClosestStructure<T extends AnyStructure>(creep: Creep, constant: StructureConstant) {
  const sortedStructures = sortStructuresOnClosest(creep, getStructures<T>(creep, constant));
  if (sortedStructures.length === 0) {
    return null;
  }
  return sortedStructures[0];
}

export function getClosestContainer(creep: Creep, containerId?: string) {

  if (containerId) {
    const container = Game.getObjectById(containerId) as Structure;
    if (!container) {
      return null;
    }
    return container as StructureContainer;
  }

  return getClosestStructure<StructureContainer>(creep, STRUCTURE_CONTAINER);
}

export function getClosestNotFullExtention(creep: Creep) {
  const extentions = getStructures<StructureExtension>(creep, STRUCTURE_EXTENSION);
  const filtered = sortStructuresOnClosest(creep, filterNotFull(extentions));
  if (filtered.length === 0) {
    return null;
  }
  return filtered[0];
}

export function getClosestNotFullSpawn(creep: Creep) {
  const extentions = getStructures<StructureSpawn>(creep, STRUCTURE_SPAWN);
  const filtered = sortStructuresOnClosest(creep, filterNotFull(extentions));
  if (filtered.length === 0) {
    return null;
  }
  return filtered[0];
}

export function getClosestRepairTarget(creep: Creep) {

  // Get all structures
  const targets = creep.room.find(FIND_STRUCTURES, {
    filter: object =>
      (object.hits < (object.hitsMax))
      && (object.structureType !== STRUCTURE_WALL)
      && (object.structureType !== STRUCTURE_RAMPART),
  });

  // Sort on lowest hits ratio
  const sortedTargets = sortStructuresOnLowestHealth(targets);

  // Throw if no targets exist
  if (sortedTargets.length === 0) {
    throw Error(`${creep.name}: Not able find any repair targets`);
  }

  return targets[0];
}
