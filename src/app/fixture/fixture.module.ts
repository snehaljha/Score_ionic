import { FixtureStatsComponent } from './fixture-stats/fixture-stats.component';
import { FixtureOthersComponent } from './fixture-others/fixture-others.component';
import { FixtureLinupsComponent } from './fixture-linups/fixture-linups.component';
import { FixtureEventsComponent } from './fixture-events/fixture-events.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FixturePageRoutingModule } from './fixture-routing.module';

import { FixturePage } from './fixture.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FixturePageRoutingModule
  ],
  declarations: [FixturePage, FixtureEventsComponent, FixtureLinupsComponent, FixtureOthersComponent, FixtureStatsComponent]
})
export class FixturePageModule {}
