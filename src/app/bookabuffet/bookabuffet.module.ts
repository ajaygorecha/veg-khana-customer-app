import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookabuffetPageRoutingModule } from './bookabuffet-routing.module';

import { BookabuffetPage } from './bookabuffet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookabuffetPageRoutingModule
  ],
  declarations: [BookabuffetPage]
})
export class BookabuffetPageModule {}
