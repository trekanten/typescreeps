// Credit to http://jsfiddle.net/9yH7M/1/

import { inflate } from 'pako';

export function unzip(b64Data: string) {

  const strData = new Buffer(b64Data, 'base64').toString('binary');

  const charData = strData.split('').map((x) => { return x.charCodeAt(0); });

  const binData = inflate(new Uint8Array(charData));

  const result = String.fromCharCode.apply(null, new Uint16Array(binData) as any);

  return result;
}
