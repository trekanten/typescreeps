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

function sortStructuresOnClosest<T extends AnyStructure>(pos: RoomPosition, structures: T[]) {
  return structures.sort((a, b) =>
    Math.sqrt(Math.pow((pos.x - a.pos.x), 2) + Math.pow((pos.y - a.pos.y), 2))
    - Math.sqrt(Math.pow((pos.x - b.pos.x), 2) + Math.pow((pos.y - b.pos.y), 2)),
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

function getStructures<T extends AnyStructure>(room: Room, constant: StructureConstant) {
  return room.find(FIND_STRUCTURES, {
    filter: structure => structure.structureType === constant,
  }) as T[];
}

function getClosestStructure<T extends AnyStructure>(creep: Creep, constant: StructureConstant) {
  const sortedStructures = sortStructuresOnClosest(creep.pos, getStructures<T>(creep.room, constant));
  if (sortedStructures.length === 0) {
    return null;
  }
  return sortedStructures[0];
}

function getClosestNotFullStructure<T extends EnergyStructure>(creep: Creep, constant: StructureConstant) {
  const structures = getStructures<T>(creep.room, constant);
  const notFullStructures = sortStructuresOnClosest(creep.pos, filterNotFull(structures));
  if (notFullStructures.length === 0) {
    return null;
  }
  return notFullStructures[0];
}

function getClosestNotEmptyStructure<T extends EnergyStructure>(creep: Creep, constant: StructureConstant) {
  const structures = getStructures<T>(creep.room, constant);
  const notEmptyStructures = sortStructuresOnClosest(creep.pos, filterNotEmpty(structures));
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

export function getTowers(room: Room) {
  return getStructures<StructureTower>(room, STRUCTURE_TOWER);
}

export function getLowestRepairTarget(room: Room) {

  // Get all structures
  const targets = room.find(FIND_STRUCTURES, {
    filter: object =>
      (object.hits < (object.hitsMax))
      && (object.structureType !== STRUCTURE_WALL)
      && (object.structureType !== STRUCTURE_RAMPART),
  });

  // Sort on lowest hits ratio
  const sortedTargets = sortStructuresOnLowestHealth(targets);

  // Throw if no targets exist
  if (sortedTargets.length === 0) {
    return null;
  }

  return targets[0];
}
