export interface LinkTarget {
  id: string;
  amount: number;
}

export interface LinkJob {
  id: string;
  roomName: string;
  targets: LinkTarget[];
}
