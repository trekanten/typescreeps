export enum TaskType {
  MINE = 'mine',
  BUILD = 'build',
  TRANSPORT = 'transport',
}

export interface Task {
  id: string;
  type: TaskType;
}

export interface MiningTaskParams {
  creepName: string;
  sourceId: string;
}

export type MiningTask = Task & MiningTaskParams;
