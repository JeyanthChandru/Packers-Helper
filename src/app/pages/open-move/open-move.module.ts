import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpenMovePageRoutingModule } from './open-move-routing.module';

import { OpenMovePage } from './open-move.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OpenMovePageRoutingModule
  ],
  declarations: [OpenMovePage]
})
export class OpenMovePageModule {}
