import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewSharedMovePage } from './new-shared-move';

@NgModule({
  declarations: [
    NewSharedMovePage,
  ],
  imports: [
    IonicPageModule.forChild(NewSharedMovePage),
  ],
})
export class NewSharedMovePageModule {}
