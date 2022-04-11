import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MealdealPage } from './mealdeal.page';

const routes: Routes = [
  {
    path: '',
    component: MealdealPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MealdealPageRoutingModule {}
