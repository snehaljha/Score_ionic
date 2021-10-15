import { League } from './../models/league';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedLeagueService {
  league: League;
  constructor() { }

  setData(league: League) {
    this.league = league;
  }

  getData() {
    return this.league;
  }
}
