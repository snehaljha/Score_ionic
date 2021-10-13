import { Contants } from './contants';

export class Team {
    name: string;
    slug: string;
    shortName: string;
    userCount: number;
    nameCode: string;
    id: number;
    teamLogo: string;
    favourite: boolean;

    constructor(response) {
        this.name = response.name;
        this.slug = response.slug;
        this.shortName = response.shortName;
        this.userCount = response.userCount;
        this.nameCode = response.nameCode;
        this.id = response.id;
        this.favourite = false;
        this.teamLogo = Contants.teamLogo.replace('{team_id}', String(this.id));
    }
}
