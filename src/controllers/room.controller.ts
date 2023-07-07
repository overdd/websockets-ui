import { Room } from '../models/room';
import { v4 as uuidv4 } from 'uuid';
import { WebSocket, WebSocketServer } from 'ws';
import { RoomsDB } from '../db/roomsDb';
import { PlayersDB } from '../db/playersDb';


export class RoomController {
    private rooms: RoomsDB;

  constructor() {
    this.rooms = new RoomsDB();
  }

  createRoom(ws: WebSocket, req: any, playerIndex: number, playerName: string): Room {
    const roomId = Math.floor(Math.random()*1000000);
    const room = new Room(roomId);
    this.rooms.createRoom(room, playerIndex, playerName);

    const roomArray: Room[] = [];

    console.log(`========`)
    console.log(this.rooms.getRoom(roomId))
    console.log(`========`)

    roomArray.push(this.rooms.getRoom(roomId));
    console.log(`========`)
    console.log(this.rooms.getRoom(roomId))
    console.log(`========`)

    ws.send(
        JSON.stringify({
          type: 'update_room',
          data: JSON.stringify( roomArray),
          id: 0,
        }),
      );
      console.log(1111111111111)
    console.log(JSON.stringify({
      type: 'update_room',
      data: JSON.stringify( roomArray),
      id: 0,
    }),)
    console.log(1111111111111)

    console.log(`New room ${roomId} was created!`);
    console.log(this.rooms)
    console.log(this.rooms[roomId])
    return room;
  }

  
}
