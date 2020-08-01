import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewMovePageRoutingModule } from './new-move-routing.module';

import { NewMovePage } from './new-move.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewMovePageRoutingModule
  ],
  declarations: [NewMovePage]
})
export class NewMovePageModule {}
