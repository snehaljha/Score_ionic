import { FixtureService } from './../services/fixture.service';
import { Component, OnInit } from '@angular/core';
import { SharedFixtureService } from '../shared/shared-fixture.service';
import { Fixture } from '../models/fixture';

@Component({
  selector: 'app-fixture',
  templateUrl: './fixture.page.html',
  styleUrls: ['./fixture.page.scss'],
})
export class FixturePage implements OnInit {

  title: string;
  info: Map<any, any>;
  private fixture: Fixture;

  constructor(sharedFixture: SharedFixtureService, fixtureService: FixtureService) {
    this.fixture = sharedFixture.getData();
    this.title = this.fixture.homeTeam.shortName + ' - ' +this.fixture.awayTeam.shortName;
    this.info = fixtureService.fetchInfo(this.fixture.id);
  }

  ngOnInit() {
    console.warn('oninit');
  }

  ionViewWillEnter(){
    console.warn('view will enter');
  }

  ionViewDidLoad(){
    console.warn('view did load');
  }

  ionViewWillUnload(){
   console.warn('view will unload');
  }

  ionViewWillLeave(){
    console.warn('view will leave');
  }

  ngOnDestroy() {
    console.warn('destroye');
  }

}
