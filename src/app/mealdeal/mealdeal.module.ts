import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MealdealPageRoutingModule } from './mealdeal-routing.module';

import { MealdealPage } from './mealdeal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MealdealPageRoutingModule
  ],
  declarations: [MealdealPage]
})
export class MealdealPageModule {}
