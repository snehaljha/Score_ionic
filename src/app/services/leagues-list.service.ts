import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contants } from '../models/contants';
import { League } from '../models/league';

@Injectable({
  providedIn: 'root'
})
export class LeaguesListService {

  constructor(private http: HttpClient) { }

  fetch(id: number) {
    const url = Contants.league.replace('{category_id}', id.toString());
    const response = this.http.get(url);
    const leagues = Array<League>();
    response.subscribe(data => {
      const newLocal = 'groups';
      let parsed = data[newLocal];
      parsed = parsed[0].uniqueTournaments;
      for(const i of parsed) {
        leagues.push(new League(i));
      }
      leagues.sort((a: League, b: League) => {
        if(a.userCount > b.userCount) {
          return -1;
        }
        if(a.userCount < b.userCount) {
          return 1;
        }
        return 0;
      });
      console.log(leagues[0].logo);
    });
    return leagues;
  }
}
