import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpenMovePageRoutingModule } from './open-move-routing.module';

import { OpenMovePage } from './open-move.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    OpenMovePageRoutingModule
  ],
  declarations: [OpenMovePage]
})
export class OpenMovePageModule {}
