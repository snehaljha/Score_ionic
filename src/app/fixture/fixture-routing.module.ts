import { FixtureOthersComponent } from './fixture-others/fixture-others.component';
import { FixtureStatsComponent } from './fixture-stats/fixture-stats.component';
import { FixtureLinupsComponent } from './fixture-linups/fixture-linups.component';
import { FixtureEventsComponent } from './fixture-events/fixture-events.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FixturePage } from './fixture.page';

const routes: Routes = [
  {
    path: '',
    component: FixturePage,
    children: [
      {
        path: '',
        redirectTo: 'fixture-events'
      },
      {
        path: 'fixture-events',
        component: FixtureEventsComponent
      },
      {
        path: 'fixture-linups',
        component: FixtureLinupsComponent,
      },
      {
        path: 'fixture-stats',
        component: FixtureStatsComponent
      },
      {
        path: 'fixture-others',
        component: FixtureOthersComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FixturePageRoutingModule {}
