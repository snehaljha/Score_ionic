import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Fixture } from 'src/app/models/fixture';
import { League } from 'src/app/models/league';
import { MyFixturesLoaderService } from 'src/app/services/my-fixtures-loader.service';
import { SharedFixtureService } from 'src/app/shared/shared-fixture.service';
import { SharedLeagueService } from 'src/app/shared/shared-league.service';

@Component({
  selector: 'app-my-fixtures',
  templateUrl: './my-fixtures.component.html',
  styleUrls: ['./my-fixtures.component.scss'],
})
export class MyFixturesComponent implements OnInit {

  fixtures: Array<Fixture>;
  private prevTitle: string;
  private prevDate: string;

  constructor(private myFixturesLoader: MyFixturesLoaderService, private sharedLeague: SharedLeagueService, private router: Router, private sharedFixture: SharedFixtureService) {
    this.prevTitle = '';
    this.prevDate = '';
  }
  
  ngOnInit() {    
    this.fixtures = this.myFixturesLoader.fetch();
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
