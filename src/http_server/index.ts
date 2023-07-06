import * as fs from 'fs';
import * as path from 'path';
import http, { Server, IncomingMessage, ServerResponse } from 'http';
import { WebSocketServerClass } from './../websocket_server/index';

export class HTTPServer {
    private server: Server;
    private wsServer: WebSocketServerClass;

    constructor(port: number) {
        this.server = http.createServer(this.requestHandler);
        this.wsServer = new WebSocketServerClass(this.server);

        this.server.listen(port, () => {
            const addressInfo = this.server.address();
            console.log(`HTTP server has started on the ${port} port!`) 
            if (typeof addressInfo === 'string') {
                console.log(`WebSocket server has been started on: ${addressInfo}`);
              } else if (addressInfo) {
                console.log(`WebSocket server has been started on: ${addressInfo.address === "::" ? 'localhost' : addressInfo.address}:${addressInfo.port}`);
              }
        });

        process.on('SIGINT', () => {
            this.shutdown();
        });
    }

    private requestHandler(req: IncomingMessage, res: ServerResponse) {
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

    private shutdown() {
        console.log("Shutting down server...");

        this.wsServer.shutdown();

        this.server.close(() => {
            console.log("HTTP server closed");
        });
    }
}
