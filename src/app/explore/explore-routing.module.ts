import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllComponent } from './all/all.component';

import { ExplorePage } from './explore.page';
import { TopTeamsComponent } from './top-teams/top-teams.component';

const routes: Routes = [
  {
    path: '',
    component: ExplorePage,
    children: [
      {
        path: '',
        redirectTo: 'all'
      },
      {
        path: 'all',
        component: AllComponent
      },
      {
        path: 'top-teams',
        component: TopTeamsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExplorePageRoutingModule {}
