import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Team } from '../models/team';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  constructor(private storage: Storage) {
    storage.create();
  }

  addTeam(team: Team) {
    this.storage.set(team.id.toString(), 'true').then(i => console.log('saved')).catch(i => console.warn(i));
  }

  removeTeam(team: Team) {
    this.storage.remove(team.id.toString()).then(i => console.log('removed')).catch(i => console.warn(i));
  }

  async containsTeam(team: Team): Promise<boolean> {
    let val: boolean;
    await this.storage.get(team.id.toString()).then(i => {
      val = i==='true';
    });
    console.log(val);
    return val;
  }

}
