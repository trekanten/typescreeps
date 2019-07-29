// tslint:disable:max-line-length

import { TaskType, Task, BuildTask, CarryTask, ClaimTask, MineTask, MineBuildTask, RepairTask, SpawnDistributorTask, UpgradeTask, ReserveTask, RoomDefendTask } from '@typescreeps/common';

interface TaskTypeInfo<T extends Task> {
  icon: string;
  formName: string;
  emptyTask: T;
}

const buildTaskInfo: TaskTypeInfo<BuildTask> = {
  icon: 'https://image.flaticon.com/icons/svg/53/53124.svg',
  formName: 'BuildTaskForm',
  emptyTask: {
    name: '',
    type: TaskType.BUILD,
    bodyParts: [],
    room: '',
  },
};

const carryTaskInfo: TaskTypeInfo<CarryTask> = {
  icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg55n5jApHfBWx2LkmUBT_WCxJbDIPsk5a98ciL6H_uoXbz8dv',
  formName: 'CarryTaskForm',
  emptyTask: {
    name: '',
    type: TaskType.CARRY,
    bodyParts: [],
    from: '',
    to: '',
  },
};

const claimTaskInfo: TaskTypeInfo<ClaimTask> = {
  icon: 'https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_303026.png&f=1',
  formName: 'ClaimTaskForm',
  emptyTask: {
    name: '',
    type: TaskType.CLAIM,
    bodyParts: [],
    targetRoom: '',
    spawnRoom: '',
  },
};

const mineTaskInfo: TaskTypeInfo<MineTask> = {
  icon: 'https://image.flaticon.com/icons/png/512/62/62867.png',
  formName: 'MineTaskForm',
  emptyTask: {
    name: '',
    type: TaskType.MINE,
    bodyParts: [],
    sourceId: '',
  },
};

const mineBuildTaskInfo: TaskTypeInfo<MineBuildTask> = {
  icon: 'https://image.flaticon.com/icons/png/512/62/62867.png',
  formName: 'MineBuildTaskForm',
  emptyTask: {
    name: '',
    type: TaskType.MINE_BUILD,
    bodyParts: [],
    sourceId: '',
  },
};

const repairBuildTaskInfo: TaskTypeInfo<RepairTask> = {
  icon: 'http://cdn.onlinewebfonts.com/svg/img_96545.png',
  formName: 'RepairTaskForm',
  emptyTask: {
    name: '',
    type: TaskType.REPAIR,
    bodyParts: [],
    room: '',
  },
};

const reserveBuildTaskInfo: TaskTypeInfo<ReserveTask> = {
  icon: 'https://image.flaticon.com/icons/png/128/174/174444.png',
  formName: 'ReserveTaskForm',
  emptyTask: {
    name: '',
    type: TaskType.RESERVE,
    bodyParts: [],
    targetRoom: '',
    spawnRoom: '',
  },
};

const roomDefendTaskInfo: TaskTypeInfo<RoomDefendTask> = {
  icon: 'https://static.thenounproject.com/png/1162-200.png',
  formName: 'RoomDefendTaskForm',
  emptyTask: {
    name: '',
    type: TaskType.ROOM_DEFEND,
    bodyParts: [],
    room: '',
  },
};

const spawnDistributorBuildTaskInfo: TaskTypeInfo<SpawnDistributorTask> = {
  icon: 'http://cdn.onlinewebfonts.com/svg/img_267113.png',
  formName: 'SpawnDistributorTaskForm',
  emptyTask: {
    name: '',
    type: TaskType.SPAWN_DISTRIBUTOR,
    bodyParts: [],
    room: '',
  },
};

const upgradeBuildTaskInfo: TaskTypeInfo<UpgradeTask> = {
  icon: 'https://png.pngtree.com/svg/20170911/89070ef39e.svg',
  formName: 'UpgradeTaskForm',
  emptyTask: {
    name: '',
    type: TaskType.UPGRADE,
    bodyParts: [],
    room: '',
  },
};

export function getTaskInfo(taskType: TaskType | string): TaskTypeInfo<Task> {
  switch (taskType) {

    case TaskType.BUILD:
      return buildTaskInfo;

    case TaskType.CARRY:
      return carryTaskInfo;

    case TaskType.CLAIM:
      return claimTaskInfo;

    case TaskType.MINE:
      return mineTaskInfo;

    case TaskType.MINE_BUILD:
      return mineBuildTaskInfo;

    case TaskType.REPAIR:
      return repairBuildTaskInfo;

    case TaskType.RESERVE:
      return reserveBuildTaskInfo;

    case TaskType.ROOM_DEFEND:
      return roomDefendTaskInfo;

    case TaskType.SPAWN_DISTRIBUTOR:
      return spawnDistributorBuildTaskInfo;

    case TaskType.UPGRADE:
      return upgradeBuildTaskInfo;

    default: {
      throw Error(`Task form for task type ${taskType} not found`);
    }
  }
}

export function getTaskTypeIcon(taskType: TaskType | string) {
  return getTaskInfo(taskType).icon;
}

export function getTaskTypeArray(): TaskType[] {
  const taskTypes = [];
  for (const key in TaskType) {
    taskTypes.push(TaskType[key] as TaskType);
  }
  return taskTypes;
}

export function getTaskForm(taskType: TaskType | string) {
  return getTaskInfo(taskType).formName;
}

export function getEmptyTask(taskType: TaskType | string): Task {
  return getTaskInfo(taskType).emptyTask;
}
