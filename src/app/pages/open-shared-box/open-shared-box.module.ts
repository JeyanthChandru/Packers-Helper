import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpenSharedBoxPageRoutingModule } from './open-shared-box-routing.module';

import { OpenSharedBoxPage } from './open-shared-box.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OpenSharedBoxPageRoutingModule
  ],
  declarations: [OpenSharedBoxPage]
})
export class OpenSharedBoxPageModule {}
