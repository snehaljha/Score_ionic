import { Component, OnInit } from '@angular/core';
import { Fixture } from '../models/fixture';
import { LiveFixturesService } from '../services/live-fixtures.service';

@Component({
  selector: 'app-live-fixture',
  templateUrl: './live-fixture.page.html',
  styleUrls: ['./live-fixture.page.scss'],
})
export class LiveFixturePage implements OnInit {

  fixtures: Array<Fixture>;
  private prevTitle: string;

  constructor(private liveFixturesService: LiveFixturesService) {
    this.prevTitle = '';
  }

  ngOnInit() {
    this.fixtures = this.liveFixturesService.fetch();
  }

  isTitleNeeded(title: string) {

    if(title === this.prevTitle)
      {return false;}
    this.prevTitle = title;
    return true;
  }

}
