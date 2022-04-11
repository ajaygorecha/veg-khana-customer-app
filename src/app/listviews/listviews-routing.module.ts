import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListviewsPage } from './listviews.page';

const routes: Routes = [
  {
    path: '',
    component: ListviewsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListviewsPageRoutingModule {}
