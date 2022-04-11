import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItmoptionsPage } from './itmoptions.page';

const routes: Routes = [
  {
    path: '',
    component: ItmoptionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItmoptionsPageRoutingModule {}
