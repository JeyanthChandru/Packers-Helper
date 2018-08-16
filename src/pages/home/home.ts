import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ActionSheetController } from 'ionic-angular';
import { MoveDetailsProvider } from '../../providers/move-details/move-details';
import { Move } from '../../models/new-move/new-move.model';
import { BarcodeScannerOptions, BarcodeScanner } from '../../../node_modules/@ionic-native/barcode-scanner';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  scannedCode = null;
  monthNames: string[] = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun",
    "Jul", "Aug", "Sep",
    "Oct", "Nov", "Dec"
  ];
  move: Move[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private moveDetails: MoveDetailsProvider,
    private barcodeScanner: BarcodeScanner,
    private actionSheetCtrl: ActionSheetController,
    private authService: AuthServiceProvider) {
  }

  addNewMove() {
    let modal = this.modalCtrl.create('NewMovePage');
    modal.present();
  }

  ngOnInit() {
    if (this.authService.getUID() == null) {
      this.navCtrl.setRoot('LoginPage');
    }
    else {
      this.moveDetails.initializeUser(this.authService.getUID().uid);
      this.moveDetails.getMove().subscribe(data => {
        this.move = data
        for (var i = 0; i < this.move.length; i++) {
          var date = this.move[i].date.split('-')
          var day = date[2];
          var monthIndex = Number(date[1]) - 1;
          var year = date[0];
          this.move[i].date = day + ' ' + this.monthNames[monthIndex] + ', ' + year
        }
      });
    }

  }

  logout() {
    this.authService.logoutUser().then(() => {
      this.navCtrl.setRoot('LoginPage');
    })
  }

  scanCode() {
    var options: BarcodeScannerOptions = {
      showFlipCameraButton: true,
      showTorchButton: true,
    }
    this.barcodeScanner.scan(options).then(barcodeData => {
      if (barcodeData.text.indexOf('PackersHelper') >= 0) {
        let json = JSON.parse(barcodeData.text);
        this.navCtrl.push('OpenBoxPage', { name: json.name });
      }
      else {
        this.scannedCode = barcodeData.text;
      }
    }, (err) => {
      console.log('Error: ', err);
    });
  }

  openMovePage(m: Move) {
    this.navCtrl.push('OpenMovePage', m);
  }

  removeItem(key) {
    this.moveDetails.removeMove(key);
  }

  openActionSheet(m: Move) {
    this.actionSheetCtrl.create({
      title: 'Menu',
      buttons: [
        {
          text: 'Open',
          handler: () => {
            this.openMovePage(m);
          }
        }
        , {
          text: 'Edit',
          handler: () => {
            this.navCtrl.push('NewMovePage', m);
          }
        }
        , {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.removeItem(m.$key);
          }
        }
        , {
          text: 'Cancel',
          role: 'cancel',
        }]
    }).present();
  }

}
