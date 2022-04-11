import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NonetworkPage } from './nonetwork.page';

const routes: Routes = [
  {
    path: '',
    component: NonetworkPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NonetworkPageRoutingModule {}
