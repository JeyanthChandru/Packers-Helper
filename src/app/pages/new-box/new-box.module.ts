import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewBoxPageRoutingModule } from './new-box-routing.module';

import { NewBoxPage } from './new-box.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewBoxPageRoutingModule
  ],
  declarations: [NewBoxPage]
})
export class NewBoxPageModule {}
