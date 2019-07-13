export function build(creep: Creep, target: ConstructionSite) {
  if (creep.build(target) === ERR_NOT_IN_RANGE) {
    creep.moveTo(target);
  }
}

export function withdraw(creep: Creep, source: Structure) {
  if (creep.withdraw(source, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
    creep.moveTo(source);
  }
}

export function deposit(creep: Creep, target: Structure) {
  if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
    creep.moveTo(target);
  }
}

export function mine(creep: Creep, source: Source) {
  if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
    creep.moveTo(source);
  }
}

export function upgradeController(creep: Creep, controller: StructureController) {
  if (creep.upgradeController(controller) === ERR_NOT_IN_RANGE) {
    creep.moveTo(controller);
  }
}
