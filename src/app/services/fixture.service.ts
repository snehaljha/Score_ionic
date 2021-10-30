import { Player } from 'src/app/models/player';
import { FixtureScore } from './../models/fixture-score';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contants } from '../models/contants';
import { FixtureEvent } from '../models/fixture-event';
import { Fixture } from '../models/fixture';
import { League } from '../models/league';

@Injectable({
  providedIn: 'root'
})
export class FixtureService {

  constructor(private http: HttpClient) { }

  fetchInfo(fixtureId: number) {
    const url = Contants.fixtureInfo.replace('{fixture_id}', fixtureId.toString());
    const res = new Map();
    this.http.get(url).subscribe(data => {
      const parsed = data['event'];
      res['venue'] = parsed['venue']['stadium']['name'] + ' - ' + parsed['venue']['city']['name'];
      res['customId'] = parsed['customId'];
      res['refree'] = parsed['referee']['name'];
      res['isStats'] = parsed['hasEventPlayerStatistics']?parsed['hasEventPlayerStatistics']:false;
      res['homeScore'] = new FixtureScore(parsed['homeScore']);
      res['awayScore'] = new FixtureScore(parsed['awayScore']);
    }); 
    return res;
  }

  fetchEvents(fixtureId: number) {
    const url = Contants.fixtureEvents.replace('{fixture_id}', fixtureId.toString());
    const events = new Array<FixtureEvent>();
    this.http.get(url).subscribe(data => {
      const parsed = data['incidents'];
      for(const i of parsed) {
        let event  = new FixtureEvent(i);
        if(event.isHome == undefined || event.icon != 'na')
          events.push(event);
      }
    });
    return events;
  }

  fetchLinups(fixtureId: number) {
    const url = Contants.matchLineups.replace('{fixture_id}', fixtureId.toString());
    const linupDetails = new Map<any, any>();
    this.http.get(url).subscribe(data => {
      linupDetails['confirmation'] = data['confirmed']?'Confirmed Lineup':'Predicted Linup';
      let parsed = data['home'];
      const home = new Map<any, any>();
      home['formation'] = parsed['formation'];
      let players = new Array<Player>();
      let subs = new Array<Player>();
      let ind=0;
      for(const i of parsed['players']) {
        const player = new Player(i['player']);
        player.shirtNumber = i['shirtNumber'];
        if(ind++ < 11) {
          players.push(player);
        } else {
          subs.push(player);
        }
      }
      home['players'] = players;
      home['subs'] = subs;      
      players = new Array<Player>();
      for(const i of parsed['missingPlayers']) {
        const player = new Player(i['player']);
        player.shirtNumber = i['shirtNumber'];
        players.push(player);
      }
      home['missingPlayers'] = players;
      linupDetails['home'] = home;


      parsed = data['away'];
      const away = new Map<any, any>();
      away['formation'] = parsed['formation'];
      players = new Array<Player>();
      subs = new Array<Player>();
      ind=0;
      for(const i of parsed['players']) {
        const player = new Player(i['player']);
        player.shirtNumber = i['shirtNumber'];
        if(ind++ < 11) {
          players.push(player);
        } else {
          subs.push(player);
        }
      }
      away['players'] = players;
      away['subs'] = subs;
      players = new Array<Player>();
      for(const i of parsed['missingPlayers']) {
        const player = new Player(i['player']);
        player.shirtNumber = i['shirtNumber'];
        players.push(player);
      }
      away['missingPlayers'] = players;
      linupDetails['away'] = away;
    });
    return linupDetails;
  }

  fetchStats(fixtureId: number) {
    const url = Contants.fixtureStat.replace('{fixture_id}', fixtureId.toString());
    const stats = new Map();
    this.http.get(url).subscribe(data => {
      const parsed = data['statistics'];
      for(const i of parsed) {
        const vals = new Array();
        for(const j of i['groups']) {
          for(const k of j['statisticsItems']) {
            vals.push({name: k['name'], home: k['home'], away: k['away'], winner: k['compareCode']});
          }
        }
        stats[i['period']] = vals;
      }
    });
    return stats;
  }

  fetchFacts(fixtureId: number) {
    const url = Contants.otherStats.replace('{fixture_id}', fixtureId.toString());
    const facts = new Map();
    this.http.get(url).subscribe(data=> {
      const parsed = data['general'];
      const home = new Array();
      const away = new Array();
      for(const i of parsed) {
        const stat = {name: i['name'], value: i['value']};
        if(i['team'] == 'home') {
          home.push(stat);
        } else {
          away.push(stat);
        }
      }
      facts['home'] = home;
      facts['away'] = away;
    });
    return facts;
  }

  fetchH2H(customId: string) {
    const url = Contants.h2h.replace('{custom_id}', customId);
    const res = Array<Fixture>();
    this.http.get(url).subscribe(data => {
      let parsed = data['events'];
      for(const i of parsed) {
        res.push(new Fixture(i, new League(i['tournament']['uniqueTournament'])));
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
    });
    return res;
  }

  fetchRawCustomId(fixtureId: number) {
    const url = Contants.fixtureInfo.replace('{fixture_id}', fixtureId.toString());
    return this.http.get(url);
  }
}
