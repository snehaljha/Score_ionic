import { HttpClient } from '@angular/common/http';
import { Contants } from "./contants";

export class Player {
    name: string;
    slug: string;
    shortName: string;
    position: string;
    userCount: number;
    id: number;
    photo: string;
    preferredFoot: string;
    shirtNumber: any;

    constructor(parsed) {
        this.name = parsed.name;
        this.slug = parsed.slug;
        this.shortName = parsed.shortName;
        this.position = parsed.position;
        this.userCount = parsed.userCount;
        this.id = parsed.id;
        this.photo = Contants.playerPhoto.replace('{player_id}', this.id.toString());
        this.preferredFoot = parsed.preferredFoot;
        this.shirtNumber = parsed.shirtNumber;
        if(!this.shirtNumber)
            this.shirtNumber = 'NA';
    }

    makeCoach() {
        this.position = 'Coach';
        this.photo = Contants.managerPhoto.replace('{player_id}', this.id.toString());
    }
}
