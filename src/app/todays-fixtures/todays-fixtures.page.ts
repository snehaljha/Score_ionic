import { Router } from '@angular/router';
import { SharedLeagueService } from './../shared/shared-league.service';
import { Component, OnInit } from '@angular/core';
import { Fixture } from '../models/fixture';
import { League } from '../models/league';
import { TodaysFixturesLoaderService } from '../services/todays-fixtures-loader.service';
import { SharedFixtureService } from '../shared/shared-fixture.service';

@Component({
  selector: 'app-todays-fixtures',
  templateUrl: './todays-fixtures.page.html',
  styleUrls: ['./todays-fixtures.page.scss'],
})
export class TodaysFixturesPage implements OnInit {
  
  fixtures: Array<Fixture>;
  private prevTitle: string;
  private prevDate: string;

  constructor(private todaysFixturesLoader: TodaysFixturesLoaderService, private sharedLeague: SharedLeagueService, private router: Router, private sharedFixture: SharedFixtureService) {
    this.prevTitle = '';
    this.prevDate = '';
  }

  ngOnInit() {
    this.fixtures = this.todaysFixturesLoader.fetch();
  }

  isTitleNeeded(title: string, code: number, ind: number): boolean {
    if(title === this.prevTitle)
      {return false;}
    this.prevTitle = title;
    return true;
  }

  isDateNeeded(date: string) {
    if(date == this.prevDate)
      return false;
    this.prevDate = date;
    this.prevDate = '';
    return true;
  }

  gotoLeague(league: League) {
    this.sharedLeague.setData(league);
    this.router.navigate(['league']);
  }

  gotoFixture(fixture: Fixture) {
    this.sharedFixture.setData(fixture);
    this.router.navigate(['fixture']);
  }
}