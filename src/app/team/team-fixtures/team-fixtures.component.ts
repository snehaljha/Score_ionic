import { TeamService } from './../../services/team.service';
import { SharedTeamService } from './../../shared/shared-team.service';
import { Component, OnInit } from '@angular/core';
import { Fixture } from 'src/app/models/fixture';
import { Team } from 'src/app/models/team';
import { SharedFixtureService } from 'src/app/shared/shared-fixture.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team-fixtures',
  templateUrl: './team-fixtures.component.html',
  styleUrls: ['./team-fixtures.component.scss'],
})
export class TeamFixturesComponent implements OnInit {

  team: Team;
  fixtures: Array<Fixture>;
  private prevTitle: string;

  constructor(private sharedTeam: SharedTeamService, teamService: TeamService, private sharedFixture: SharedFixtureService, private router: Router) {
    this.team = sharedTeam.getData();
    this.fixtures = teamService.fetchFixtures(this.team.id);
    this.prevTitle = '';
  }

  ngOnInit() {}

  isTitleNeeded(title: string, code: number, ind: number): boolean {
    if(title === this.prevTitle)
      {return false;}
    this.prevTitle = title;
    return true;
  }

  gotoFixture(fixture: Fixture) {
    this.sharedFixture.setData(fixture);
    this.router.navigate(['fixture']);
  }

}
