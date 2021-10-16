import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodaysFixturesPage } from './todays-fixtures.page';

const routes: Routes = [
  {
    path: '',
    component: TodaysFixturesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodaysFixturesPageRoutingModule {}
