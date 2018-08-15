import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewBoxPage } from './new-box';
import { NgxQRCodeModule } from "ngx-qrcode2";
import { IonicImageViewerModule } from "ionic-img-viewer";

@NgModule({
  declarations: [
    NewBoxPage,
  ],
  imports: [
    IonicPageModule.forChild(NewBoxPage),
    NgxQRCodeModule,
    IonicImageViewerModule,
  ],
})
export class NewBoxPageModule {}
