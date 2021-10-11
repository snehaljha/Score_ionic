import { Contants } from "./contants";

export class Category {

    name: string;
    slug: string;
    priority: number;
    id: number;
    flag: string;
    alpha2: string;
    flagUrl: string;
    
    constructor(parsed) {
        this.name = parsed['name'];
        this.slug = parsed['slug'];
        this.alpha2 = parsed['alpha2'];
        this.flag = parsed['flag'];
        this.priority = parsed['priority'];
        this.id = parsed['id'];

        if(this.priority == null || this.priority == undefined)
            this.priority = 0;
        if(this.alpha2 != null)
            this.flagUrl = Contants.categoryIcon + this.alpha2.toLowerCase() + '.png';
        else if(this.flag != null)
        this.flagUrl = Contants.categoryIcon + this.flag.toLowerCase() + '.png';
    }

    getTournamentLogo() {
        if(this.flag)
            return this.flagUrl;
        return Contants.tournamentLogo.replace('{id}', this.id.toString());
    }
}
