import { Room } from '../models/room';

export class RoomsDB {
    private rooms: Map<string, Room>;

    constructor() {
        this.rooms = new Map();
    }

    createRoom(room: Room, playerIndex: number, playerName: string): number {
        room.addPlayer(playerIndex, playerName)
        this.rooms[room.id] = room;
        return room.id;
    }

    getRoom(roomId: number): Room | undefined {
        return this.rooms[roomId];
    }


    deleteRoom(roomId: string): void {
        delete this.rooms[roomId];
    }

    getAllRooms(): Map<string, Room> {
        return this.rooms;
    }
}
