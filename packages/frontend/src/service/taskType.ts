// tslint:disable:max-line-length

import { TaskType } from '@typescreeps/common';

export function getTaskTypeIcon(taskType: TaskType | string) {
  switch (taskType) {
    case TaskType.BUILD: return 'https://image.flaticon.com/icons/svg/53/53124.svg';
    case TaskType.CARRY: return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg55n5jApHfBWx2LkmUBT_WCxJbDIPsk5a98ciL6H_uoXbz8dv';
    case TaskType.CLAIM: return 'https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_303026.png&f=1';
    case TaskType.MINE: return 'https://image.flaticon.com/icons/png/512/62/62867.png';
    case TaskType.MINE_BUILD: return 'https://image.flaticon.com/icons/png/512/62/62867.png';
    case TaskType.REPAIR: return 'http://cdn.onlinewebfonts.com/svg/img_96545.png';
    case TaskType.SPAWN_DISTRIBUTOR: return 'http://cdn.onlinewebfonts.com/svg/img_267113.png';
    case TaskType.UPGRADE: return 'https://png.pngtree.com/svg/20170911/89070ef39e.svg';
    default: return 'https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.flaticon.com%2Ficons%2Fpng%2F512%2F36%2F36601.png&f=1';
  }
}

export function getTaskForm(taskType: TaskType | string) {
  switch (taskType) {

    case TaskType.BUILD:
      return 'BuildTaskForm';

    case TaskType.CARRY:
      return 'CarryTaskForm';

    case TaskType.CLAIM:
      return 'ClaimTaskForm';

    case TaskType.MINE:
      return 'MineTaskForm';

    case TaskType.MINE_BUILD:
      return 'MineBuildTaskForm';

    case TaskType.REPAIR:
      return 'RepairTaskForm';

    case TaskType.SPAWN_DISTRIBUTOR:
      return 'SpawnDistributorTaskForm';

    case TaskType.UPGRADE:
      return 'UpgradeTaskForm';

    default: {
      console.error(`Task form for task type ${taskType} not found`);
      return null;
    }
  }
}
