import { TaskBase } from './taskBase';
import { UpgradeTask } from '@typescreeps/common/dist';
import { getSpawnFromRoomObject, withdraw, upgradeController } from '@/creep';

export class Upgrade extends TaskBase<UpgradeTask> {

  runTask() {
    if (this.creep.carry.energy <= 1) {
      withdraw(this.creep, this.getContainer());
    } else {
      upgradeController(this.creep, this.getController());
    }
  }

  getSpawn() {
    return getSpawnFromRoomObject(this.getController());
  }

  getRoom(): Room {
    const room = Game.rooms[this.task.room];
    if (!room) {
      throw Error(`Task ${this.task.name}: Room ${this.task.room} not found`);
    }
    return room;
  }

  getController() {
    const controller = this.getRoom().controller;
    if (!controller) {
      throw Error(`Task ${this.task.name}: Controller not found in room ${this.task.room}`);
    }
    return controller;
  }

  getContainer() {
    if (this.task.containerId) {
      const container = Game.getObjectById(this.task.containerId) as Structure;
      if (!container) {
        throw Error(`Task ${this.task.name}: Invalid containerId ${this.task.containerId}`);
      }
      return container;
    }

    const container = this.creep.pos.findClosestByRange(FIND_MY_STRUCTURES);
    if (!container) {
      throw Error(`Task ${this.task.name}: Found no source`);
    }
    return container;
  }
}
