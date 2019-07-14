import { MineBuildTask } from '@typescreeps/common/dist';
import { mine, getSpawnFromRoomObject, build } from '../../creep';
import { TaskBase } from './taskBase';

export class MineBuild extends TaskBase<MineBuildTask> {

  runTask() {
    if (this.creep.carry.energy < this.creep.carryCapacity) {
      mine(this.creep, this.getSource());
    } else {
      build(this.creep, this.getTarget());
    }
  }

  getSource() {
    const source = Game.getObjectById(this.task.sourceId) as Source;
    if (!source) {
      throw Error(`Task ${this.task.name}: Invalid sourceId ${this.task.sourceId}`);
    }
    return source;
  }

  getTarget(): ConstructionSite {
    const target = this.creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
    if (!target) {
      throw Error(`Task ${this.task.name}: No construction site found`);
    }
    return target;
  }

  getSpawn() {
    return getSpawnFromRoomObject(this.getSource());
  }
}
