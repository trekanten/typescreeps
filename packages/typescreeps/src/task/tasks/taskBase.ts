import { Task } from '@typescreeps/common/dist';
import { spawnCreep } from '@/helpers/spawnMethods';
import { spawner } from '@/spawn/spawner';

export abstract class TaskBase<TaskType extends Task> {

  protected task: TaskType;
  protected creep: Creep;

  constructor(task: TaskType) {
    this.task = task;
    const creep = Game.creeps[this.task.name];
    if (!creep) {
      spawner.addCreep({ task: this.task, room: this.getSpawnRoom() });
      spawnCreep(this.task.bodyParts, this.task.name, this.getSpawnRoom());
      throw Error(`Task ${this.task.name}: Waiting for creep to spawn`);
    }
    this.creep = creep;
  }

  protected abstract runTask(): void;
  protected abstract getSpawnRoom(): Room;
}
