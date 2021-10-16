import { Router } from '@angular/router';
import { SharedTeamService } from './../../shared/shared-team.service';
import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/models/team';
import { TopTeamsService } from 'src/app/services/top-teams.service';

@Component({
  selector: 'app-top-teams',
  templateUrl: './top-teams.component.html',
  styleUrls: ['./top-teams.component.scss'],
})
export class TopTeamsComponent implements OnInit {
  teams: Array<Team>;
  constructor(private topTeamsService: TopTeamsService, private sharedTeam: SharedTeamService, private router: Router) { }

  ngOnInit() {
    this.teams = this.topTeamsService.fetch();
  }

  gotoTeam(team: Team) {
    this.sharedTeam.setData(team);
    this.router.navigate(['team']);
  }

}
