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
