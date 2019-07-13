export enum TaskType {
  BUILD = 'build',
  CARRY = 'carry',
  MINE = 'mine',
  UPGRADE = 'upgrade',
}

export interface Task {
  name: string;
  type: string;
}

export interface BuildTask extends Task {
  type: TaskType.BUILD;
  room: string;
  sourceId?: string;
  priority?: string[];
}

export interface CarryTask extends Task {
  type: TaskType.CARRY;
  from: string;
  to: string;
}

export interface MiningTask extends Task {
  type: TaskType.MINE;
  sourceId: string;
  depositId?: string;
}

export interface UpgradeTask extends Task {
  type: TaskType.UPGRADE;
  room: string;
  sourceId?: string;
}
