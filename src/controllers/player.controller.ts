import { WebSocket } from 'ws';
import { PlayersDB } from '../models/playersDb';
import { Player } from '../models/player';


export class PlayerController {
    private playersDb: PlayersDB = new PlayersDB();

    registerPlayer(ws: WebSocket, req: any) {
      try {  
        const data = typeof req.data === 'string' ? JSON.parse(req.data) : req.data;
        const { name, password } = data;
        if (this.playersDb.getPlayer(name)) {
            if (this.playersDb.validatePlayer(name, password)) {
            const index = this.playersDb.getPlayerIndex(name);
              ws.send(
                JSON.stringify({
                  type: 'reg',
                  data: JSON.stringify({ name, index, error: false, errorText: '' }),
                  id: 0,
                }),
              );
            } else {
            const index = this.playersDb.getPlayerIndex(name);
              ws.send(
                JSON.stringify({
                  type: 'reg',
                  data: JSON.stringify({ name, index, error: true, errorText: 'User has already been registered' }),
                  id: 0,
                }),
              );
            }
          } else {
            this.playersDb.addPlayer(name, password);
            const index = this.playersDb.getPlayerIndex(name);
            ws.send(
              JSON.stringify({
                type: 'reg',
                data: JSON.stringify({ name, index, error: false, errorText: '' }),
                id: 0,
              }),
            );
            console.log(`User ${name} has been registered`);
          }
      } catch(error) {
        console.error('Failed to register or login player:', error);
      }
    }

    updateWins(ws: WebSocket, req: any) {
      try {
        const data = typeof req.data === 'string' ? JSON.parse(req.data) : req.data;
          const playerName: string = data.name;
          const player: Player = this.playersDb.getPlayer(playerName);
          player.wins += 1;
          this.playersDb.updatePlayer(player);
          
          ws.send(JSON.stringify({
            type: 'update_winners',
            data: JSON.stringify({
                name: player.name,
                wins: player.wins
            }),
            id: 0
          }
        ));

      } catch (error) {
          console.error('Failed to update player wins:', error);
      }
  }

}

