import { TeamService } from './../../services/team.service';
import { SharedTeamService } from './../../shared/shared-team.service';
import { Team } from './../../models/team';
import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/models/player';

@Component({
  selector: 'app-squad',
  templateUrl: './squad.component.html',
  styleUrls: ['./squad.component.scss'],
})
export class SquadComponent implements OnInit {

  basicInfo: any;
  squad: Array<Player>;
  team: Team;

  constructor(sharedTeam: SharedTeamService, teamService: TeamService) {
    this.team = sharedTeam.getData();
    this.basicInfo = teamService.fetchBasicInfo(this.team.id);
    this.squad = teamService.fetchSquad(this.team.id);
  }

  ngOnInit() {}

  getFootIcon(player: Player) {
    return 'assets/images/'+player.preferredFoot+'_foot.png';
  }

}
