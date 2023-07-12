import { Room } from '../models/room';
import { Player } from '../models/player';

class RoomsDB {
    public rooms: Map<number, Player[]>;

    constructor() {
        this.rooms = new Map();
    }

    createRoom(player: Player): number {
        const roomId = Math.floor(Math.random()*1000000);
        const roomUsers = [player];
        this.rooms.set(roomId, roomUsers);
        return roomId;
    }

    getRoom(roomId: number): Player[] | undefined {
        return this.rooms.get(roomId);
    }

    deleteRoom(roomId: number): void {
        this.rooms.delete(roomId);
    }

    getAllRooms(): Map<number, Player[]> {
        return this.rooms;
    }
}

const roomsDB = new RoomsDB();

export default roomsDB;
