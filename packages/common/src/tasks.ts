export enum TaskType {
  MINE = 'mine',
  BUILD = 'build',
  CARRY = 'carry',
}

export interface Task {
  name: string;
  type: string;
}

export interface MiningTask extends Task {
  sourceId: string;
  depositId?: string;
}

export interface CarryTask extends Task {
  from: string;
  to: string;
}
