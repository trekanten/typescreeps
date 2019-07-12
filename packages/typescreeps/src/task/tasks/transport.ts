import { TaskType, TransportTask, TransportTaskParams } from '@typescreeps/common/dist';
import { getCreepByName, spawnCreep, deposit, withdraw } from '../../creep';
import { TaskBase } from './taskBase';

class Transport implements TaskBase<TransportTask, TransportTaskParams> {

  public runTask(task: TransportTask) {

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

  public createTask(params: TransportTask) {
    return {
      id: params.id,
      type: TaskType.TRANSPORT,
      to: params.to,
      from: params.from,
      creepName: params.creepName,
    };
  }
}

const transport = new Transport();

export { transport };
