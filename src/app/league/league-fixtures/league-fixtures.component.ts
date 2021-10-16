import { Season } from './../../models/season';
import { LeagueService } from 'src/app/services/league.service';
import { SharedLeagueService } from './../../shared/shared-league.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ActivationStart, Router, RouterOutlet } from '@angular/router';
import { League } from 'src/app/models/league';
import { Fixture } from 'src/app/models/fixture';

@Component({
  selector: 'app-league-fixtures',
  templateUrl: './league-fixtures.component.html',
  styleUrls: ['./league-fixtures.component.scss'],
})
export class LeagueFixturesComponent implements OnInit {

  league: League;
  fixtures: Array<Fixture>;
  latestSeasonId: number;
  lastDate: string;
  constructor(private sharedLeagueService: SharedLeagueService, private leagueService: LeagueService) {
    this.lastDate = '';
  }
  
  ngOnInit() {
    this.league = this.sharedLeagueService.getData();
    this.leagueService.fetchSeasons(this.league.id).subscribe(data => {
      const newLocal = 'seasons';
      const parsed = data[newLocal];
      const latestSeason = new Season(parsed[0]);
      this.latestSeasonId = latestSeason.id;
      this.fixtures = this.leagueService.fetchFixtures(this.league.id, this.latestSeasonId);
    });
  }

  isDateNeeded(date: string) {
    if(date === this.lastDate)
      return false;
    this.lastDate = date;
    return true;
  }
}
