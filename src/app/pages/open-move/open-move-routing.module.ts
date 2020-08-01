import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpenMovePage } from './open-move.page';

const routes: Routes = [
  {
    path: '',
    component: OpenMovePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpenMovePageRoutingModule {}
