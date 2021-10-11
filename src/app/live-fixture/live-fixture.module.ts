import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LiveFixturePageRoutingModule } from './live-fixture-routing.module';

import { LiveFixturePage } from './live-fixture.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LiveFixturePageRoutingModule
  ],
  declarations: [LiveFixturePage]
})
export class LiveFixturePageModule {}
