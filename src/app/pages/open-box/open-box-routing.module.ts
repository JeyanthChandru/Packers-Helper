import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpenBoxPage } from './open-box.page';

const routes: Routes = [
  {
    path: '',
    component: OpenBoxPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpenBoxPageRoutingModule {}
