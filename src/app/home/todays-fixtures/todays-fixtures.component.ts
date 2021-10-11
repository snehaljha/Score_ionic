import { TodaysFixturesLoaderService } from './../../services/todays-fixtures-loader.service';
import { Component, OnInit } from '@angular/core';
import { Fixture } from 'src/app/models/fixture';

@Component({
  selector: 'app-todays-fixtures',
  templateUrl: './todays-fixtures.component.html',
  styleUrls: ['./todays-fixtures.component.scss'],
})
export class TodaysFixturesComponent implements OnInit {

  fixtures: Array<Fixture>
  private prevTitle: string;

  constructor(private todaysFixturesLoader :TodaysFixturesLoaderService) { 
    this.prevTitle = "";
  }

  ngOnInit() {
    this.fixtures = this.todaysFixturesLoader.fetch().sort(this.todayfixturesort);
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
