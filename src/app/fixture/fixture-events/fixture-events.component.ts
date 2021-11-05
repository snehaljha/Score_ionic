import { FavouriteService } from './../../services/favourite.service';
import { FixtureScore } from './../../models/fixture-score';
import { FixtureService } from './../../services/fixture.service';
import { Component, OnInit } from '@angular/core';
import { Fixture } from 'src/app/models/fixture';
import { SharedFixtureService } from 'src/app/shared/shared-fixture.service';
import { FixtureEvent } from 'src/app/models/fixture-event';
import { Team } from 'src/app/models/team';

@Component({
  selector: 'app-fixture-events',
  templateUrl: './fixture-events.component.html',
  styleUrls: ['./fixture-events.component.scss'],
})
export class FixtureEventsComponent implements OnInit {

  fixture: Fixture;
  info: Map<any, any>;
  eventDetails: Map<any, any>;
  time: string;
  thread: any;
  firstFetch: boolean;

  constructor(private sharedFixture: SharedFixtureService, private fixtureService: FixtureService, private favouriteService: FavouriteService) {
    this.fixture = sharedFixture.getData();
    this.firstFetch = true;
    this.fixture.homeTeam.favourite = favouriteService.contains(this.fixture.homeTeam);
    this.fixture.awayTeam.favourite = favouriteService.contains(this.fixture.awayTeam);
    this.info = fixtureService.fetchInfo(this.fixture.id);
  }

  ngOnInit() {
    this.refreshDetails();
    if(this.thread == undefined)
      this.thread = setInterval(() => {this.refreshDetails();}, 15000);
  }

  ionViewWillEnter(){
  }

  ngOnDestroy() {
    clearInterval(this.thread);
    this.thread = undefined;
    console.log('destroyed');
  }

  // private calcTime() {
  //   if(this.fixture && this.fixture.periodStartTimeStamp && this.fixture.offset && this.fixture.maxTime) {
  //     let currentTimeStamp: number = Math.floor(Date.now()/1000);
  //     let diff = (currentTimeStamp-this.fixture.periodStartTimeStamp)/60;
  //     let res = Number((this.fixture.offset + diff).toFixed());
  //     if(res > this.fixture.maxTime) {
  //         return this.fixture.maxTime.toString() + '+' + (res-this.fixture.maxTime).toString() + '\'';
  //     }
  //     return res.toString() + '\'';
  //   }
  //   return "";
  // }

  private refreshDetails() {
    if(this.firstFetch || this.eventDetails['isLive']) {
      this.firstFetch = false;
      this.eventDetails = this.fixtureService.fetchEvents(this.fixture.id);
      this.time = this.fixture.getStatusMessage();
    }
    console.info('refreshed');
  }

  getScore(homeScore: FixtureScore, awayScore: FixtureScore) {
    if(homeScore == undefined || awayScore == undefined)
      return '-';
    return homeScore + ' - ' + awayScore;
  }

  changeFav(team: Team, $event) {
    team.favourite = !team.favourite;
    $event.stopPropagation();
    if(team.favourite) {
      this.favouriteService.addTeam(team);
    }
    else {
      this.favouriteService.removeTeam(team);
    }
    this.favouriteService.sync();
  }

}
