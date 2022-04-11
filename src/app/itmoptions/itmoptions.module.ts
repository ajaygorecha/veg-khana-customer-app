import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItmoptionsPageRoutingModule } from './itmoptions-routing.module';

import { ItmoptionsPage } from './itmoptions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItmoptionsPageRoutingModule
  ],
  declarations: [ItmoptionsPage]
})
export class ItmoptionsPageModule {}
