import { getLinkSegment } from '@/utils/segmentGetter';
import { LinkTarget } from '@typescreeps/common/dist';

function getLinkById(linkId: string): StructureLink {
  const link: StructureLink = Game.getObjectById(linkId) as StructureLink;
  if (!link) {
    throw Error(`Invalid link: ${linkId}`);
  }

  if (link.structureType !== STRUCTURE_LINK) {
    throw Error(`Invalid link not a link: ${linkId}`);
  }
  return link;
}

interface NeedyTarget {
  link: StructureLink | null;
  needines: number;
  info: LinkTarget | null;
}

function getNeediestLinkTarget(targets: LinkTarget[]): NeedyTarget | null {
  let neediest: NeedyTarget = {
    link: null,
    needines: 0,
    info: null,
  };

  for (const target of targets) {
    const link = getLinkById(target.id);
    const needines = 1 / (link.energy + 1 / target.amount + 1);
    if (needines > neediest.needines) {
      neediest = {
        link: link,
        needines: needines,
        info: target,
      };
    }
  }

  return neediest;
}

export function linkRunner() {

  const linkJobs = getLinkSegment();

  if (!linkJobs) {
    return;
  }

  for (const linkJob of linkJobs) {
    const link: StructureLink = getLinkById(linkJob.id);

    if (link.cooldown === 0) {
      return;
    }

    const target = getNeediestLinkTarget(linkJob.targets);
    if (!target || !target.link || !target.info) {
      throw Error(`Link ${linkJob.id} has no targets`);
    }

    const maxEnergy = link.energy;
    const targetAmount = target.info.amount - target.link.energy;
    const amount = Math.min(maxEnergy, targetAmount);

    const status = link.transferEnergy(target.link, amount);
    if (status !== OK) {
      throw Error(`${link.id} not able to transfer: ${status}`);
    }
  }
}
