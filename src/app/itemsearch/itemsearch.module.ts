import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemsearchPageRoutingModule } from './itemsearch-routing.module';

import { ItemsearchPage } from './itemsearch.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemsearchPageRoutingModule
  ],
  declarations: [ItemsearchPage]
})
export class ItemsearchPageModule {}
