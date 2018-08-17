import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ActionSheetController } from 'ionic-angular';
import { BoxDetailsProvider } from '../../providers/box-details/box-details';
import { Box } from '../../models/box-model/box.model';
import { Printer, PrintOptions } from '../../../node_modules/@ionic-native/printer';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { SharedMove } from '../../models/new-shared-move/new-shared-move.model';

@IonicPage()
@Component({
  selector: 'page-open-shared-move',
  templateUrl: 'open-shared-move.html',
})
export class OpenSharedMovePage {
  private box: Box[] = [];
  private sharedMove: SharedMove;
  private sharedKey: string;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private boxDetails: BoxDetailsProvider,
    private modalCtrl: ModalController,
    private printer: Printer,
    private actionSheetCtrl: ActionSheetController,
    private authService: AuthServiceProvider) {
    this.sharedMove = this.navParams.get('sharedMove');
    this.sharedKey = this.navParams.get('sharedKey');
  }

  ngOnInit() {
    if (this, this.authService.getUID() == null) {
      this.navCtrl.setRoot('LoginPage');
    }
    else {
      this.boxDetails.getSharedBoxDetails(this.sharedKey, this.sharedMove.$key).subscribe(data => {
        this.box = data;
      });
    }
  }

  addNewBox() {
    let modal = this.modalCtrl.create('NewBoxPage', { isSharedBox: true });
    modal.present();
  }

  printContent() {
    var page = document.getElementById('allBox');
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
        , {
          text: 'Edit',
          handler: () => {
            this.navCtrl.push('NewBoxPage', { sharedBox: b });
          }
        }
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
