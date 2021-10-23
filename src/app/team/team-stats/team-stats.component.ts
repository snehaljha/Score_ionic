import { PickerController } from '@ionic/angular';
import { Category } from './../../models/category';
import { Season } from './../../models/season';
import { TeamService } from './../../services/team.service';
import { SharedTeamService } from './../../shared/shared-team.service';
import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/models/team';
import { PickerOptions } from '@ionic/core';

@Component({
  selector: 'app-team-stats',
  templateUrl: './team-stats.component.html',
  styleUrls: ['./team-stats.component.scss'],
})
export class TeamStatsComponent implements OnInit {

  team: Team;
  statSeasons: Array<any>;
  tournamentLabel: string;
  seasonLabel: string;
  selectedTournament: Category;
  selectedSeason: Season;
  seasonChoice: Array<Season>;
  overallStats: Array<any>;

  constructor(private sharedTeam: SharedTeamService, private teamService: TeamService, private pickerController: PickerController) {
    this.team = sharedTeam.getData();
    this.statSeasons = new Array();
    teamService.fetchStatSeason(this.team.id).subscribe(data => {
      const parsed = data['uniqueTournamentSeasons'];
      for(const i of parsed) {
        const item = new Map();
        item['category'] = new Category(i.uniqueTournament);
        item['seasons'] = new Array<Season>();
        for(const j of i['seasons']) {
          item['seasons'].push(new Season(j));
        }
        this.statSeasons.push(item);
      }
      this.tournamentLabel = this.statSeasons[0].category.name;
      this.seasonLabel = this.statSeasons[0].seasons[0].year;
      this.seasonChoice = this.statSeasons[0].seasons;
      this.selectedTournament = this.statSeasons[0].category;
      this.selectedSeason = this.statSeasons[0].seasons[0];
      this.overallStats = teamService.fetchOverallStats(this.team.id, this.selectedTournament.id, this.selectedSeason.id);
    });
  }

  ngOnInit() {}

  async showTournamentPicker() {
    const columns = new Array();
    for(const ss of this.statSeasons) {
      columns.push({text: ss.category.name, value: ss});
    }
    const opts: PickerOptions = {
      buttons: [],
      columns: [{
        name: 'Tournament',
        options: columns
      }]
    };

    const picker = await this.pickerController.create(opts);
    picker.present();
    picker.onDidDismiss().then(async data => {
      const col = await picker.getColumn('Tournament');
      this.selectedTournament = col.options[col.selectedIndex].value.category;
      this.tournamentLabel = this.selectedTournament.name;
      this.seasonChoice = col.options[col.selectedIndex].value.seasons;
      this.selectedSeason = this.seasonChoice[0];
      this.seasonLabel = this.selectedSeason.year;
      this.overallStats = this.teamService.fetchOverallStats(this.team.id, this.selectedTournament.id, this.selectedSeason.id);
    });
  }

  async showSeasonPicker() {
    const columns = new Array();
    for(const season of this.seasonChoice) {
      columns.push({text: season.year, value: season});
    }
    const opts: PickerOptions = {
      buttons: [],
      columns: [{
        name: 'Season',
        options: columns
      }]
    };

    const picker = await this.pickerController.create(opts);
    picker.present();
    picker.onDidDismiss().then(async data => {
      const col = await picker.getColumn('Season');
      this.selectedSeason = col.options[col.selectedIndex].value;
      this.seasonLabel = this.selectedSeason.year;
      this.overallStats = this.teamService.fetchOverallStats(this.team.id, this.selectedTournament.id, this.selectedSeason.id);
    });
  }

}
