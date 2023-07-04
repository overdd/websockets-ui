export class Player {
    name: string;
    password: string;
    wins: number;

    constructor(name: string, password: string) {
        this.name = name;
        this.password = password;
        this.wins = 0;
    }
}