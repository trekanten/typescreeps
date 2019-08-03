import { TaskBase } from './taskBase';
import { UpgradeTask } from '@typescreeps/common/dist';
import { withdraw, upgradeController } from '@/helpers/creepActions';
import { getClosestContainer, getContainerById } from '@/helpers/structureGetters';

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
        const container = getClosestContainer(this.creep, this.task.containerId);
        if (!container) {
          throw (`${this.task.name} does not find any container`);
        }
        this.creep.memory.containerId = container.id;
      }
      const container = getContainerById(this.creep.memory.containerId);
      if (!container) {
        throw Error(`${this.creep.name} not able to find container ${this.creep.memory.containerId}`);
      }
      withdraw(this.creep, container);
    }
  }

  getSpawnRoom(): Room {
    const room = Game.rooms[this.task.room];
    if (!room) {
      throw Error(`Task ${this.task.name}: Room ${this.task.room} not found`);
    }
    return room;
  }

  getController() {
    const controller = this.getSpawnRoom().controller;
    if (!controller) {
      throw Error(`Task ${this.task.name}: Controller not found in room ${this.task.room}`);
    }
    return controller;
  }
}
