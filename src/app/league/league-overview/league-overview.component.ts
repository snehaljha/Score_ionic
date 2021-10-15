import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PickerController, PickerOptions } from '@ionic/angular';
import { League } from 'src/app/models/league';
import { Season } from 'src/app/models/season';
import { LeagueService } from 'src/app/services/league.service';
import { SharedLeagueService } from 'src/app/shared/shared-league.service';

@Component({
  selector: 'app-league-overview',
  templateUrl: './league-overview.component.html',
  styleUrls: ['./league-overview.component.scss'],
})
export class LeagueOverviewComponent implements OnInit {

  league: League;
  champs: Array<any>;
  seasons: Array<Season>;
  selectedSeason: Season;
  selectedLabel: string;
  stats: any;
  constructor(sharedLeagueService: SharedLeagueService, private leagueService: LeagueService, private pickerController: PickerController) {
    this.league = sharedLeagueService.getData();
    this.champs = this.leagueService.fetchChamps(this.league.id);
    this.seasons = new Array<Season>();
    this.leagueService.fetchSeasons(this.league.id).subscribe(data => {
      const newLocal = 'seasons';
      const parsed = data[newLocal];
      for(const i of parsed) {
        this.seasons.push(new Season(i));
      }
      this.selectedSeason = this.seasons[0];
      this.selectedLabel = this.selectedSeason.year;
      this.stats = leagueService.fetchStats(this.league.id, this.selectedSeason.id);
    });
  }

  async ngOnInit() {
  }


  async showPicker() {
    const columns = new Array();
    for(const season of this.seasons) {
      columns.push({text: season.year, value: season});
    }
    const opts: PickerOptions = {
      buttons: [],
      columns: [{
        name: 'season',
        options: columns
      }]
    };

    const picker = await this.pickerController.create(opts);
    picker.present();
    picker.onDidDismiss().then(async data => {
      const col = await picker.getColumn('season');
      this.selectedSeason = col.options[col.selectedIndex].value;
      this.selectedLabel = this.selectedSeason.year;
      this.stats = this.leagueService.fetchStats(this.league.id, this.selectedSeason.id);
    });
  }


}
