import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewBoxPage } from './new-box';

@NgModule({
  declarations: [
    NewBoxPage,
  ],
  imports: [
    IonicPageModule.forChild(NewBoxPage),
  ],
})
export class NewBoxPageModule {}
