import { TodaysFixturesLoaderService } from './../../services/todays-fixtures-loader.service';
import { Component, OnInit } from '@angular/core';
import { Fixture } from 'src/app/models/fixture';

@Component({
  selector: 'app-todays-fixtures',
  templateUrl: './todays-fixtures.component.html',
  styleUrls: ['./todays-fixtures.component.scss'],
})
export class TodaysFixturesComponent implements OnInit {

  fixtures: Array<Fixture>;
  private prevTitle: string;
  // private startInd: number;

  constructor(private todaysFixturesLoader: TodaysFixturesLoaderService) {
    this.prevTitle = '';
    // this.startInd = -1;
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

}
