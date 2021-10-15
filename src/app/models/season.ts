export class Season {
    name: string;
    year: string;
    id: number;

    constructor(parsed) {
        this.name = parsed.name;
        this.year = parsed.year;
        this.id = parsed.id;
    }
}
