import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TodaysFixturesPageRoutingModule } from './todays-fixtures-routing.module';

import { TodaysFixturesPage } from './todays-fixtures.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodaysFixturesPageRoutingModule
  ],
  declarations: [TodaysFixturesPage]
})
export class TodaysFixturesPageModule {}
