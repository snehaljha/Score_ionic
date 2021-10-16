import { Router } from '@angular/router';
import { SharedTeamService } from './../../shared/shared-team.service';
import { LeagueService } from 'src/app/services/league.service';
import { SharedLeagueService } from 'src/app/shared/shared-league.service';
import { Component, OnInit } from '@angular/core';
import { League } from 'src/app/models/league';
import { Season } from 'src/app/models/season';
import { Team } from 'src/app/models/team';

@Component({
  selector: 'app-league-standings',
  templateUrl: './league-standings.component.html',
  styleUrls: ['./league-standings.component.scss'],
})
export class LeagueStandingsComponent implements OnInit {

  league: League
  standingsList: Array<any>;
  constructor(private sharedLeagueService: SharedLeagueService, private leagueService: LeagueService, private sharedTeam: SharedTeamService, private router: Router) {
    this.league = sharedLeagueService.getData();
    this.leagueService.fetchSeasons(this.league.id).subscribe(data => {
      const newLocal = 'seasons';
      const parsed = data[newLocal];
      const latestSeason = new Season(parsed[0]);
      this.standingsList = this.leagueService.fetchStandingsList(this.league.id, latestSeason.id);
    });
  }

  ngOnInit() {}

  gotoTeam(team: Team) {
    this.sharedTeam.setData(team);
    this.router.navigate(['team']);
  }

}
