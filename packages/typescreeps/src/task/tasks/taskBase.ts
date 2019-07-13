export abstract class TaskBase<Type> {
  public abstract runTask(task: Type): void;
}
