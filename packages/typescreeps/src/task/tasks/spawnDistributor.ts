import { TaskBase } from './taskBase';
import { SpawnDistributorTask } from '@typescreeps/common/dist';
import { getSpawnFromRoom, withdraw, deposit } from '@/creep';
import {
  getClosestNotFullExtention, getClosestNotFullSpawn, getClosestContainer,
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

  getContainer() {
    const container = getClosestContainer(this.creep);
    if (!container) {
      throw (`${this.task.name} does not find any container`);
    }
    return container;
  }

  getTarget() {
    const closestExtention = getClosestNotFullExtention(this.creep);
    if (closestExtention) {
      return closestExtention;
    }

    const closestSpawn = getClosestNotFullSpawn(this.creep);
    if (closestSpawn) {
      return closestSpawn;
    }

    return null;
  }
}
