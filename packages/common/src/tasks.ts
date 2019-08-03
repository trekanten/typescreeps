export enum TaskType {
  BUILD = 'build',
  CARRY = 'carry',
  CLAIM = 'claim',
  MINE = 'mine',
  MINE_BUILD = 'mine_build',
  REPAIR = 'repair',
  RESERVE = 'reserve',
  ROOM_DEFEND = 'room_defend',
  SPAWN_DISTRIBUTOR = 'spawn_distributor',
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

export interface TaskOptions {
  spawnRoom?: string;
  spawnPriority?: number;
}

export interface Task {
  name: string;
  type: string;
  bodyParts: BodyPart[];
  options?: TaskOptions;
}

export interface BuildTask extends Task {
  type: TaskType.BUILD;
  room: string;
  containerId?: string;
}

export interface CarryTask extends Task {
  type: TaskType.CARRY;
  from: string;
  to: string;
}

export interface ClaimTask extends Task {
  type: TaskType.CLAIM;
  targetRoom: string;
  spawnRoom: string;
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

export interface RepairTask extends Task {
  type: TaskType.REPAIR;
  room: string;
  containerId?: string;
}

export interface ReserveTask extends Task {
  type: TaskType.RESERVE;
  targetRoom: string;
  spawnRoom: string;
}

export interface RoomDefendTask extends Task {
  type: TaskType.ROOM_DEFEND;
  room: string;
}

export interface SpawnDistributorTask extends Task {
  type: TaskType.SPAWN_DISTRIBUTOR;
  room: string;
  containerId?: string;
}

export interface UpgradeTask extends Task {
  type: TaskType.UPGRADE;
  room: string;
  containerId?: string;
}
