import { Player } from './../models/player';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contants } from '../models/contants';
import { Fixture } from '../models/fixture';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private order: Array<string>;
  constructor(private http: HttpClient) {
    this.order = ['G', 'D', 'M', 'F'];
  }

  fetchBasicInfo(teamId: number) {
    const url = Contants.teamInfo.replace('{team_id}', teamId.toString());
    const res = new Map();
    this.http.get(url).subscribe(data => {
      const parsed = data['team'];
      const manager = new Player(parsed['manager']);
      manager.makeCoach();
      const city = parsed['venue']['city']['name'];
      const name = parsed['venue']['stadium']['name'];
      res['stadium'] = name + ' - ' + city;
      res['manager'] = manager;
    });
    return res;
  }

  fetchSquad(teamId: number) {
    const url = Contants.teamSquad.replace('{team_id}', teamId.toString());
    const squad = Array<Player>();
    this.http.get(url).subscribe(data => {
      const parsed = data['players'];
      for(const i of parsed) {
        squad.push(new Player(i['player']));
      }
      squad.sort((a: Player, b: Player) => {
        const pia = this.order.indexOf(a.position);
        const pib = this.order.indexOf(b.position);
        if(pia < pib)
          return -1;
        if(pia > pib)
          return 1;
        if(a.userCount > b.userCount)
          return -1;
        if(a.userCount < b.userCount)
          return 1;
        return 0;
      })
    });
    return squad;
  }

  fetchFixtures(teamId: number) {
    let url=Contants.teamPastMatches.replace('{team_id}', teamId.toString());
    const fixtures = new Array<Fixture>();
    this.http.get(url).subscribe(data => {
      const parsed = data['events'];
      for(const i of parsed) {
        fixtures.push(new Fixture(i, new Category(i['tournament']['uniqueTournament'])));
      }
    });
    url = Contants.teamNextMatches.replace('{team_id}', teamId.toString());
    this.http.get(url).subscribe(data => {
      const parsed = data['events'];
      for(const i of parsed) {
        fixtures.push(new Fixture(i, new Category(i['tournament']['uniqueTournament'])));
      }
      fixtures.sort((a: Fixture, b: Fixture) => {
        if(a.startTimeStamp < b.startTimeStamp)
          return -1;
        if(a.startTimeStamp > b.startTimeStamp)
          return 1;
        return 0;
      });
    });
    return fixtures;
  }
}
