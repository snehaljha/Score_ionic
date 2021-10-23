import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Injectable } from '@angular/core';
import { Team } from '../models/team';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  private favourites: Array<Team>;

  constructor(private nativeStorage: NativeStorage) {
    nativeStorage.getItem('favourites').then(data => {this.favourites = data['teams'] as Array<Team>});
    if(!this.favourites)
      this.favourites = new Array<Team>();
  }

  addTeam(team: Team) {
    for(const t of this.favourites) {
      if(t.id == team.id)
        return;
    }
    this.favourites.push(team);
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
  }

  sync() {
    this.nativeStorage.setItem('favourites', {'teams': this.favourites});
  }

  contains(team: Team) {
    for(const t of this.favourites) {
      if(t.id == team.id) {
        return true;
      }
    }
    return false;
  }


}
