import { LeagueStandingsComponent } from './league-standings/league-standings.component';
import { LeagueFixturesComponent } from './league-fixtures/league-fixtures.component';
import { LeagueOverviewComponent } from './league-overview/league-overview.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeaguePage } from './league.page';

const routes: Routes = [
  {
    path: '',
    component: LeaguePage,
    children: [
      {
        path: '',
        redirectTo: 'league-overview'
      },
      {
        path: 'league-overview',
        component: LeagueOverviewComponent
      },
      {
        path: 'league-fixtures',
        component: LeagueFixturesComponent,
      },
      {
        path: 'league-standings',
        component: LeagueStandingsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeaguePageRoutingModule {}
