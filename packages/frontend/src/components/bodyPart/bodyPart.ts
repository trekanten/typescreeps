import { BodyPart } from '@typescreeps/common';

export const getBodyPartColor = (bodyPart: BodyPart) => {
  switch (bodyPart) {
    case BodyPart.MOVE: return '#a9b7c6';
    case BodyPart.WORK: return '#ffe56d';
    case BodyPart.CARRY: return '#777';
    case BodyPart.ATTACK: return '#f93842';
    case BodyPart.RANGED_ATTACK: return '#5d80b2';
    case BodyPart.HEAL: return '#65fd62';
    case BodyPart.TOUGH: return '#fff';
    case BodyPart.CLAIM: return '#b99cfb';
  }
};

export const getBodyPartCost = (bodyPart: BodyPart) => {
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
};

export const getTotalBodyPartCost = (bodyParts: BodyPart[]) => {
  const costArray = bodyParts.map(bp => getBodyPartCost(bp));
  const cost = costArray.reduce((a, b) => a + b, 0);
  return cost;
};
