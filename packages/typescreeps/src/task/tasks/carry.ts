import { CarryTask } from '@typescreeps/common/dist';
import { deposit, withdraw } from '@/helpers/creepActions';
import { TaskBase } from './taskBase';

export class Carry extends TaskBase<CarryTask> {

  runTask() {
    if (this.creep.carry.energy < this.creep.carryCapacity) {
      withdraw(this.creep, this.getFrom());
    } else {
      deposit(this.creep, this.getTo());
    }
  }

  getFrom() {
    const from = Game.getObjectById(this.task.from) as Structure;
    if (!from) {
      throw Error(`Task ${this.task.name}: Invalid 'from' ${this.task.from}`);
    }
    return from;
  }

  getTo() {
    const to = Game.getObjectById(this.task.to) as Structure;
    if (!to) {
      throw Error(`Task ${this.task.name}: Invalid 'to' ${this.task.to}`);
    }
    return to;
  }

  getSpawnRoom() {
    return this.getFrom().room;
  }
}
