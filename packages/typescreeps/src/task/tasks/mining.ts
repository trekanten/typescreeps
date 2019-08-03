import { MineTask } from '@typescreeps/common/dist';
import { mine, deposit } from '@/helpers/creepActions';
import { TaskBase } from './taskBase';
import { getContainerById } from '@/helpers/structureGetters';

export class Mining extends TaskBase<MineTask> {

  runTask() {
    if (this.creep.carry.energy < this.creep.carryCapacity) {
      mine(this.creep, this.getSource());
    } else {
      deposit(this.creep, this.getTarget());
    }
  }

  getSource() {
    const source = Game.getObjectById(this.task.sourceId) as Source | null;
    if (!source) {
      throw Error(`Task ${this.task.name}: Invalid sourceId ${this.task.sourceId}`);
    }
    return source;
  }

  getTarget(): Structure {
    if (this.task.depositId) {
      const target =  getContainerById(this.task.depositId);
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

  getSpawnRoom() {
    return this.getSource().room;
  }
}
