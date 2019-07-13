import { Task } from '@typescreeps/common/dist';
import { spawnCreep } from '@/creep';

export abstract class TaskBase<TaskType extends Task> {

  protected task: TaskType;
  protected creep: Creep;

  constructor(task: TaskType) {
    this.task = task;
    const creep = Game.creeps[this.task.name];
    if (!creep) {
      spawnCreep(this.task, this.getSpawn());
      throw Error(`Task ${this.task.name}: Waiting for creep to spawn`);
    }
    this.creep = creep;
  }

  protected abstract runTask(): void;
  protected abstract getSpawn(): StructureSpawn;
}
