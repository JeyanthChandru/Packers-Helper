import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpenSharedMovePageRoutingModule } from './open-shared-move-routing.module';

import { OpenSharedMovePage } from './open-shared-move.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    OpenSharedMovePageRoutingModule
  ],
  declarations: [OpenSharedMovePage]
})
export class OpenSharedMovePageModule {}
