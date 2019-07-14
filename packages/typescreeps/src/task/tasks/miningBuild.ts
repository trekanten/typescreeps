import { MineBuildTask } from '@typescreeps/common/dist';
import { mine, getSpawnFromRoomObject, build } from '../../creep';
import { TaskBase } from './taskBase';

export class MineBuild extends TaskBase<MineBuildTask> {

  runTask() {
    if (this.creep.carry.energy === this.creep.carryCapacity) {
      this.creep.memory.build = true;
    } else if (this.creep.carry.energy === 0) {
      this.creep.memory.build = false;
    }

    if (this.creep.memory.build) {
      build(this.creep, this.getTarget());
    } else {
      mine(this.creep, this.getSource());
    }
  }

  getTarget(): ConstructionSite {
    const target = this.creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
    if (!target) {
      throw Error(`Task ${this.task.name}: No construction site found`);
    }
    return target;
  }

  getSource() {
    const source = Game.getObjectById(this.task.sourceId) as Source;
    if (!source) {
      throw Error(`Task ${this.task.name}: Invalid sourceId ${this.task.sourceId}`);
    }
    return source;
  }

  getSpawn() {
    return getSpawnFromRoomObject(this.getSource());
  }
}
