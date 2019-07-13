export enum TaskType {
  MINE = 'mine',
  BUILD = 'build',
  CARRY = 'carry',
}

export interface Task {
  id: string;
  type: string;
}

export interface MiningTask extends Task {
  creepName: string;
  sourceId: string;
  depositId?: string;
}

export interface CarryTask extends Task {
  creepName: string;
  from: string;
  to: string;
}
