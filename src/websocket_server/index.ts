import { Server } from 'http';
import { Server as WebSocketServer, WebSocket } from 'ws';
import { IncomingMessage } from 'http';
import { PlayerController } from '../controllers/player.controller';

export class WebSocketServerClass {
    private wsServer: WebSocketServer;
    private playerController: PlayerController = new PlayerController();

    constructor(server: Server) {
        this.wsServer = new WebSocketServer({ server: server });
        this.connectionHandler = this.connectionHandler.bind(this);
        this.wsServer.on('connection', this.connectionHandler);
        console.log(`WebSocket server started!`);
    }

    private connectionHandler(ws: WebSocket, req: IncomingMessage) {
        ws.on('message', (message: string) => {
            const req = JSON.parse(message);
            switch (req.type) {
              case 'reg':
                this.playerController.registerPlayer(ws, req);
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
