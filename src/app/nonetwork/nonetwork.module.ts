import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NonetworkPageRoutingModule } from './nonetwork-routing.module';

import { NonetworkPage } from './nonetwork.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NonetworkPageRoutingModule
  ],
  declarations: [NonetworkPage]
})
export class NonetworkPageModule {}
