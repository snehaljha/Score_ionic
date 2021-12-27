import { Router } from '@angular/router';
import { SharedLeagueService } from './../../shared/shared-league.service';
import { Component, OnInit } from '@angular/core';
import { Fixture } from 'src/app/models/fixture';
import { LiveFixturesService } from 'src/app/services/live-fixtures.service';
import { Category } from 'src/app/models/category';
import { League } from 'src/app/models/league';
import { SharedFixtureService } from 'src/app/shared/shared-fixture.service';

@Component({
  selector: 'app-live-fixtures',
  templateUrl: './live-fixtures.component.html',
  styleUrls: ['./live-fixtures.component.scss'],
})
export class LiveFixturesComponent implements OnInit {
  fixtures: Array<Fixture>;
  private prevTitle: string;
  private thread: any;

  constructor(private liveFixturesService: LiveFixturesService, private sharedLeague: SharedLeagueService, private router: Router, private sharedFixture: SharedFixtureService) {
    this.prevTitle = '';
  }

  ngOnInit() {
    this.refreshFixtures();
    if(this.thread == undefined) {
      this.thread = setInterval(() => this.refreshFixtures(), 45000);
    }
  }

  ngOnDestroy() {
    clearInterval(this.thread);
    this.thread = undefined;
  }

  private refreshFixtures() {
    this.fixtures = this.liveFixturesService.fetch();
  }

  isTitleNeeded(title: string) {

    if(title === this.prevTitle)
      {return false;}
    this.prevTitle = title;
    return true;
  }

  gotoLeague(category: League) {
    this.sharedLeague.setData(category);
    this.router.navigate(['league']);
  }

  gotoFixture(fixture: Fixture) {
    this.sharedFixture.setData(fixture);
    this.router.navigate(['fixture']);
  }
}
