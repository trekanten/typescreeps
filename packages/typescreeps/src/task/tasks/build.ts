import { TaskBase } from './taskBase';
import { BuildTask } from '@typescreeps/common/dist';
import { getSpawnFromRoom, withdraw, build } from '@/creep';

export class Build extends TaskBase<BuildTask>{

  runTask() {
    if (this.creep.carry.energy <= 1) {
      withdraw(this.creep, this.getContainer());
    } else {
      build(this.creep, this.getTarget());
    }
  }

  getSpawn() {
    return getSpawnFromRoom(this.getRoom());
  }

  getRoom(): Room {
    const room = Game.rooms[this.task.room];
    if (!room) {
      throw Error(`Task ${this.task.name}: Room ${this.task.room} not found`);
    }
    return room;
  }

  getTarget(): ConstructionSite {
    const target = this.creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
    if (!target) {
      throw Error(`Task ${this.task.name}: No construction site found in ${this.task.room}`);
    }
    return target;
  }

  getContainer() {
    if (this.task.containerId) {
      const source = Game.getObjectById(this.task.containerId) as Structure;
      if (!source) {
        throw Error(`Task ${this.task.name}: Invalid containerId ${this.task.containerId}`);
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
