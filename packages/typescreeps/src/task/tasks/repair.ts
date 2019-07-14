import { TaskBase } from './taskBase';
import { RepairTask } from '@typescreeps/common/dist';
import { withdraw, repair, getSpawnFromRoom } from '@/creep';

export class Repair extends TaskBase<RepairTask> {

  runTask() {
    if (this.creep.carry.energy === this.creep.carryCapacity) {
      this.creep.memory.repair = true;
    } else if (this.creep.carry.energy === 0) {
      this.creep.memory.repair = false;
    }

    if (this.creep.memory.repair === true) {

      const targets = this.creep.room.find(FIND_STRUCTURES, {
        // tslint:disable-next-line:max-line-length
        filter: object => (object.hits < (object.hitsMax)) && (object.structureType !== STRUCTURE_WALL) && (object.structureType !== STRUCTURE_RAMPART),
      });
      targets.sort((a, b) => a.hits / a.hitsMax - b.hits / b.hitsMax);
      const target = targets[0];

      if (target !== undefined) {
        repair(this.creep, target);
      } else {
        this.creep.say('Done!');
      }
    } else {
      withdraw(this.creep, this.getContainer());
    }
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

  getRoom(): Room {
    const room = Game.rooms[this.task.room];
    if (!room) {
      throw Error(`Task ${this.task.name}: Room ${this.task.room} not found`);
    }
    return room;
  }

  getSpawn() {
    return getSpawnFromRoom(this.getRoom());
  }
}
