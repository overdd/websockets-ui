import { WebSocket } from "ws";
import playersDb from "../db/playersDb";
import { Player } from "../models/player";

export class PlayerController {
  registerPlayer(ws: WebSocket, req: any) {
    try {
      const data =
        typeof req.data === "string" ? JSON.parse(req.data) : req.data;
      const { name, password } = data;
      if (playersDb.getPlayer(name)) {
        if (playersDb.validatePlayer(name, password)) {
          const index = playersDb.getPlayerIndex(name);
          ws.send(
            JSON.stringify({
              type: "reg",
              data: JSON.stringify({
                name,
                index,
                error: false,
                errorText: "",
              }),
              id: 0,
            })
          );
          return playersDb.getPlayer(name);
        } else {
          const index = playersDb.getPlayerIndex(name);
          ws.send(
            JSON.stringify({
              type: "reg",
              data: JSON.stringify({
                name,
                index,
                error: true,
                errorText: `User has already been registered`,
              }),
              id: 0,
            })
          );
        }
      } else {
        const player = playersDb.addPlayer(name, password);
        player.index = playersDb.getNextAvailableIndex();
        const index = player.getIndex();
        ws.send(
          JSON.stringify({
            type: "reg",
            data: JSON.stringify({ name, index, error: false, errorText: "" }),
            id: 0,
          })
        );
        console.log(`User ${name} has been registered`);
        console.log(playersDb);
        return player;
      }
    } catch (error) {
      console.error(`Failed to register or login player:`, error);
    }
  }

  updateWins(ws: WebSocket, req: any) {
    try {
      const data =
        typeof req.data === "string" ? JSON.parse(req.data) : req.data;
      const playerName: string = data.name;
      const player: Player = playersDb.getPlayer(playerName);
      player.wins += 1;
      playersDb.updatePlayer(player);

      ws.send(
        JSON.stringify({
          type: "update_winners",
          data: JSON.stringify({
            name: player.name,
            wins: player.wins,
          }),
          id: 0,
        })
      );
      console.log(`Wins of ${playerName} were updated.`);
    } catch (error) {
      console.error(`Failed to update player wins:`, error);
    }
  }
}
