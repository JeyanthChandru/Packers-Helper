import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Box } from '../../models/box-model/box.model';
import { Printer, PrintOptions } from '../../../node_modules/@ionic-native/printer';

@IonicPage()
@Component({
  selector: 'page-open-box',
  templateUrl: 'open-box.html',
})
export class OpenBoxPage {
  private box: Box;
  constructor(public navCtrl: NavController, public navParams: NavParams, private printer: Printer) {
    this.box = this.navParams.data;
  }

  editBox(box: Box) {
    this.navCtrl.push('NewBoxPage', box);
  }

  printQR() {
    var page = document.getElementById('oneBox');
    this.printer.isAvailable().then(() => {
      let options: PrintOptions = {
        name: 'MyDocument',
        duplex: true,
        landscape: true,
        grayscale: true
      };
      this.printer.print(page, options).then(() => {
        console.log('Successfully Printed.');
      }, err => {
        console.log("Cannot Print");
      });
    }, err => {
      console.log("Cannot Find Printer");
    });
  }
}
