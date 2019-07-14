export enum TaskType {
  BUILD = 'build',
  CARRY = 'carry',
  MINE = 'mine',
  MINE_BUILD = 'mine_build',
  UPGRADE = 'upgrade',
}

export enum BodyPart {
  MOVE = 'move',
  WORK = 'work',
  CARRY = 'carry',
  ATTACK = 'attack',
  RANGED_ATTACK = 'ranged_attack',
  TOUGH = 'tough',
  HEAL = 'heal',
  CLAIM = 'claim',
}

export interface Task {
  name: string;
  type: string;
  bodyParts: BodyPart[];
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

export interface MineTask extends Task {
  type: TaskType.MINE;
  sourceId: string;
  depositId?: string;
}

export interface MineBuildTask extends Task {
  type: TaskType.MINE_BUILD;
  sourceId: string;
}

export interface UpgradeTask extends Task {
  type: TaskType.UPGRADE;
  room: string;
  sourceId?: string;
}
