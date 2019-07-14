import { TaskBase } from './taskBase';
import { UpgradeTask } from '@typescreeps/common/dist';
import { getSpawnFromRoomObject, withdraw, upgradeController } from '@/creep';
import { getClosestContainer } from '@/creep/getters';

export class Upgrade extends TaskBase<UpgradeTask> {

  runTask() {
    if (this.creep.carry.energy === this.creep.carryCapacity) {
      this.creep.memory.upgrade = true;
      this.creep.memory.containerId = null;
    } else if (this.creep.carry.energy === 0) {
      this.creep.memory.upgrade = false;
    }

    if (this.creep.memory.upgrade) {
      upgradeController(this.creep, this.getController());
    } else {
      if (!this.creep.memory.containerId) {
        this.creep.memory.containerId = getClosestContainer(this.creep, this.task.containerId).id;
      }
      const container = Game.getObjectById(this.creep.memory.containerId) as Structure;
      withdraw(this.creep, container);
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
}
