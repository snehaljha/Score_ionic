import { Team } from './../models/team';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contants } from '../models/contants';
import { Season } from '../models/season';
import { Player } from '../models/player';
import { Fixture } from '../models/fixture';
import { Category } from '../models/category';
import { League } from '../models/league';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {

  constructor(private http: HttpClient) { }

  fetchChamps(id: number) {
    const url = Contants.leagueOverview.replace('{league_id}', id.toString());
    const response = this.http.get(url);
    const res: Array<any> = new Array();
    response.subscribe(data => {
      const newLocal = 'uniqueTournament';
      const parsed = data[newLocal];
      let detail = parsed.titleHolder;
      res.push(new Team(detail));
      detail = parsed.titleHolderTitles;
      res.push(detail);
      detail = parsed.mostTitlesTeams[0];
      res.push(new Team(detail));
      detail = parsed.mostTitles;
      res.push(detail);
    });
    return res;
  }

  fetchSeasons(id: number) {
    const url = Contants.seasons.replace('{league_id}', id.toString());
    return this.http.get(url);
  }

  fetchStats(leagueId: number, seasonId: number) {
    const url = Contants.leagueStats.replace('{league_id}', leagueId.toString()).replace('{season_id}', seasonId.toString());
    const res = new Map();
    this.http.get(url).subscribe(data => {
      const parsed = data['topPlayers'];
      res['goals'] = this.getStat(parsed['goals'], 'goals');
      res['assists'] = this.getStat(parsed['assists'], 'assists');
      res['goalsassists'] = this.getStat(parsed['goalsAssistsSum'], 'goalsAssistsSum');
      res['keyPasses'] = this.getStat(parsed['keyPasses'], 'keyPasses');
      res['accuratePasses'] = this.getStat(parsed['accuratePasses'], 'accuratePasses');
      res['successfulDribbles'] = this.getStat(parsed['successfulDribbles'], 'successfulDribbles');
      res['interceptions'] = this.getStat(parsed['interceptions'], 'interceptions');
      res['tackles'] = this.getStat(parsed['tackles'], 'tackles');
      res['clearances'] = this.getStat(parsed['clearances'], 'clearances');
      res['saves'] = this.getStat(parsed['saves'], 'saves');
      res['cleanSheet'] = this.getStat(parsed['cleanSheet'], 'cleanSheet');
      res['leastConceded'] = this.getStat(parsed['leastConceded'], 'leastConceded');
      res['yellowCards'] = this.getStat(parsed['yellowCards'], 'yellowCards');
      res['redCards'] = this.getStat(parsed['redCards'], 'redCards');
    });
    return res;
  }

  private getStat(parsed, arg) {
    const res = new Map();
    res['player'] = new Player(parsed[0].player)
    console.log(res['player']);
    if(arg === 'leastConceded') {
      arg = 'goalsConceded';
    }
    res['stat'] = parsed[0].statistics[arg];
    const percent = parsed[0].statistics[arg+'Percentage'];
    if(percent) {
      res['stat'] = res['stat']+' - '+(percent.toFixed(2))+'%';
    }
    return res;
  }

  fetchFixtures(leagueId: number, seasonId: number) {
    const url = Contants.leaguePastMatches.replace('{league_id}', leagueId.toString()).replace('{season_id}', seasonId.toString());
    const res = Array<Fixture>();
    this.http.get(url).subscribe(data => {
      let parsed = data['tournamentTeamEvents'];
      const powerKeys = Object.keys(parsed);
      for(const pk of powerKeys) {
        const parser = parsed[pk];
        const subKeys = Object.keys(parser);
        const ids = new Set();
        for(const k of subKeys) {
          for(const i of parser[k]) {
            const fixture = new Fixture(i, new League(i['tournament']['uniqueTournament']));
            if(!ids.has(fixture.id)) {
              ids.add(fixture.id);
              res.push(fixture);
            }
          }
        }
      }

      res.sort((a: Fixture, b: Fixture) => {
        if(a.startTimeStamp > b.startTimeStamp)
          return -1;
        if(a.startTimeStamp < b.startTimeStamp)
          return 1;
        if(a.homeTeam.userCount > b.homeTeam.userCount)
          return -1;
        if(a.homeTeam.userCount < b.homeTeam.userCount)
          return 1;
        return 0;
      });
      console.log()
    });
    return res;
  }

  fetchStandingsList(leagueId: number, seasonId: number) {
    const url = Contants.standings.replace('{league_id}', leagueId.toString()).replace('{season_id}', seasonId.toString());
    const res = new Array();
    this.http.get(url).subscribe(data => {
      const parsed = data['standings'];
      for(const i of parsed) {
        res.push(this.getStandings(i));
      }
    });
    return res;
  }

  private getStandings(parsed) {
    const res = new Map();
    res['name'] = parsed.name;
    const standings = new Array();
    for(const i of parsed['rows']) {
      standings.push({team: new Team(i['team']), position: i['position'], played: i['matches'], points: i['points'],
      wins: i['wins'], losses: i['losses'], draws: i['draws'], scoresFor: i['scoresFor'], scoresAgainst: i['scoresAgainst']});
    }

    standings.sort((a,b) => {
      if(a.position < b.position)
        return -1;
      if(a.position > b.position)
        return 1;
      return 0;
    });
    res['standings'] = standings;
    return res;
  }
}
