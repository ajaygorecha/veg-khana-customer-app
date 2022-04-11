import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileupdatePage } from './profileupdate.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileupdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileupdatePageRoutingModule {}
