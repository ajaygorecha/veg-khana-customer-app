import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemdetailsPage } from './itemdetails.page';

const routes: Routes = [
  {
    path: '',
    component: ItemdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemdetailsPageRoutingModule {}
