import { getLinkSegment } from '@/utils/segmentGetter';

export function linkRuner() {

  const linkJobs = getLinkSegment();

  if (!linkJobs) {
    return;
  }

  console.log('Running links');
  console.log(linkJobs.length);
}
