import { Storage } from '@capacitor/storage';
import { Injectable } from '@angular/core';
import { Team } from '../models/team';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  private favourites: Array<Team>;

  init() {
    this.getObject('favourites').then(data => {
      this.favourites = data as unknown as Array<Team>;
      if(!this.favourites)
        this.favourites = new Array<Team>();
    });
  }


  addTeam(team: Team) {
    for(const t of this.favourites) {
      if(t.id == team.id)
        return;
    }
    this.favourites.push(team);
    this.setObject('favourites', this.favourites);
  }

  removeTeam(team: Team) {
    let ind=0;
    for(const t of this.favourites) {
      if(t.id == team.id) {
        break;
      }
      ind++;
    }
    if(ind == this.favourites.length)
      return;
    this.favourites.splice(ind, 1);
    this.setObject('favourites', this.favourites);
  }

  async setString(key: string, value: string) {
      await Storage.set({ key, value });
  }

  async getString(key: string): Promise<{ value: any }> {
      return (await Storage.get({ key }));
  }

  async setObject(key: string, value: any) {
      await Storage.set({ key, value: JSON.stringify(value) });
  }

  async getObject(key: string): Promise<{ value: any }> {
      const ret = await Storage.get({ key });
      return JSON.parse(ret.value);
  }


  async removeItem(key: string) {
      await Storage.remove({ key });
  }

  async clear() {
      await Storage.clear();
  }

  async contains(team: Team) {
    if(this.favourites == undefined) {
      await this.init();
    }
    for(const t of this.favourites) {
      if(t.id == team.id) {
        return true;
      }
    }
    return false;
  }


}
