import { BodyPart } from './';

export function getBodyPartCost(bodyPart: BodyPart) {
  switch (bodyPart) {
    case BodyPart.MOVE: return 50;
    case BodyPart.WORK: return 100;
    case BodyPart.CARRY: return 50;
    case BodyPart.ATTACK: return 80;
    case BodyPart.RANGED_ATTACK: return 150;
    case BodyPart.HEAL: return 250;
    case BodyPart.TOUGH: return 10;
    case BodyPart.CLAIM: return 600;
  }
}

export function getTotalBodyPartCost(bodyParts: BodyPart[]) {
  const costArray = bodyParts.map(bp => getBodyPartCost(bp));
  const cost = costArray.reduce((a, b) => a + b, 0);
  return cost;
}
