import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpenBoxPageRoutingModule } from './open-box-routing.module';

import { OpenBoxPage } from './open-box.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    OpenBoxPageRoutingModule
  ],
  declarations: [OpenBoxPage]
})
export class OpenBoxPageModule {}
