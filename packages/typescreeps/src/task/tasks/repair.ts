import { TaskBase } from './taskBase';
import { RepairTask } from '@typescreeps/common/dist';
import { withdraw, repair } from '@/helpers/creepActions';
import { getClosestContainer, getLowestRepairTarget } from '@/helpers/structureGetters';

export class Repair extends TaskBase<RepairTask> {

  runTask() {
    if (this.creep.carry.energy === this.creep.carryCapacity) {
      this.creep.memory.repair = true;
      this.creep.memory.containerId = null;
    } else if (this.creep.carry.energy === 0) {
      this.creep.memory.repair = false;
      this.creep.memory.targetId = null;
    }

    if (this.creep.memory.repair === true) {
      if (!this.creep.memory.targetId) {
        const target = getLowestRepairTarget(this.creep.room);
        if (!target) {
          throw Error(`${this.task.name}: Not able find any repair targets`);
        }
        this.creep.memory.targetId = target.id;
      }
      const target = Game.getObjectById(this.creep.memory.targetId) as Structure;
      if (!target || target.hits === target.hitsMax) {
        this.creep.memory.targetId = null;
      } else {
        repair(this.creep, target);
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
      throw Error(`${this.task.name}: Room ${this.task.room} not found`);
    }
    return room;
  }
}
