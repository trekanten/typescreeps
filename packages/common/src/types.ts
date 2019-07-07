export enum TaskType {
  MINE = 'mine',
}

export interface Task {
  id: string;
  type: TaskType;
}
