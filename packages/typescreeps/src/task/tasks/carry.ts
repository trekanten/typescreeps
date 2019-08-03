import { CarryTask } from '@typescreeps/common/dist';
import { deposit, withdraw } from '@/helpers/creepActions';
import { TaskBase } from './taskBase';
import { getContainerById } from '@/helpers/structureGetters';

export class Carry extends TaskBase<CarryTask> {

  runTask() {
    if (this.creep.carry.energy < this.creep.carryCapacity) {
      withdraw(this.creep, this.getFrom());
    } else {
      deposit(this.creep, this.getTo());
    }
  }

  getFrom() {
    const from = getContainerById(this.task.from);
    if (!from) {
      throw Error(`Task ${this.task.name}: Invalid 'from' ${this.task.from}`);
    }
    return from;
  }

  getTo() {
    const to = getContainerById(this.task.to);
    if (!to) {
      throw Error(`Task ${this.task.name}: Invalid 'to' ${this.task.to}`);
    }
    return to;
  }

  getSpawnRoom() {
    return this.getFrom().room;
  }
}
