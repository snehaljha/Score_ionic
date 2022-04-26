import { FavouriteService } from './../../services/favourite.service';
import { FixtureScore } from './../../models/fixture-score';
import { FixtureService } from './../../services/fixture.service';
import { Component, OnInit } from '@angular/core';
import { Fixture } from 'src/app/models/fixture';
import { SharedFixtureService } from 'src/app/shared/shared-fixture.service';
import { FixtureEvent } from 'src/app/models/fixture-event';
import { Team } from 'src/app/models/team';
import { SharedTeamService } from 'src/app/shared/shared-team.service';
import { SharedLeagueService } from 'src/app/shared/shared-league.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fixture-events',
  templateUrl: './fixture-events.component.html',
  styleUrls: ['./fixture-events.component.scss'],
})
export class FixtureEventsComponent implements OnInit {

  fixture: Fixture;
  info: Map<any, any>;
  eventDetails: Map<string, any>;
  time: string;
  thread: any;
  firstFetch: boolean;
  fixtureStatus: string;

  constructor(private sharedFixture: SharedFixtureService, private fixtureService: FixtureService, private favouriteService: FavouriteService, private sharedTeam: SharedTeamService, private sharedLeague: SharedLeagueService, private router: Router) {
    this.fixtureStatus = '-';
    this.fixture = sharedFixture.getData();
    this.firstFetch = true;
    this.info = fixtureService.fetchInfo(this.fixture.id);
    this.fixtureStatus = this.fixture.getStatusMessage();
  }

  async ngOnInit() {
    this.refreshDetails();
    this.fixture.homeTeam.favourite = await this.favouriteService.containsTeam(this.fixture.homeTeam);
    this.fixture.awayTeam.favourite = await this.favouriteService.containsTeam(this.fixture.awayTeam);
    if(this.thread === undefined) {
      this.thread = setInterval(() => {this.refreshDetails();}, 15000);
    }
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
    if(this.firstFetch || this.eventDetails.get('isLive')) {
      this.firstFetch = false;
      this.eventDetails = this.fixtureService.fetchEvents(this.fixture.id);
      this.time = this.fixture.getStatusMessage();
      console.log(this.eventDetails.get("hs"));
    }

    if(this.eventDetails.get('events') && this.eventDetails.get('events')[0]) {
      console.log('found now');
      if(this.eventDetails.get('events')[0].msg == 'HT')
        this.fixture.statusCode = 31;
      else if(this.eventDetails.get('events')[0].msg == 'FT')
        this.fixture.statusCode = 100;
    }
    this.fixtureStatus = this.fixture.getStatusMessage();
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
  }

  gotoTeam(team: Team) {
    this.sharedTeam.setData(team);
    this.router.navigate(['team']);
  }

  gotoLeague() {
    this.sharedLeague.setData(this.fixture.league);
    this.router.navigate(['league']);
  }

}
