import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileupdatePageRoutingModule } from './profileupdate-routing.module';

import { ProfileupdatePage } from './profileupdate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileupdatePageRoutingModule
  ],
  declarations: [ProfileupdatePage]
})
export class ProfileupdatePageModule {}
