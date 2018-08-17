import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OpenSharedMovePage } from './open-shared-move';

@NgModule({
  declarations: [
    OpenSharedMovePage,
  ],
  imports: [
    IonicPageModule.forChild(OpenSharedMovePage),
  ],
})
export class OpenSharedMovePageModule {}
