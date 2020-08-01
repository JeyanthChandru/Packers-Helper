import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpenBoxPageRoutingModule } from './open-box-routing.module';

import { OpenBoxPage } from './open-box.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OpenBoxPageRoutingModule
  ],
  declarations: [OpenBoxPage]
})
export class OpenBoxPageModule {}
