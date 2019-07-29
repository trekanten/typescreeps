import { TaskBase } from './taskBase';
import { RoomDefendTask } from '@typescreeps/common/dist';
import { goToRoom } from '@/helpers/creepActions';

export class RoomDefend extends TaskBase<RoomDefendTask> {

  runTask() {

    if (this.creep.room.name !== this.task.room) {
      this.creep.memory.defend = false;
    } else {
      this.creep.memory.defend = true;
    }

    if (this.creep.memory.defend) {
      // TODO DEFEND SCRIPT
      this.creep.say('Defend not implemented');
    } else {
      goToRoom(this.creep, this.getSpawnRoom());
    }
  }

  getSpawnRoom(): Room {
    const room = Game.rooms[this.task.room];
    if (!room) {
      throw Error(`${this.task.name}: Room ${this.task.room} not found`);
    }
    return room;
  }
}
