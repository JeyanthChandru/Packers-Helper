import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpenSharedMovePage } from './open-shared-move.page';

const routes: Routes = [
  {
    path: '',
    component: OpenSharedMovePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpenSharedMovePageRoutingModule {}
