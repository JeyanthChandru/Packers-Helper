import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { BoxDetailsProvider } from '../../providers/box-details/box-details';
import { Box } from '../../models/box-model/box.model';
import { Printer, PrintOptions } from '../../../node_modules/@ionic-native/printer';
import { Observable } from '../../../node_modules/rxjs';
import { Move } from '../../models/new-move/new-move.model';

@IonicPage()
@Component({
  selector: 'page-open-move',
  templateUrl: 'open-move.html',
})
export class OpenMovePage {
  private box: Box[]
  private move: Move
  private openBoxPage: string = 'OpenBoxPage';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private boxDetails: BoxDetailsProvider,
    private modalCtrl: ModalController,
    private printer: Printer) {
    this.move = this.navParams.data;
  }

  ngOnInit() {
    this.boxDetails.getBoxDetails(this.move.$key).subscribe(data => {
      this.box = data;
    });
  }

  addNewBox() {
    let modal = this.modalCtrl.create('NewBoxPage');
    modal.present();
  }

  printContent() {
    var page = document.getElementById('allBox');
    this.printer.isAvailable().then(() => {
      let options: PrintOptions = {
        name: 'MyDocument',
        printerId: 'printer007',
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
