import { Player } from './player';

export class PlayersDB {
    private players: Map<string, Player>;

    constructor() {
        this.players = new Map<string, Player>();
    }

    addPlayer(name: string, password: string): Player | null {
        if (this.players.has(name)) {
            return null;
        }
        const player = new Player(name, password);
        this.players.set(name, player);
        return player;
    }

    getPlayer(name: string): Player | undefined {
        return this.players.get(name);
    }

    validatePlayer(name: string, password: string): boolean {
        const player = this.players.get(name);
        return player !== undefined && player.password === password;
    }
}