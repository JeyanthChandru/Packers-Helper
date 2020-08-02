import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewMovePageRoutingModule } from './new-move-routing.module';

import { NewMovePage } from './new-move.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NewMovePageRoutingModule
  ],
  declarations: [NewMovePage]
})
export class NewMovePageModule {}
