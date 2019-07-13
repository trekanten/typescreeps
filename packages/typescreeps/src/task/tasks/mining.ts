import { MiningTask } from '@typescreeps/common/dist';
import { mine, deposit, getSpawnFromRoomObject } from '../../creep';
import { TaskBase } from './taskBase';

export class Mining extends TaskBase<MiningTask> {

  runTask() {
    if (this.creep.carry.energy < this.creep.carryCapacity) {
      mine(this.creep, this.getSource());
    } else {
      deposit(this.creep, this.getTarget());
    }
  }

  getSource() {
    const source = Game.getObjectById(this.task.sourceId) as Source;
    if (!source) {
      throw Error(`Task ${this.task.name}: Invalid sourceId ${this.task.sourceId}`);
    }
    return source;
  }

  getTarget(): Structure {
    if (this.task.depositId) {
      const target = Game.getObjectById(this.task.depositId) as Structure;
      if (!target) {
        throw Error(`Task ${this.task.name}: Invalid depositId ${this.task.depositId}`);
      }
      return target;
    }

    const target = this.creep.pos.findClosestByRange(FIND_MY_STRUCTURES);
    if (!target) {
      throw Error(`Task ${this.task.name}: Found nowhere to deposit`);
    }
    return target;
  }

  getSpawn() {
    return getSpawnFromRoomObject(this.getSource());
  }
}
