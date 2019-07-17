import { Task } from '@typescreeps/common';

export interface ITaskForm<T extends Task> {
  task: T;

  validate: () => Promise<boolean>;
  reset: (task: T) => void;
}
