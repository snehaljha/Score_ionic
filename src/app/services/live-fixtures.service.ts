import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { Contants } from '../models/contants';
import { Fixture } from '../models/fixture';

@Injectable({
  providedIn: 'root'
})
export class LiveFixturesService {

  constructor(private http: HttpClient) { }

  fetch() {
    const response = this.http.get(Contants.liveMatches);
    const fixtures = new Array<Fixture>();
    response.subscribe(data => {
      const newLocal = 'events';
      const parsed = data[newLocal];
      for(const i in parsed) {
        if(parsed[i].tournament.uniqueTournament != null) {
          fixtures.push(new Fixture(parsed[i], new Category(parsed[i].tournament.uniqueTournament)));
        } else {
          fixtures.push(new Fixture(parsed[i], new Category(parsed[i].tournament.category)));
        }
      }
      fixtures.sort((a: Fixture, b: Fixture) => {
        if(a.startTimeStamp < b.startTimeStamp)
          {return 1;}
        if(a.startTimeStamp > b.startTimeStamp)
          {return -1;}
        const pa = a.homeTeam.userCount + a.awayTeam.userCount;
        const pb = b.awayTeam.userCount + b.homeTeam.userCount;
        if(pa > pb)
          {return -1;}
        if(pa < pb)
          {return 1;}
        return 0;
      });
    });

    return fixtures;
  }
}
