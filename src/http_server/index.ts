import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { IncomingMessage } from 'http';
import { Server as WebSocketServer, WebSocket } from 'ws';
import http, { Server } from 'http';
import { PlayersDB } from './models/playersDb';


const HTTP_PORT = 8181;


export class HTTPServer {
  private server: Server;
  private wsServer: WebSocketServer;
  private playersDb: PlayersDB;

  constructor(port: number) {
    this.server = http.createServer(this.requestHandler);
    this.wsServer = new WebSocketServer({ server: this.server });

    this.server.listen(port, () => {
      console.log(`Start static http server on the ${HTTP_PORT} port!`)  
      console.log(`WebSocket server started on the ${HTTP_PORT} port!`);
    });

    this.server.on('upgrade', (request, socket, head) => {
        this.wsServer.handleUpgrade(request, socket, head, (ws) => {
            this.wsServer.emit('connection', ws, request);
       });
    });

    this.wsServer.on('connection', this.connectionHandler);

  }

  private requestHandler(req: http.IncomingMessage, res: http.ServerResponse) {
    const __dirname = path.resolve(path.dirname(''));
    const file_path = __dirname + (req.url === '/' ? '/front/index.html' : '/front' + req.url);
    fs.readFile(file_path, function (err, data) {
        if (err) {
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
        }
        res.writeHead(200);
        res.end(data);
    });
  }

  private connectionHandler(ws: WebSocket, req: IncomingMessage) {
    ws.on('message', (message: string) => {
        const req = JSON.parse(message);
        switch (req.type) {
          case 'reg':
            const { name, password } = req.data;
            if (this.playersDb[name]) {
              ws.send(
                JSON.stringify({
                  type: 'reg',
                  data: { name, index: null, error: true, errorText: 'User already exists' },
                  id: req.id,
                }),
              );
            } else {
              this.playersDb[name] = { name, password };
              const index: string = uuidv4();
              ws.send(
                JSON.stringify({
                  type: 'reg',
                  data: { name, index, error: false, errorText: '' },
                  id: req.id,
                }),
              );
            }
            break;
          default:
            ws.send(JSON.stringify({ error: true, errorText: 'Unknown request type' }));
            break;
        }
      });
  }
}