export function goToRoom(creep: Creep, targetRoom: Room) {
  if (targetRoom.name === creep.room.name) {
    return true;
  }
  const exitDir = creep.room.findExitTo(targetRoom) as ExitConstant;
  const exit = creep.pos.findClosestByRange(exitDir) as RoomPosition;
  creep.moveTo(exit);
  return false;
}

export function build(creep: Creep, target: ConstructionSite) {
  if (target.room) {
    if (goToRoom(creep, target.room)) {
      if (creep.build(target) === ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
      }
    }
  } else {
    if (creep.build(target) === ERR_NOT_IN_RANGE) {
      creep.moveTo(target);
    }

  }
}

export function deposit(creep: Creep, target: Structure) {
  if (goToRoom(creep, target.room)) {
    if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      creep.moveTo(target);
    }
  }
}

export function mine(creep: Creep, source: Source) {
  if (goToRoom(creep, source.room)) {
    if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
      creep.moveTo(source);
    }
  }
}

export function repair(creep: Creep, structure: Structure) {
  if (goToRoom(creep, structure.room)) {
    if (creep.repair(structure) === ERR_NOT_IN_RANGE) {
      creep.moveTo(structure);
    }
  }
}

export function upgradeController(creep: Creep, controller: StructureController) {
  if (goToRoom(creep, controller.room)) {
    if (creep.upgradeController(controller) === ERR_NOT_IN_RANGE) {
      creep.moveTo(controller);
    }
  }
}

export function withdraw(creep: Creep, source: Structure) {
  if (goToRoom(creep, source.room)) {
    if (creep.withdraw(source, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      creep.moveTo(source);
    }
  }
}

export function pickup(creep: Creep, resource: Resource) {
  if (creep.pickup(resource) === ERR_NOT_IN_RANGE) {
    creep.moveTo(resource);
  }
}

export function widthdrawTombStone(creep: Creep, tombStone: Tombstone) {
  if (creep.withdraw(tombStone, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
    creep.moveTo(tombStone);
  }
}

export function attack(creep: Creep, target: Creep) {
  if (goToRoom(creep, target.room)) {
    if (creep.attack(target) === ERR_NOT_IN_RANGE) {
      creep.moveTo(target);
    }
  }
}
