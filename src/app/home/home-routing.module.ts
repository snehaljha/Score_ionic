import { MyFixturesComponent } from './my-fixtures/my-fixtures.component';
import { TodaysFixturesComponent } from './todays-fixtures/todays-fixtures.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: '',
        redirectTo: 'todays-fixtures'
      },
      {
        path: 'todays-fixtures',
        component: TodaysFixturesComponent
      },
      {
        path: 'my-fixtures',
        component: MyFixturesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
