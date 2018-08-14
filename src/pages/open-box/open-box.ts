import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-open-box',
  templateUrl: 'open-box.html',
})
export class OpenBoxPage {
  private boxName: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.boxName = this.navParams.get('name');
  }
}
