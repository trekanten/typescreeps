// tslint:disable:max-line-length

type EnergyStructure =
  // | StructureContainer
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

function filterNotEmpty<T extends EnergyStructure>(structures: T[]) {
  return structures.filter(structure => structure.energy !== 0);
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

function getClosestNotFullStructure<T extends EnergyStructure>(creep: Creep, constant: StructureConstant) {
  const structures = getStructures<T>(creep, constant);
  const notFullStructures = sortStructuresOnClosest(creep, filterNotFull(structures));
  if (notFullStructures.length === 0) {
    return null;
  }
  return notFullStructures[0];
}

function getClosestNotEmptyStructure<T extends EnergyStructure>(creep: Creep, constant: StructureConstant) {
  const structures = getStructures<T>(creep, constant);
  const notEmptyStructures = sortStructuresOnClosest(creep, filterNotEmpty(structures));
  if (notEmptyStructures.length === 0) {
    return null;
  }
  return notEmptyStructures[0];
}

function getContainerById(containerId: string) {
  const container = Game.getObjectById(containerId) as Structure;
  if (!container) {
    return null;
  }
  return container as StructureContainer;
}

export function getClosestContainer(creep: Creep, containerId?: string) {
  if (containerId) {
    const container = getContainerById(containerId);
    if (container) {
      return container;
    }
  }
  return getClosestStructure<StructureContainer>(creep, STRUCTURE_CONTAINER);
}

export function getClosestNotFullExtention(creep: Creep) {
  return getClosestNotFullStructure<StructureExtension>(creep, STRUCTURE_EXTENSION);
}

export function getClosestNotFullSpawn(creep: Creep) {
  return getClosestNotFullStructure<StructureSpawn>(creep, STRUCTURE_SPAWN);
}

export function getClosestNotFullTower(creep: Creep) {
  return getClosestNotFullStructure<StructureTower>(creep, STRUCTURE_TOWER);
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
