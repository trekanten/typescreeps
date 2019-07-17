import { Task, LinkJob, TASK_SEGMENT, LINK_SEGMENT } from '@typescreeps/common/dist';

// tslint:disable:max-line-length

const SEGMENTS = [TASK_SEGMENT, LINK_SEGMENT];

function getSegment<T>(segmentNumber: number, initValue: any): T | null {
  try {
    const rawSegment = RawMemory.segments[segmentNumber];
    if (rawSegment === undefined) {
      RawMemory.setActiveSegments(SEGMENTS);
      throw Error(`Segment ${segmentNumber} is undefined. Setting segments ${SEGMENTS} to active.`);
    }
    if (rawSegment === '') {
      const stringifyedInitValue = JSON.stringify(initValue);
      RawMemory.segments[segmentNumber] = stringifyedInitValue;
      // tslint:disable-next-line:max-line-length
      throw Error(`Segment ${segmentNumber} is empty string. Initializing segment to ${stringifyedInitValue}.`);
    }
    return JSON.parse(rawSegment);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export function getTaskSegment() {
  return getSegment<Task[]>(TASK_SEGMENT, []);
}

export function getLinkSegment() {
  return getSegment<LinkJob[]>(LINK_SEGMENT, []);
}
