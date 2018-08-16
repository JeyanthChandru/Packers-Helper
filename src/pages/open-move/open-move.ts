import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ActionSheetController } from 'ionic-angular';
import { BoxDetailsProvider } from '../../providers/box-details/box-details';
import { Box } from '../../models/box-model/box.model';
import { Printer, PrintOptions } from '../../../node_modules/@ionic-native/printer';
import { Move } from '../../models/new-move/new-move.model';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-open-move',
  templateUrl: 'open-move.html',
})
export class OpenMovePage {
  private box: Box[]
  private move: Move
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private boxDetails: BoxDetailsProvider,
    private modalCtrl: ModalController,
    private printer: Printer,
    private actionSheetCtrl: ActionSheetController,
    private authService: AuthServiceProvider) {
    this.move = this.navParams.data;
  }

  ngOnInit() {
    if (this, this.authService.getUID() == null) {
      this.navCtrl.setRoot('LoginPage');
    }
    else {
      this.boxDetails.getBoxDetails(this.authService.getUID().uid, this.move.$key).subscribe(data => {
        this.box = data;
      });
    }
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

  openBoxPage(b: Box) {
    this.navCtrl.push('OpenBoxPage', b);
  }

  openActionSheet(b: Box) {
    this.actionSheetCtrl.create({
      title: 'Menu',
      buttons: [
        {
          text: 'Open',
          handler: () => {
            this.openBoxPage(b);
          }
        }
        // , {
        //   text: 'Edit',
        //   handler: () => {
        //     this.navCtrl.push('NewMovePage', m);
        //     console.log(m);
        //   }
        // }
        , {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.boxDetails.removeBox(b.$key);
          }
        }
        , {
          text: 'Cancel',
          role: 'cancel',
        }]
    }).present();
  }

}
