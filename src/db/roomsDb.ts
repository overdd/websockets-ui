import { Room } from "../models/room";
import { Player } from "../models/player";
import playersDb from "../db/playersDb";

class RoomsDB {
  public rooms: Map<number, Player[]>;

  constructor() {
    this.rooms = new Map();
  }

  createRoom(player: Player): number {
    const roomId = Math.floor(Math.random() * 1000000);
    const roomUsers = [player];
    this.rooms.set(roomId, roomUsers);
    return roomId;
  }

  addPlayerToRoom(indexRoom: number, player: Player) {
    const room = this.rooms.get(indexRoom);
    if (room) {
      const userName = player.name;
      const isAdded = room.find((player) => player.index === player.getIndex());
      if (isAdded || room.length >= 2) return false;
      player.isTurn = false;
      room.push(player);
      return true;
    }
    return false;
  }

}

const roomsDB = new RoomsDB();

export default roomsDB;
