// tslint:disable:max-line-length

import * as t from 'io-ts';
import { validate, validateMore } from './utils';

export enum TaskType {
  MINE = 'mine',
  BUILD = 'build',
  TRANSPORT = 'transport',
}

const TaskCodec = t.type({
  id: t.string,
  type: t.string,
});
export type Task = t.TypeOf<typeof TaskCodec>;
export const validateTask = (u: unknown) => validate(TaskCodec, u);

const MiningTaskParamsCodec = t.type({
  creepName: t.string,
  sourceId: t.string,
});
export type MiningTaskParams = t.TypeOf<typeof MiningTaskParamsCodec>;
export const validateMiningTaskParams = (u: unknown) => validate(MiningTaskParamsCodec, u);

export type MiningTask = Task & MiningTaskParams;
export const validateMiningTask = (u: unknown) => validateMore([TaskCodec, MiningTaskParamsCodec], u);