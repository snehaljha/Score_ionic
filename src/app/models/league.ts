import { Contants } from './contants';
import { Season } from './season';

export class League {

    name: string;
    slug: string;
    userCount: number;
    id: number;
    logo: string;
    seasons: Array<Season>;

    constructor(parsed) {
        this.name = parsed.name;
        this.slug = parsed.slug;
        this.id = parsed.id;
        this.userCount = parsed.userCount;
        this.logo = Contants.leagueLogo.replace('{league_id}', this.id.toString());
        if(!this.userCount) {
            this.userCount = 0;
        }
    }
}
