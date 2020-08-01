import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewMovePage } from './new-move.page';

const routes: Routes = [
  {
    path: '',
    component: NewMovePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewMovePageRoutingModule {}
