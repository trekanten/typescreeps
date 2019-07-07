// @ts-ignore
import { ScreepsAPI } from 'screeps-api';
import { unzip } from './utils/unzipper';
const fs = require('fs');

export function getScreepsApi() {
  const api = new ScreepsAPI({
    token: '929fcf11-d045-4057-9a05-2b2cef51988c',
    protocol: 'https',
    hostname: 'screeps.com',
    port: 443,
    path: '/',
  });
  return api;
}

export async function getMemory(api: any, path: string) {
  return await api.memory.get(path, 'shard3')
    .then((memory: any) => {
      fs.writeFileSync('memory.json', JSON.stringify(memory));
      const zippedData = (memory.data as string).slice(3);
      const data = unzip(zippedData);
      return data;
    });
}

export async function getMe(api: any) {
  return await api.me()
    .then((user: any) => {
      return user;
    });
}
