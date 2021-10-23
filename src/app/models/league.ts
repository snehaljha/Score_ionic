import { Contants } from './contants';
import { Season } from './season';

export class League {

    name: string;
    slug: string;
    userCount: number;
    id: number;
    logo: string;
    seasons: Array<Season>;
    alpha2: string;
    flag: string;

    constructor(parsed) {
        this.flag = parsed.flag;
        this.alpha2 = parsed.alpha2;
        this.name = parsed.name;
        this.slug = parsed.slug;
        this.id = parsed.id;
        this.userCount = parsed.userCount;
        if(this.alpha2)
            this.logo = Contants.categoryIcon + this.alpha2.toLowerCase() + '.png';
        else if(this.flag)
            this.logo = Contants.categoryIcon + this.flag.toLowerCase() + '.png';
        else
            this.logo = Contants.leagueLogo.replace('{league_id}', this.id.toString());
        if(!this.userCount) {
            this.userCount = 0;
        }
    }
}
