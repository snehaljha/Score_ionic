import { FixtureScore } from './../../models/fixture-score';
import { FixtureService } from './../../services/fixture.service';
import { Component, OnInit } from '@angular/core';
import { Fixture } from 'src/app/models/fixture';
import { SharedFixtureService } from 'src/app/shared/shared-fixture.service';
import { FixtureEvent } from 'src/app/models/fixture-event';

@Component({
  selector: 'app-fixture-events',
  templateUrl: './fixture-events.component.html',
  styleUrls: ['./fixture-events.component.scss'],
})
export class FixtureEventsComponent implements OnInit {

  fixture: Fixture;
  info: Map<any, any>;
  events: Array<FixtureEvent>;

  constructor(private sharedFixture: SharedFixtureService, private fixtureService: FixtureService) {
    this.fixture = sharedFixture.getData();
    this.info = fixtureService.fetchInfo(this.fixture.id);
    this.events = fixtureService.fetchEvents(this.fixture.id);
  }

  ngOnInit() {}

  getScore(homeScore: FixtureScore, awayScore: FixtureScore) {
    if(homeScore == undefined || awayScore == undefined)
      return '-';
    return homeScore.current + ' - ' + awayScore.current;
  }

}
