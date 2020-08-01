import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewSharedMovePage } from './new-shared-move.page';

const routes: Routes = [
  {
    path: '',
    component: NewSharedMovePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewSharedMovePageRoutingModule {}
