import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyacountPage } from './myacount.page';

const routes: Routes = [
  {
    path: '',
    component: MyacountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyacountPageRoutingModule {}
