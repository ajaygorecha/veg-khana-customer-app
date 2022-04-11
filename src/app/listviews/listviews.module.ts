import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListviewsPageRoutingModule } from './listviews-routing.module';

import { ListviewsPage } from './listviews.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListviewsPageRoutingModule
  ],
  declarations: [ListviewsPage]
})
export class ListviewsPageModule {}
