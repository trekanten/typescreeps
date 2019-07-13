import { TaskBase } from './taskBase';
import { UpgradeTask } from '@typescreeps/common/dist';
import { getSpawnFromRoomObject } from '@/creep';

export class Upgrade extends TaskBase<UpgradeTask> {

  runTask() {

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

  getSource() {
    if (this.task.sourceId) {
      const source = Game.getObjectById(this.task.sourceId) as Structure;
      if (!source) {
        throw Error(`Task ${this.task.name}: Invalid sourceId ${this.task.sourceId}`);
      }
      return source;
    }

    const source = this.creep.pos.findClosestByRange(FIND_MY_STRUCTURES);
    if (!source) {
      throw Error(`Task ${this.task.name}: Found no source`);
    }
    return source;
  }
}
