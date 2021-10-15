import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'live-fixture',
    loadChildren: () => import('./live-fixture/live-fixture.module').then( m => m.LiveFixturePageModule)
  },  {
    path: 'explore',
    loadChildren: () => import('./explore/explore.module').then( m => m.ExplorePageModule)
  },
  {
    path: 'league-list',
    loadChildren: () => import('./league-list/league-list.module').then( m => m.LeagueListPageModule)
  },
  {
    path: 'league',
    loadChildren: () => import('./league/league.module').then( m => m.LeaguePageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
