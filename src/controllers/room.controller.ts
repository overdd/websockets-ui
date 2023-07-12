import { Room } from '../models/room';
import { v4 as uuidv4 } from 'uuid';
import { WebSocket, WebSocketServer } from 'ws';
import roomsDb from '../db/roomsDb';
import playersDb from '../db/playersDb';
import { Player } from '../models/player';


export class RoomController {

  constructor() {
  }

  createRoom(ws: WebSocket, req: any, playerIndex: number, playerName: string) {
    const user = playersDb.getPlayerByIndex(playerIndex);
    const roomId = roomsDb.createRoom(user);
    const roomsList: Room[] = [];
    for (const [roomId, roomUsers] of roomsDb.rooms) {
      const room = new Room(roomId);
      roomUsers.forEach(user => room.addPlayer(user));
      roomsList.push(room);
    }


    ws.send(
        JSON.stringify({
          type: 'update_room',
          data: JSON.stringify( roomsList),
          id: 0,
        }),
      );

    console.log(`New room ${roomId} was created!`);
    console.log(roomsDb)
  }
 
}
