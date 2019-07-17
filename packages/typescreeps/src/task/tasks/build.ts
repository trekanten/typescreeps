import { TaskBase } from './taskBase';
import { BuildTask } from '@typescreeps/common/dist';
import { withdraw, build } from '@/creep';
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
      if (!target) {
        this.creep.memory.targetId = null;
      } else {
        build(this.creep, target);
      }
    } else {
      if (!this.creep.memory.containerId) {
        const container = getClosestContainer(this.creep, this.task.containerId);
        if (!container) {
          throw (`${this.task.name} does not find any container`);
        }
        this.creep.memory.containerId = container.id;
      }
      const container = Game.getObjectById(this.creep.memory.containerId) as Structure;
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

  getTarget(): ConstructionSite {
    let target;
    if (this.creep.room.name !== this.task.room) {
      const targets = Game.rooms[this.task.room].find(FIND_CONSTRUCTION_SITES);
      target = targets[0];
    } else {
      target = this.creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
    }
    if (!target) {
      throw Error(`Task ${this.task.name}: No construction site found in ${this.task.room}`);
    }
    return target;
  }
}
