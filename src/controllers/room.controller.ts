import { Room } from "../models/room";
import { WebSocket, WebSocketServer } from "ws";
import roomsDb from "../db/roomsDb";
import playersDb from "../db/playersDb";
import { Player } from "../models/player";

export class RoomController {
  createRoom(ws: WebSocket, req: any, playerIndex: number, playerName: string) {
    const user = playersDb.getPlayerByIndex(playerIndex);
    const roomId = roomsDb.createRoom(user);

    const roomsList: Room[] = [];
    for (const [roomId, roomUsers] of roomsDb.rooms) {
      const room = new Room(roomId);
      roomUsers.forEach((user) => room.addPlayer(user));
      roomsList.push(room);
    }
    ws.send(
      JSON.stringify({
        type: "update_room",
        data: JSON.stringify(roomsList),
        id: 0,
      })
    );

    console.log(`New room ${roomId} was created!`);
    console.log(roomsDb);
    return JSON.stringify({
      type: "update_room",
      data: JSON.stringify(roomsList),
      id: 0,
    });
  }

  addUserToRoom(data: any, ws: WebSocket, player: Player) {
    const indexRoom = JSON.parse(data);
    roomsDb.addPlayerToRoom(indexRoom, player);

    const roomsList: Room[] = [];
    for (const [roomId, roomUsers] of roomsDb.rooms) {
      const room = new Room(roomId);
      roomUsers.forEach((user) => room.addPlayer(user));
      roomsList.push(room);
    }

    ws.send(
      JSON.stringify({
        type: "update_room",
        data: JSON.stringify(roomsList),
        id: 0,
      })
    );

    ws.send(
      JSON.stringify({
        type: "create_game",
        data: JSON.stringify(roomsList),
        id: 0,
      })
    );

    return JSON.stringify({
      type: "create_game",
      data: JSON.stringify(roomsList),
      id: 0,
    });
  }
}
