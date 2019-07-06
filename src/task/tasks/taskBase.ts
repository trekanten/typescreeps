export abstract class TaskBase<Type, Params> {
  public abstract runTask(task: Type): void;
  public abstract createTask(params: Params): Type;
}
