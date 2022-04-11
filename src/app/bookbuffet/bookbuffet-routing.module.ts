import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookbuffetPage } from './bookbuffet.page';

const routes: Routes = [
  {
    path: '',
    component: BookbuffetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookbuffetPageRoutingModule {}
