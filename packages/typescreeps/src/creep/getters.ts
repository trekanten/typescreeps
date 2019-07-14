export function getClosestContainer(creep: Creep, containerId?: string) {

  // Get spesified container
  if (containerId) {
    const container = Game.getObjectById(containerId) as Structure;
    if (!container) {
      console.log(`WARN: ${creep.name} not able to get container with id ${containerId}`);
    } else {
      return container;
    }
  }

  // Get containers and storages
  const containers = creep.room.find(FIND_STRUCTURES, {
    filter: (structure) => {
      return (structure.structureType === STRUCTURE_CONTAINER
        || structure.structureType === STRUCTURE_STORAGE);
    },
  }) as (StructureContainer | StructureStorage)[];

  // Sort and get closest container
  const sortedContainers = containers.sort((a, b) =>
    Math.sqrt(Math.pow((creep.pos.x - a.pos.x), 2) + Math.pow((creep.pos.y - a.pos.y), 2))
    - Math.sqrt(Math.pow((creep.pos.x - b.pos.x), 2) + Math.pow((creep.pos.y - b.pos.y), 2)),
  );

  // Throw if no containers exist
  if (sortedContainers.length === 0) {
    throw Error(`${creep.name}: Not able find any containers`);
  }

  return sortedContainers[0];
}

export function getClosestRepairTarget(creep: Creep) {

  // Get all structures
  const targets = creep.room.find(FIND_STRUCTURES, {
    filter: object =>
      (object.hits < (object.hitsMax))
      && (object.structureType !== STRUCTURE_WALL)
      && (object.structureType !== STRUCTURE_RAMPART),
  }) as Structure[];

  // Sort on lowest hits ratio
  const sortedTargets = targets.sort((a, b) => a.hits / a.hitsMax - b.hits / b.hitsMax);

  // Throw if no targets exist
  if (sortedTargets.length === 0) {
    throw Error(`${creep.name}: Not able find any repair targets`);
  }

  return targets[0];
}
