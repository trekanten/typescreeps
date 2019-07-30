export function getHealingPower(creep: Creep) {
  return creep.body.filter(bp => bp.type === HEAL).length;
}
