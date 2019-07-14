import { TaskBase } from './taskBase';
import { BuildTask } from '@typescreeps/common/dist';
import { getSpawnFromRoom, withdraw, build } from '@/creep';
import { getClosestContainer } from '@/creep/getters';

export class Build extends TaskBase<BuildTask>{

  runTask() {
    if (this.creep.carry.energy === this.creep.carryCapacity) {
      this.creep.memory.build = true;
      this.creep.memory.containerId = null;
    } else if (this.creep.carry.energy === 0) {
      this.creep.memory.build = false;
      this.creep.memory.targetId = null;
    }

    if (this.creep.memory.build) {
      if (!this.creep.memory.targetId) {
        this.creep.memory.targetId = this.getTarget().id;
      }
      const target = Game.getObjectById(this.creep.memory.targetId) as ConstructionSite;
      build(this.creep, target);
    } else {
      if (!this.creep.memory.containerId) {
        this.creep.memory.containerId = getClosestContainer(this.creep).id;
      }
      const container = Game.getObjectById(this.creep.memory.containerId) as Structure;
      withdraw(this.creep, container);
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
}
