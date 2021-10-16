import { Component, OnInit } from '@angular/core';
import { Fixture } from 'src/app/models/fixture';
import { LiveFixturesService } from 'src/app/services/live-fixtures.service';

@Component({
  selector: 'app-live-fixtures',
  templateUrl: './live-fixtures.component.html',
  styleUrls: ['./live-fixtures.component.scss'],
})
export class LiveFixturesComponent implements OnInit {
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
