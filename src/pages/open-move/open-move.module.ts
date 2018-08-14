import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OpenMovePage } from './open-move';

@NgModule({
  declarations: [
    OpenMovePage,
  ],
  imports: [
    IonicPageModule.forChild(OpenMovePage),
  ],
})
export class OpenMovePageModule { }
