import { TeamStatsComponent } from './team-stats/team-stats.component';
import { TeamFixturesComponent } from './team-fixtures/team-fixtures.component';
import { SquadComponent } from './squad/squad.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeamPage } from './team.page';

const routes: Routes = [
  {
    path: '',
    component: TeamPage,
    children: [
      {
        path: '',
        redirectTo: 'squad'
      },
      {
        path: 'squad',
        component: SquadComponent,
      },
      {
        path: 'team-fixtures',
        component: TeamFixturesComponent
      },
      {
        path: 'team-stats',
        component: TeamStatsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamPageRoutingModule {}
