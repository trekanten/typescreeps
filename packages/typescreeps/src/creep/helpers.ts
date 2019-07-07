export function getCreepByName(targetName: string): Creep | null {
  for (const name in Game.creeps) {
    if (targetName === name) {
      return Game.creeps[name];
    }
  }
  return null;
}
