import { TaskBase } from './taskBase';
import { RoomDefendTask } from '@typescreeps/common/dist';
import { goToRoom, attack } from '@/helpers/creepActions';
import { getHealingPower } from '@/helpers/creepInfo';

export class RoomDefend extends TaskBase<RoomDefendTask> {

  runTask() {

    if (this.creep.room.name !== this.task.room) {
      this.creep.memory.defend = false;
    } else {
      this.creep.memory.defend = true;
    }

    if (this.creep.memory.defend) {
      const hostileCreeps = this.getSpawnRoom().find(FIND_HOSTILE_CREEPS);

      if (hostileCreeps.length === 0) {
        return;
      }

      let mainTarget = hostileCreeps[0];
      for (const hostile of hostileCreeps) {
        if (getHealingPower(hostile) > getHealingPower(mainTarget)) {
          mainTarget = hostile;
        }
      }

      attack(this.creep, mainTarget);

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
