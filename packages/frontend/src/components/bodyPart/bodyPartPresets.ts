// tslint:disable:max-line-length

import { BodyPart, TaskType } from '@typescreeps/common';

interface BodyPartPreset {
  name: TaskType | string;
  bodyParts: BodyPart[];
}

const bodyPartPresets: BodyPartPreset[] = [
  {
    name: TaskType.BUILD,
    bodyParts: [BodyPart.CARRY, BodyPart.CARRY, BodyPart.CARRY, BodyPart.MOVE, BodyPart.MOVE],
  },
  {
    name: TaskType.CARRY,
    bodyParts: [BodyPart.CARRY, BodyPart.CARRY, BodyPart.CARRY, BodyPart.MOVE, BodyPart.MOVE],
  },
  {
    name: TaskType.MINE,
    bodyParts: [BodyPart.CARRY, BodyPart.MOVE, BodyPart.WORK, BodyPart.WORK],
  },
  {
    name: TaskType.UPGRADE,
    bodyParts: [BodyPart.CARRY, BodyPart.MOVE, BodyPart.WORK, BodyPart.WORK],
  },
];

export { bodyPartPresets };
