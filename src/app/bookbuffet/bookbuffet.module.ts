import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookbuffetPageRoutingModule } from './bookbuffet-routing.module';

import { BookbuffetPage } from './bookbuffet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookbuffetPageRoutingModule
  ],
  declarations: [BookbuffetPage]
})
export class BookbuffetPageModule {}
