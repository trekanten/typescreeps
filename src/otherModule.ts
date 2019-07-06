import lodashSum from 'lodash.sum';

export function throwEvery10Ticks(tick: number) {
  if (lodashSum([tick]) % 10 === 0) {
    throw Error(`${tick} is devidable by 10!`);
  }
}
