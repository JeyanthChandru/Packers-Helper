import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewSharedMovePageRoutingModule } from './new-shared-move-routing.module';

import { NewSharedMovePage } from './new-shared-move.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewSharedMovePageRoutingModule
  ],
  declarations: [NewSharedMovePage]
})
export class NewSharedMovePageModule {}
