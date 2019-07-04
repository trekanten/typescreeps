import { throwEvery10Ticks } from './otherModule';

export const loop = () => {
  console.log(`Current game tick is ${Game.time}`);

  throwEvery10Ticks(Game.time);
};
