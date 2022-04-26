import { FavouriteService } from './../../services/favourite.service';
import { TeamService } from './../../services/team.service';
import { SharedTeamService } from './../../shared/shared-team.service';
import { Team } from './../../models/team';
import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/models/player';
import { Contants } from 'src/app/models/contants';

@Component({
  selector: 'app-squad',
  templateUrl: './squad.component.html',
  styleUrls: ['./squad.component.scss'],
})
export class SquadComponent implements OnInit {

  basicInfo: any;
  squad: Array<Player>;
  team: Team;
  emptyPlayerPhoto: string;

  constructor(sharedTeam: SharedTeamService, public teamService: TeamService, private favouriteService: FavouriteService) {
    this.team = sharedTeam.getData();
    this.basicInfo = teamService.fetchBasicInfo(this.team.id);
    this.squad = teamService.fetchSquad(this.team.id);
    this.emptyPlayerPhoto = Contants.emptyPlayerPhoto;
  }

  async ngOnInit() {
    this.team.favourite = await this.favouriteService.containsTeam(this.team);
  }

  getFootIcon(player: Player) {
    return 'assets/images/'+player.preferredFoot+'_foot.png';
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

}
