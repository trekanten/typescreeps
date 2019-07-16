import { getTowers, getLowestRepairTarget } from '@/creep/getters';

export function towerRunner() {
  for (const key in Game.rooms) {
    const room = Game.rooms[key];

    const towers = getTowers(room);

    const hostiles = room.find(FIND_HOSTILE_CREEPS);
    if (hostiles.length > 0) {
      towers.forEach(tower => tower.attack(hostiles[0]));
      return;
    }

    const repairTarget = getLowestRepairTarget(room);

    if (repairTarget) {
      towers.forEach(tower => tower.repair(repairTarget));
    }
  }
}
