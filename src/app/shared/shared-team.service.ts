import { Injectable } from '@angular/core';
import { Team } from '../models/team';

@Injectable({
  providedIn: 'root'
})
export class SharedTeamService {

  team: Team;
  constructor() {}

  getData() {
    return this.team;
  }

  setData(team: Team) {
    this.team = team;
  }
}
