import { TaskBase } from './taskBase';
import { ReserveTask } from '@typescreeps/common/dist';

export class Reserve extends TaskBase<ReserveTask>{

  runTask() {
    if (this.creep.room.name !== this.task.targetRoom) {
      const exitDir = this.creep.room.findExitTo(this.task.targetRoom) as ExitConstant;
      const exit = this.creep.pos.findClosestByRange(exitDir) as RoomPosition;
      this.creep.moveTo(exit);
    } else {
      const controller = this.creep.room.controller as StructureController;
      if (this.creep.reserveController(controller) === ERR_NOT_IN_RANGE) {
        this.creep.moveTo(controller);
      }
    }
  }

  getSpawnRoom(): Room {
    const room = Game.rooms[this.task.spawnRoom];
    if (!room) {
      throw Error(`${this.task.name}: Room ${this.task.spawnRoom} not found`);
    }
    return room;
  }
}
