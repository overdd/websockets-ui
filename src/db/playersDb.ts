import { Player } from '../models/player';

export class PlayersDB {
    private players: Player[];

    constructor() {
        this.players = [];
    }

    addPlayer(name: string, password: string): Player | null {
        const existingPlayer = this.players.find(player => player.name === name);
        if (existingPlayer) {
            return null;
        }
        const newPlayer = new Player(name, password);
        this.players.push(newPlayer);
        return newPlayer;
    }

    getPlayer(name: string): Player | undefined {
        return this.players.find(player => player.name === name);
    }

    validatePlayer(name: string, password: string): boolean {
        const player = this.getPlayer(name);
        return player !== undefined && player.password === password;
    }

    getPlayerIndex(name: string): number {
        return this.players.findIndex(player => player.name === name);
    }

    updatePlayer(player: Player): void {
        console.log(`Trying to update ${this.players[player.name]}.`)
        if (this.players[player.name]) {
            this.players[player.name] = player;
            console.log(`${this.players[player.name]} updated successfully!`)
        } else {
            console.error(`Player ${player.name} not found in database.`);
        }
    }

    getNextAvailableIndex(): number {
        return this.players.length - 1;
    }
}
