import { FixtureScore } from './../models/fixture-score';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contants } from '../models/contants';
import { FixtureEvent } from '../models/fixture-event';

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
        events.push(new FixtureEvent(i));
      }
    });
    return events;
  }
}
