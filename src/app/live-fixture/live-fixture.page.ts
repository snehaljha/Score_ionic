import { Component, OnInit } from '@angular/core';
import { Fixture } from '../models/fixture';
import { LiveFixturesService } from '../services/live-fixtures.service';

@Component({
  selector: 'app-live-fixture',
  templateUrl: './live-fixture.page.html',
  styleUrls: ['./live-fixture.page.scss'],
})
export class LiveFixturePage implements OnInit {

  fixtures: Array<Fixture>
  private prevTitle: string;

  constructor(private liveFixturesService :LiveFixturesService) { 
    this.prevTitle = "";
  }

  ngOnInit() {
    this.fixtures = this.liveFixturesService.fetch().sort(this.todayfixturesort);
  }

  private todayfixturesort(a: Fixture, b: Fixture) {
    if(a.startTimeStamp < b.startTimeStamp)
      return 1;
    if(a.startTimeStamp > b.startTimeStamp)
      return -1;
    let pa = a.homeTeam.userCount + a.awayTeam.userCount;
    let pb = b.awayTeam.userCount + b.homeTeam.userCount;
    if(pa > pb)
      return -1;
    if(pa < pb)
      return 1;
    return 0;
  }

  isTitleNeeded(title: string) {

    if(title == this.prevTitle)
      return false;
    this.prevTitle = title;
    return true;
  }

}
