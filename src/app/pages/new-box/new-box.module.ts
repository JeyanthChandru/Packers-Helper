import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewBoxPageRoutingModule } from './new-box-routing.module';

import { NewBoxPage } from './new-box.page';

import { QRCodeModule } from "angularx-qrcode";
import { NgxIonicImageViewerModule } from "ngx-ionic-image-viewer";



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NewBoxPageRoutingModule,
    QRCodeModule,
    NgxIonicImageViewerModule,
  ],
  declarations: [NewBoxPage]
})
export class NewBoxPageModule { }
