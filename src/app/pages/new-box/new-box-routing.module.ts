import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewBoxPage } from './new-box.page';

const routes: Routes = [
  {
    path: '',
    component: NewBoxPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewBoxPageRoutingModule {}
