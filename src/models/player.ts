export class Player {
    index: number;
    name: string;
    password: string;
    wins: number;

    constructor(name: string, password: string) {
        this.name = name;
        this.password = password;
        this.wins = 0;
    }

    getIndex(): number {
        return this.index;
    }
}