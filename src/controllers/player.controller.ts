import { WebSocket } from 'ws';
import { PlayersDB } from '../models/playersDb';
import { v4 as uuidv4 } from 'uuid';

export class PlayerController {
    private playersDb: PlayersDB = new PlayersDB();

    registerPlayer(ws: WebSocket, req: any) {
        const data = typeof req.data === 'string' ? JSON.parse(req.data) : req.data;
        const { name, password } = data;
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
          console.log(`User ${JSON.stringify(this.playersDb[name])} has been registered`);
        }
        console.log(this.playersDb);
    }
    
    // Additional player-related request handlers...
}