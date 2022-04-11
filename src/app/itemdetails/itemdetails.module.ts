import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemdetailsPageRoutingModule } from './itemdetails-routing.module';

import { ItemdetailsPage } from './itemdetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemdetailsPageRoutingModule
  ],
  declarations: [ItemdetailsPage]
})
export class ItemdetailsPageModule {}
