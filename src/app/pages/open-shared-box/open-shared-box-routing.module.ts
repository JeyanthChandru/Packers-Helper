import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpenSharedBoxPage } from './open-shared-box.page';

const routes: Routes = [
  {
    path: '',
    component: OpenSharedBoxPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpenSharedBoxPageRoutingModule {}
