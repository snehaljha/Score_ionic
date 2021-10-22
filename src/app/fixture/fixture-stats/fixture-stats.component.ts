import { FixtureService } from './../../services/fixture.service';
import { Fixture } from './../../models/fixture';
import { Component, OnInit } from '@angular/core';
import { SharedFixtureService } from 'src/app/shared/shared-fixture.service';

@Component({
  selector: 'app-fixture-stats',
  templateUrl: './fixture-stats.component.html',
  styleUrls: ['./fixture-stats.component.scss'],
})
export class FixtureStatsComponent implements OnInit {

  fixture: Fixture;
  stats: any;
  selection: string;
  constructor(sharedFixture: SharedFixtureService, fixtureService: FixtureService) {
    this.fixture = sharedFixture.getData();
    this.stats = fixtureService.fetchStats(this.fixture.id);
    this.selection = 'ALL';
  }

  ngOnInit() {}

}
