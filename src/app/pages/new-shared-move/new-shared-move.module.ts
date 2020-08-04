import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewSharedMovePageRoutingModule } from './new-shared-move-routing.module';

import { NewSharedMovePage } from './new-shared-move.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    NewSharedMovePageRoutingModule
  ],
  declarations: [NewSharedMovePage]
})
export class NewSharedMovePageModule {}
