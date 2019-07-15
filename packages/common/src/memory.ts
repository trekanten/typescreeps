export interface GameRoom {
  [key: string]: {
    name: string;
    energyAvailable: number;
    energyCapacityAvailable: number;
  };
}

export interface GameRooms extends Array<GameRoom> { }
