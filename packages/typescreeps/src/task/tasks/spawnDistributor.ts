import { TaskBase } from './taskBase';
import { SpawnDistributorTask } from '@typescreeps/common/dist';
import { withdraw, deposit } from '@/creep';
import {
  getClosestNotFullExtention, getClosestNotFullSpawn, getClosestContainer, getClosestNotFullTower,
} from '@/creep/getters';

export class SpawnDistribution extends TaskBase<SpawnDistributorTask>{

  runTask() {
    if (this.creep.carry.energy === 0) {
      withdraw(this.creep, this.getContainer());
    } else {
      const target = this.getTarget();
      if (target) {
        deposit(this.creep, target);
      }
    }
  }

  getSpawnRoom(): Room {
    const room = Game.rooms[this.task.room];
    if (!room) {
      throw Error(`Task ${this.task.name}: Room ${this.task.room} not found`);
    }
    return room;
  }

  getContainer() {
    const container = getClosestContainer(this.creep, this.task.containerId);
    if (!container) {
      throw (`${this.task.name} does not find any container`);
    }
    return container;
  }

  getTarget() {
    const closestSpawn = getClosestNotFullSpawn(this.creep);
    if (closestSpawn) {
      return closestSpawn;
    }

    const closestExtention = getClosestNotFullExtention(this.creep);
    if (closestExtention) {
      return closestExtention;
    }

    const closestTower = getClosestNotFullTower(this.creep);
    if (closestTower) {
      return closestTower;
    }

    return null;
  }
}
