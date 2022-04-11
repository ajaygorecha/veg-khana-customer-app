import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WritereviewPage } from './writereview.page';

const routes: Routes = [
  {
    path: '',
    component: WritereviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WritereviewPageRoutingModule {}
