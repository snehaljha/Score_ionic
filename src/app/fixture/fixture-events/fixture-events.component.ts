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
  events: Array<FixtureEvent>;

  constructor(private sharedFixture: SharedFixtureService, private fixtureService: FixtureService, private favouriteService: FavouriteService) {
    this.fixture = sharedFixture.getData();
    this.fixture.homeTeam.favourite = favouriteService.contains(this.fixture.homeTeam);
    this.fixture.awayTeam.favourite = favouriteService.contains(this.fixture.awayTeam);
    this.info = fixtureService.fetchInfo(this.fixture.id);
    this.events = fixtureService.fetchEvents(this.fixture.id);
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
   
  }  

  getScore(homeScore: FixtureScore, awayScore: FixtureScore) {
    if(homeScore == undefined || awayScore == undefined || !homeScore.current || !awayScore.current)
      return '-';
    return homeScore.current + ' - ' + awayScore.current;
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
