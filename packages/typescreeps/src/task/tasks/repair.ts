import { TaskBase } from './taskBase';
import { RepairTask } from '@typescreeps/common/dist';
import { getSpawnFromRoomObject, withdraw, repair } from '@/creep';

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
      withdraw(this.creep, this.getSource());
    }
  }

  getSource() {
    if (this.task.sourceId) {
      const source = Game.getObjectById(this.task.sourceId) as Structure;
      if (!source) {
        throw Error(`Task ${this.task.name}: Invalid sourceId ${this.task.sourceId}`);
      }
      return source;
    }

    const source = this.creep.pos.findClosestByRange(FIND_MY_STRUCTURES);
    if (!source) {
      throw Error(`Task ${this.task.name}: Found no source`);
    }
    return source;
  }

  getSpawn() {
    return getSpawnFromRoomObject(getSpawnFromRoomObject(this.getSource()));
  }
}
