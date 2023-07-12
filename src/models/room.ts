import { Player } from "./player";

export class Room {
    public roomId: number;
    public roomUsers: Player[];
  
    constructor(roomId: number) {
      this.roomId = roomId;
      this.roomUsers = [];
    }
  
    addPlayer(player: Player) {
      this.roomUsers.push(player);
    }
  
    removePlayer(player: Player) {
      const index = this.roomUsers.indexOf(player);
      if (index !== -1) {
        this.roomUsers.splice(index, 1);
      }
    }
  }
  