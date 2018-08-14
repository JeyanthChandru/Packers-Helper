import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { MoveDetailsProvider } from '../../providers/move-details/move-details';
import { Move } from '../../models/new-move/new-move.model';
import { BarcodeScannerOptions, BarcodeScanner } from '../../../node_modules/@ionic-native/barcode-scanner';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  scannedCode = null;

  move: Move[];
  private openMovePage: string = 'OpenMovePage';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private moveDetails: MoveDetailsProvider,
    private barcodeScanner: BarcodeScanner) {
  }

  addNewMove() {
    let modal = this.modalCtrl.create('NewMovePage');
    modal.present();
  }

  ngOnInit() {
    this.move = this.moveDetails.getMove();
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

}
