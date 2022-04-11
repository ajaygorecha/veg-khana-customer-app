import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookabuffetPage } from './bookabuffet.page';

const routes: Routes = [
  {
    path: '',
    component: BookabuffetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookabuffetPageRoutingModule {}
