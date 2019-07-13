import { MiningTask } from '@typescreeps/common/dist';
import { getCreepByName, spawnCreep, mine, deposit } from '../../creep';
import { TaskBase } from './taskBase';

export class Mining extends TaskBase<MiningTask> {

  private source: Source;
  private creep: Creep;

  constructor(task: MiningTask) {
    super(task);

    const source = Game.getObjectById(this.task.sourceId) as Source;
    if (!source) {
      throw Error(`Task ${this.task.id}: Invalid sourceId ${this.task.sourceId}`);
    }
    this.source = source;

    const creep = getCreepByName(this.task.creepName);
    if (!creep) {
      spawnCreep(this.task.creepName, this.source);
      throw Error(`Task ${this.task.id}: Waiting for creep ${task.creepName} to spawn`);
    }
    this.creep = creep;
  }

  public runTask() {
    if (this.creep.carry.energy < this.creep.carryCapacity) {
      mine(this.creep, this.source);
    } else {
      deposit(this.creep, this.getTarget());
    }
  }

  private getTarget(): Structure {
    if (this.task.depositId) {
      const target = Game.getObjectById(this.task.depositId) as Structure;
      if (!target) {
        throw Error(`Task ${this.task.id}: Invalid depositId ${this.task.depositId}`);
      }
      return target;
    }

    const target = this.creep.pos.findClosestByRange(FIND_MY_STRUCTURES);
    if (!target) {
      throw Error(`Task ${this.task.id}: Found nowhere to deposit`);
    }
    return target;
  }
}
