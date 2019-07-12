import { TaskType, MiningTask, MiningTaskParams } from '@typescreeps/common/dist';
import { getCreepByName, spawnCreep, mine, deposit, getSpawn } from '../../creep';
import { TaskBase } from './taskBase';

class Mining implements TaskBase<MiningTask, MiningTaskParams> {

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
      deposit(creep, getSpawn(source));
    }

  }

  public createTask(params: MiningTask) {
    return {
      id: params.id,
      type: TaskType.MINE,
      sourceId: params.sourceId,
      creepName: params.creepName,
    };
  }
}

const mining = new Mining();

export { mining };
