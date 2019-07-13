export abstract class TaskBase<Type> {

  protected task: Type;

  constructor(task: Type) {
    this.task = task;
  }

  public abstract runTask(): void;
}
