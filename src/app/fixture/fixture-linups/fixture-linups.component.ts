import { FixtureService } from './../../services/fixture.service';
import { Component, OnInit } from '@angular/core';
import { Fixture } from 'src/app/models/fixture';
import { SharedFixtureService } from 'src/app/shared/shared-fixture.service';

@Component({
  selector: 'app-fixture-linups',
  templateUrl: './fixture-linups.component.html',
  styleUrls: ['./fixture-linups.component.scss'],
})
export class FixtureLinupsComponent implements OnInit {

  fixture: Fixture;
  selectedTeam: string;
  linupDetails: any;
  constructor(private sharedFixture: SharedFixtureService, private fixtureService: FixtureService) {
    this.fixture = sharedFixture.getData();
  }

  ngOnInit() {
    this.linupDetails = this.fixtureService.fetchLinups(this.fixture.id);
  }

}
