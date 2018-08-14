import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewBoxPage } from './new-box';
import { NgxQRCodeModule } from "ngx-qrcode2";

@NgModule({
  declarations: [
    NewBoxPage,
  ],
  imports: [
    IonicPageModule.forChild(NewBoxPage),
    NgxQRCodeModule
  ],
})
export class NewBoxPageModule {}
