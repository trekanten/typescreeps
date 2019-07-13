import { CarryTask } from '@typescreeps/common/dist';
import { getCreepByName, spawnCreep, deposit, withdraw } from '../../creep';
import { TaskBase } from './taskBase';

class Carry implements TaskBase<CarryTask> {

  public runTask(task: CarryTask) {

    const from = Game.getObjectById(task.from) as Structure;
    if (!from) {
      throw Error(`Task ${task.id}: Invalid 'from' ${task.from}`);
    }

    const to = Game.getObjectById(task.from) as Structure;
    if (!to) {
      throw Error(`Task ${task.id}: Invalid 'to' ${task.to}`);
    }

    const creep = getCreepByName(task.creepName);
    if (!creep) {
      spawnCreep(task.creepName, from);
      return;
    }

    if (creep.carry.energy < creep.carryCapacity) {
      withdraw(creep, from);
    } else {
      deposit(creep, to);
    }
  }
}

const carry = new Carry();

export { carry };
