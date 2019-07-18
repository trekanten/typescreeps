import { BodyPart, getTotalBodyPartCost } from '@typescreeps/common/dist';
import { spawnCreep } from '@/helpers/spawnMethods';
import { attack } from '@/helpers/creepActions';

// tslint:disable:max-line-length

function getAutoDefenderName(room: Room) {
  return `AutoDefender-${room.name}`;
}

function hasAutoDefender(room: Room) {
  return !!Game.creeps[getAutoDefenderName(room)];
}

function makeDefenderBody(parts: number): BodyPart[] {
  const body = [];
  for (let i = 0; i < parts; i += 1) {
    body.push(BodyPart.TOUGH);
  }
  for (let i = 0; i < parts - 1; i += 1) {
    body.push(BodyPart.MOVE);
  }
  for (let i = 0; i < parts; i += 1) {
    body.push(BodyPart.ATTACK);
  }
  body.push(BodyPart.MOVE);
  return body;
}

function getMaxedDefendBody(room: Room): BodyPart[] {
  const energyAvailable = room.energyAvailable;
  let maxedBody = makeDefenderBody(1);
  if (getTotalBodyPartCost(maxedBody) > energyAvailable) {
    throw Error(`${room.name}: Not able to make ${getAutoDefenderName(room)}, not enough enegery`);
  }

  let parts = 2;
  while (true) {
    const body = makeDefenderBody(parts);
    if (getTotalBodyPartCost(body) < energyAvailable) {
      maxedBody = body;
      parts += 1;
    } else {
      break;
    }
  }
  return maxedBody;
}

function getHealingPower(creep: Creep) {
  return creep.body.filter(bp => bp.type === HEAL).length;
}

export function autoDefenderRunner() {
  for (const key in Game.rooms) {
    try {
      const room = Game.rooms[key];

      const hostileCreeps = room.find(FIND_HOSTILE_CREEPS);

      if (hasAutoDefender(room)) {
        runAutoDefender(room, hostileCreeps);
        continue;
      }

      if (hostileCreeps.length === 0) {
        continue;
      }

      if (Game.time % 8 !== 0) {
        continue;
      }

      spawnCreep(getMaxedDefendBody(room), getAutoDefenderName(room), room);

    } catch (error) {
      console.log(error);
    }
  }
}

function runAutoDefender(room: Room, hostileCreeps: Creep[]) {
  const creep = Game.creeps[getAutoDefenderName(room)];
  if (!creep) {
    throw Error(`No auto defender with name ${getAutoDefenderName(room)} found`);
  }

  if (hostileCreeps.length === 0) {
    creep.say('VICORY!');
    return;
  }

  let mainTarget = hostileCreeps[0];
  for (const hostile of hostileCreeps) {
    if (getHealingPower(hostile) > getHealingPower(mainTarget)) {
      mainTarget = hostile;
    }
  }

  attack(creep, mainTarget);
}
