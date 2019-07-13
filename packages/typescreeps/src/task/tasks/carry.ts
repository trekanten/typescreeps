import { CarryTask } from '@typescreeps/common/dist';
import { getCreepByName, spawnCreep, deposit, withdraw } from '../../creep';
import { TaskBase } from './taskBase';

export class Carry extends TaskBase<CarryTask> {

  public runTask() {

    const from = Game.getObjectById(this.task.from) as Structure;
    if (!from) {
      throw Error(`Task ${this.task.id}: Invalid 'from' ${this.task.from}`);
    }

    const to = Game.getObjectById(this.task.from) as Structure;
    if (!to) {
      throw Error(`Task ${this.task.id}: Invalid 'to' ${this.task.to}`);
    }

    const creep = getCreepByName(this.task.creepName);
    if (!creep) {
      spawnCreep(this.task.creepName, from);
      return;
    }

    if (creep.carry.energy < creep.carryCapacity) {
      withdraw(creep, from);
    } else {
      deposit(creep, to);
    }
  }
}
