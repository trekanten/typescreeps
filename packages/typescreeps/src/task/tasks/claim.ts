import { TaskBase } from './taskBase';
import { ClaimTask } from '@typescreeps/common/dist';
import { getSpawnFromRoom } from '@/creep';

export class Claim extends TaskBase<ClaimTask>{

  runTask() {
    if (this.creep.room.name !== this.task.targetRoom) {
      const exitDir = this.creep.room.findExitTo(this.task.targetRoom) as ExitConstant;
      const exit = this.creep.pos.findClosestByRange(exitDir) as RoomPosition;
      this.creep.moveTo(exit);
    } else {
      const controller = this.creep.room.controller as StructureController;
      if (this.creep.claimController(controller) === ERR_NOT_IN_RANGE) {
        this.creep.moveTo(controller);
      }
    }
  }

  getSpawn() {
    return getSpawnFromRoom(this.getSpawnRoom());
  }

  getSpawnRoom(): Room {
    const room = Game.rooms[this.task.spawnRoom];
    if (!room) {
      throw Error(`${this.task.name}: Room ${this.task.spawnRoom} not found`);
    }
    return room;
  }
}
