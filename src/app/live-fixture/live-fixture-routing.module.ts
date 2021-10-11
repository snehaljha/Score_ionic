import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LiveFixturePage } from './live-fixture.page';

const routes: Routes = [
  {
    path: '',
    component: LiveFixturePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LiveFixturePageRoutingModule {}
