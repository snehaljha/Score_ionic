import { SharedLeagueService } from 'src/app/shared/shared-league.service';
import { TeamService } from './../../services/team.service';
import { SharedTeamService } from './../../shared/shared-team.service';
import { Component, OnInit } from '@angular/core';
import { Fixture } from 'src/app/models/fixture';
import { Team } from 'src/app/models/team';
import { SharedFixtureService } from 'src/app/shared/shared-fixture.service';
import { Router } from '@angular/router';
import { League } from 'src/app/models/league';

@Component({
  selector: 'app-team-fixtures',
  templateUrl: './team-fixtures.component.html',
  styleUrls: ['./team-fixtures.component.scss'],
})
export class TeamFixturesComponent implements OnInit {

  team: Team;
  fixtures: Array<Fixture>;
  private prevTitle: string;
  private thread: any;

  constructor(private sharedTeam: SharedTeamService, private teamService: TeamService, private sharedFixture: SharedFixtureService,
    private router: Router, private sharedLeague: SharedLeagueService) {
    this.team = sharedTeam.getData();
    this.fixtures = teamService.fetchFixtures(this.team.id);
    this.prevTitle = '';
  }

  ngOnInit() {
    if(this.thread == undefined) {
      this.thread = setInterval(() => this.refreshFixtures(), 100000);
    }
  }

  ngOnDestroy() {
    clearInterval(this.thread);
    this.thread = undefined;
  }

  private refreshFixtures() {
    this.fixtures = this.teamService.fetchFixtures(this.team.id);
  }

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

  gotoLeague(league: League) {
    this.sharedLeague.setData(league);
    this.router.navigate(['league']);
  }

}
