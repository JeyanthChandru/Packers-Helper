import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Box } from '../../models/box-model/box.model';

@IonicPage()
@Component({
  selector: 'page-open-box',
  templateUrl: 'open-box.html',
})
export class OpenBoxPage {
  private box: Box;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.box = this.navParams.data;
  }
}
