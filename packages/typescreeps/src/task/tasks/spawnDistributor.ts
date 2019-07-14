import { TaskBase } from './taskBase';
import { SpawnDistributorTask } from '@typescreeps/common/dist';
import { getSpawnFromRoom, withdraw, deposit } from '@/creep';

export class SpawnDistribution extends TaskBase<SpawnDistributorTask>{

  runTask() {
    if (this.creep.carry.energy === 0) {
      withdraw(this.creep, this.getContainer());
    } else {
      const target = this.getTarget();
      if (target) {
        deposit(this.creep, target);
      }
    }
  }

  getSpawn() {
    return getSpawnFromRoom(this.getRoom());
  }

  getRoom(): Room {
    const room = Game.rooms[this.task.room];
    if (!room) {
      throw Error(`Task ${this.task.name}: Room ${this.task.room} not found`);
    }
    return room;
  }

  getContainer() {
    if (this.task.containerId) {
      const container = Game.getObjectById(this.task.containerId) as Structure;
      if (!container) {
        throw Error(`Task ${this.task.name}: Invalid containerId ${this.task.containerId}`);
      }
      return container;
    }

    const container = this.creep.pos.findClosestByRange(FIND_MY_STRUCTURES);
    if (!container) {
      throw Error(`Task ${this.task.name}: Found no source`);
    }
    return container;
  }

  getTarget() {

    const targets = this.creep.room.find(FIND_STRUCTURES, {
      filter: (structure) => {
        return (structure.structureType === STRUCTURE_EXTENSION ||
          structure.structureType === STRUCTURE_SPAWN)
          && structure.energy < structure.energyCapacity;
      },
    });

    // Sort on distance to targets
    const sortedTargets = targets.sort((a, b) =>
      // tslint:disable-next-line:max-line-length
      Math.sqrt(Math.pow((this.creep.pos.x - a.pos.x), 2) + Math.pow((this.creep.pos.y - a.pos.y), 2))
      // tslint:disable-next-line:max-line-length
      - Math.sqrt(Math.pow((this.creep.pos.x - b.pos.x), 2) + Math.pow((this.creep.pos.y - b.pos.y), 2)),
    );

    if (sortedTargets.length !== 0) {
      return sortedTargets[0];
    }
    return null;
  }
}
