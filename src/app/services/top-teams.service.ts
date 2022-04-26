import { FavouriteService } from './favourite.service';
import { Team } from './../models/team';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contants } from '../models/contants';

@Injectable({
  providedIn: 'root'
})
export class TopTeamsService {

  constructor(private http: HttpClient, private favouriteService: FavouriteService) { }

  fetch() {
    const response = this.http.get(Contants.topTeams);
    const teams = new Array<Team>();
    response.subscribe(async data => {
      const newLocal = 'teams';
      const parsed = data[newLocal];
      let ind=0;
      for(const i in parsed) {
        if({}.hasOwnProperty.call(parsed, i)) {
          if(ind++>=50)
            {break;}
          teams.push(new Team(parsed[i]));
        }
      }

      for(const t of teams) {
        let favTeam: boolean = await this.favouriteService.containsTeam(t);
        if(favTeam) {
          t.favourite = true;
        }
      }
    });
    return teams;
  }
}
