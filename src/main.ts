import { throwEvery10Ticks } from '@/otherModule';
import { functionInFileInFolder } from '@/folder/fileInFolder';

export const loop = () => {
  console.log(`Current game tick is ${Game.time}`);

  functionInFileInFolder();
  throwEvery10Ticks(Game.time);
};
