import { Component, OnInit } from '@angular/core';
import { Fixture } from '../models/fixture';
import { TodaysFixturesLoaderService } from '../services/todays-fixtures-loader.service';

@Component({
  selector: 'app-todays-fixtures',
  templateUrl: './todays-fixtures.page.html',
  styleUrls: ['./todays-fixtures.page.scss'],
})
export class TodaysFixturesPage implements OnInit {
  
  fixtures: Array<Fixture>;
  private prevTitle: string;

  constructor(private todaysFixturesLoader: TodaysFixturesLoaderService) {
    this.prevTitle = '';
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