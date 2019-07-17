import { getTowers, getLowestRepairTarget } from '@/creep/getters';

function getHealingPower(creep: Creep) {
  return creep.body.filter(bp => bp.type === HEAL).length;
}

export function towerRunner() {
  for (const key in Game.rooms) {
    const room = Game.rooms[key];

    const towers = getTowers(room);

    const hostiles = room.find(FIND_HOSTILE_CREEPS);
    if (hostiles.length > 0) {
      let mainTarget = hostiles[0];
      for (const hostile of hostiles) {
        if (getHealingPower(hostile) > getHealingPower(mainTarget)) {
          mainTarget = hostile;
        }
      }
      towers.forEach(tower => tower.attack(mainTarget));
      return;
    }

    const repairTarget = getLowestRepairTarget(room);

    if (repairTarget) {
      towers.forEach(tower => tower.repair(repairTarget));
    }
  }
}
