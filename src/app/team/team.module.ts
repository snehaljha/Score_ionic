import { TeamStatsComponent } from './team-stats/team-stats.component';
import { TeamFixturesComponent } from './team-fixtures/team-fixtures.component';
import { SquadComponent } from './squad/squad.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeamPageRoutingModule } from './team-routing.module';

import { TeamPage } from './team.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeamPageRoutingModule
  ],
  declarations: [TeamPage, SquadComponent, TeamFixturesComponent, TeamStatsComponent]
})
export class TeamPageModule {}
