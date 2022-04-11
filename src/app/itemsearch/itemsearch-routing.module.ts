import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemsearchPage } from './itemsearch.page';

const routes: Routes = [
  {
    path: '',
    component: ItemsearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemsearchPageRoutingModule {}
