export function throwEvery10Ticks(tick: number) {
  if (tick % 10 === 0) {
    throw Error(`${tick} is devidable by 10!`);
  }
}
