import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyacountPageRoutingModule } from './myacount-routing.module';

import { MyacountPage } from './myacount.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyacountPageRoutingModule
  ],
  declarations: [MyacountPage]
})
export class MyacountPageModule {}
