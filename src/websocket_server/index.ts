import { Server } from 'http';
import { Server as WebSocketServer, WebSocket } from 'ws';
import { IncomingMessage } from 'http';
import { PlayerController } from '../controllers/player.controller';
import { RoomController } from '../controllers/room.controller';
import { Player } from '../models/player';
import dotenv from 'dotenv';



dotenv.config();

export class WebSocketServerClass {
    private wsServer: WebSocketServer;
    private playerController: PlayerController = new PlayerController();
    private roomController: RoomController = new RoomController();
    private clients = [];

    constructor(server: Server) {
        this.wsServer = new WebSocketServer({ port: +process.env.WS_PORT });
        this.connectionHandler = this.connectionHandler.bind(this);
        this.wsServer.on('connection', this.connectionHandler);
    }

    private connectionHandler(ws: WebSocket, req: IncomingMessage) {
        let currentPlayer: Player;

            ws.on('message', (message: string) => {
                const req = JSON.parse(message);
                console.log(req);
                switch (req.type) {
                  case 'reg':
                    currentPlayer = this.playerController.registerPlayer(ws, req);
                    break;
                  case 'update_winners':
                    this.playerController.updateWins(ws, req);
                    break;
                  case 'create_room':
                    const createRoomData = this.roomController.createRoom(ws, req, currentPlayer.index, currentPlayer.name);
                    this.wsServer.clients.forEach((socket: WebSocket) => socket.send(createRoomData));
                    break;
                  case 'add_user_to_room':
                    const addUserData = this.roomController.addUserToRoom(req.data, ws, currentPlayer);
                    this.wsServer.clients.forEach((socket: WebSocket) => socket.send(addUserData));
                    break;
                  default:
                    ws.send(JSON.stringify({ error: true, errorText: 'Unknown request type' }));
                    break;
                }
            });
    }

    public shutdown() {
        this.wsServer.clients.forEach((client: WebSocket) => {
            if (client.readyState === WebSocket.OPEN) {
                client.close();
            }
        });

        this.wsServer.close(() => {
            console.log("WebSocket server closed");
        });
    }
}
