import { Fixture } from './../models/fixture';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contants } from '../models/contants';
import { Category } from '../models/category';
import { League } from '../models/league';

@Injectable({
  providedIn: 'root'
})
export class TodaysFixturesLoaderService {

  private map: Map<string, Array<Fixture>>;

  private date: string;
  constructor(private http: HttpClient) {
    this.map = new Map();
    const today = new Date();
    const yyyy = String(today.getFullYear());
    const mm = String(today.getMonth()+1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    this.date = yyyy+'-'+mm+'-'+dd;
  }

  fetch() {
    if(this.map.has(this.date))
      {return this.map.get(this.date);}
    const response = this.http.get(Contants.fixtureByDate.replace('yyyy-mm-dd', this.date));
    const fixtures = new Array<Fixture>();
    response.subscribe(data => {
      const newLocal = 'events';
      const parsed = data[newLocal];
      for(const i in parsed) {
        if(parsed[i].tournament.uniqueTournament != null) {
          fixtures.push(new Fixture(parsed[i], new League(parsed[i].tournament.uniqueTournament)));
        } else {
          fixtures.push(new Fixture(parsed[i], new League(parsed[i].tournament.category)));
        }
      }
      fixtures.sort((a: Fixture, b: Fixture) => {
        if(a.startTimeStamp < b.startTimeStamp)
          {return -1;}
        if(a.startTimeStamp > b.startTimeStamp)
          {return 1;}
        const pa = a.homeTeam.userCount + a.awayTeam.userCount;
        const pb = b.awayTeam.userCount + b.homeTeam.userCount;
        if(pa > pb)
          {return -1;}
        if(pa < pb)
          {return 1;}
        return 0;
      });
    });
    this.map.set(this.date, fixtures);
    return fixtures;

  }
}
