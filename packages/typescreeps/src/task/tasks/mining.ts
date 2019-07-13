import { MiningTask } from '@typescreeps/common/dist';
import { getCreepByName, spawnCreep, mine, deposit, getSpawn } from '../../creep';
import { TaskBase } from './taskBase';

class Mining implements TaskBase<MiningTask> {

  public runTask(task: MiningTask) {

    const source = Game.getObjectById(task.sourceId) as Source;
    if (!source) {
      throw Error(`Task ${task.id}: Invalid sourceId ${task.sourceId}`);
    }

    const creep = getCreepByName(task.creepName);
    if (!creep) {
      spawnCreep(task.creepName, source);
      return;
    }

    if (creep.carry.energy < creep.carryCapacity) {
      mine(creep, source);
    } else {
      deposit(creep, this.getTarget(creep, task));
    }
  }

  private getTarget(creep: Creep, task: MiningTask): Structure {
    if (task.depositId) {
      const target = Game.getObjectById(task.depositId) as Structure;
      if (!target) {
        throw Error(`Task ${task.id}: Invalid depositId ${task.depositId}`);
      }
      return target;
    }

    const target = creep.pos.findClosestByRange(FIND_MY_STRUCTURES);
    if (!target) {
      throw Error(`Task ${task.id}: Found nowhere to deposit`);
    }
    return target;
  }
}

const mining = new Mining();

export { mining };
