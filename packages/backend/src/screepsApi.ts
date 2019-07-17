// @ts-ignore
import { ScreepsAPI } from 'screeps-api';
import { unzip } from './utils/unzipper';

const apiToken = process.env.API_TOKEN;
const shard = process.env.SHARD;

const api = new ScreepsAPI({
  token: apiToken,
  protocol: 'https',
  hostname: 'screeps.com',
  port: 443,
  path: '/',
});

export async function getMemory(path: string) {
  return await api.memory.get(path, shard)
    .then((memory: any) => {
      const zippedData = (memory.data as string).slice(3);
      const data = unzip(zippedData);
      return JSON.parse(data);
    });
}

export async function getSegment(segmentNr: number) {
  return await api.segment.get(segmentNr.toString(), shard)
      .then((response: any) => JSON.parse(response.data));
}

export async function setSegment(segmentNr: number, data: object) {
  return await api.segment.set(segmentNr.toString(), JSON.stringify(data), shard)
    .then((response: any) => JSON.stringify(response.data));
}

export async function getMe() {
  return await api.me()
    .then((user: any) => {
      return user;
    });
}
