
export function memoryRunner() {
  if (Game.time % 10 === 0) { } {
    Memory.gameRooms =  convertToRooms(Game.rooms);
  }
}

function convertToRooms(gameRooms: { [roomName: string]: Room }) {
  const convertedRooms = [];
  for (const key in gameRooms) {
    const gameRoom = gameRooms[key];
    convertedRooms.push(gameRoom);
  }
  return convertedRooms;
}
