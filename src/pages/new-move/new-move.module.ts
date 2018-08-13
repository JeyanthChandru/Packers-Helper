import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewMovePage } from './new-move';

@NgModule({
  declarations: [
    NewMovePage,
  ],
  imports: [
    IonicPageModule.forChild(NewMovePage),
  ],
})
export class NewMovePageModule {}
