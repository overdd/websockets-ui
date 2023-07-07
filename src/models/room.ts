import { Player } from "./player";

export class Room {
    public id: number;
    public players: Map<number, string>;
  
    constructor(id: number) {
      this.id = id;
      this.players = new Map();
    }
  
    addPlayer(playerIndex: number, playerName: string) {
      this.players.set(playerIndex, playerName);
    }
  
    removePlayer(playerIndex: number) {
      if (playerIndex !== -1) {
        this.players.delete(playerIndex);
      }
    }
  }
  