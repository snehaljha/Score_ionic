import { LeagueStandingsComponent } from './league-standings/league-standings.component';
import { LeagueOverviewComponent } from './league-overview/league-overview.component';
import { LeagueFixturesComponent } from './league-fixtures/league-fixtures.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeaguePageRoutingModule } from './league-routing.module';

import { LeaguePage } from './league.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeaguePageRoutingModule
  ],
  declarations: [LeaguePage, LeagueFixturesComponent, LeagueOverviewComponent, LeagueStandingsComponent]
})
export class LeaguePageModule {}
