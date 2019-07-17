import { Task } from '@typescreeps/common/dist';
import { spawnCreep } from '@/helpers/spawnMethods';

export abstract class TaskBase<TaskType extends Task> {

  protected task: TaskType;
  protected creep: Creep;

  constructor(task: TaskType) {
    this.task = task;
    const creep = Game.creeps[this.task.name];
    if (!creep) {
      spawnCreep(this.task, this.getSpawnRoom());
      throw Error(`Task ${this.task.name}: Waiting for creep to spawn`);
    }
    this.creep = creep;
  }

  protected abstract runTask(): void;
  protected abstract getSpawnRoom(): Room;
}
