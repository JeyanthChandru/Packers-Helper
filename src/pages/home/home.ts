import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, ActionSheetController, AlertController } from 'ionic-angular';
import { MoveDetailsProvider } from '../../providers/move-details/move-details';
import { Move } from '../../models/new-move/new-move.model';
import { BarcodeScannerOptions, BarcodeScanner } from '../../../node_modules/@ionic-native/barcode-scanner';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { SharedMoveDetailsProvider } from '../../providers/shared-move-details/shared-move-details';
import { SharedMove } from '../../models/new-shared-move/new-shared-move.model';
import { concatAll, mergeMap, map } from '../../../node_modules/rxjs/operators';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  scannedCode = null;
  sharedMove: SharedMove[] = [];
  sharedKeys: string[] = [];
  private edited: boolean = false;
  private index: number;
  monthNames: string[] = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun",
    "Jul", "Aug", "Sep",
    "Oct", "Nov", "Dec"
  ];
  move: Move[];
  constructor(
    public navCtrl: NavController,
    private modalCtrl: ModalController,
    private moveDetails: MoveDetailsProvider,
    private barcodeScanner: BarcodeScanner,
    private actionSheetCtrl: ActionSheetController,
    private authService: AuthServiceProvider,
    private alertCtrl: AlertController,
    private sharedMoveDetails: SharedMoveDetailsProvider) {
  }

  addNewMove() {
    let alert = this.alertCtrl.create({
      title: 'Add a New Move',
      message: 'Create a move for yourself, or share it with your friends and families',
      inputs: [{
        type: 'radio',
        label: 'Individual Move',
        value: 'individual_move'
      },
      {
        type: 'radio',
        label: 'Shared Move',
        value: 'shared_move'
      }],
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'Confirm',
        handler: (data) => {
          if (data == 'individual_move') {
            let modal = this.modalCtrl.create('NewMovePage');
            modal.present();
          }
          else {
            let modal = this.modalCtrl.create('NewSharedMovePage');
            modal.present();
          }
        }
      }]
    });
    alert.present();
  }

  ngOnInit() {
    if (this.authService.getUID() == null) {
      this.navCtrl.setRoot('LoginPage');
    }
    else {
      this.moveDetails.getMoveDetails(this.authService.getUID().uid).pipe(
        map(moves =>
          moves.map(
            move => {
              move.date = this.editDate(move.date);
              return move
            }
          )
        )
      ).subscribe(data => {
        this.move = data;
      });

      this.sharedMoveDetails.getAllSharedKeys().pipe(
        map(res => this.sharedKeys = res),
        concatAll(),
        mergeMap(item => this.sharedMoveDetails.getSharedMoveDetails(item).pipe(
          concatAll(),
          map(sm => {
            sm.date = this.editDate(sm.date);
            return sm
          })
        ))
      ).subscribe(data => {
        if (data != undefined) {
          if (this.sharedMove.findIndex((sm) => sm.$key === data.$key) == -1) {
            this.sharedMove.push(data);
          }
          else {
            // var index = this.sharedMove.findIndex((sm) => { return sm.$key === data.$key });
            this.sharedMove[this.index] = data;
          }
        }
      });
    }
  }

  editDate(date) {
    if (date.indexOf('-') != -1) {
      date = date.split('-');
      return (date[2] + ' ' + this.monthNames[Number(date[1]) - 1] + ', ' + date[0]);
    }
    else
      return date
  }

  logout() {
    this.authService.logoutUser();
    this.navCtrl.setRoot('LoginPage');
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

  openSharedMovePage(sm: SharedMove, i) {
    this.navCtrl.push('OpenSharedMovePage', { sharedMove: sm, sharedKey: this.sharedKeys[i] })
  }

  removeItem(key) {
    this.moveDetails.removeMove(key);
  }

  removeSharedItem(sm: SharedMove, i: number) {
    this.sharedMove = this.sharedMove.filter(shared => shared.$key != sm.$key);
    this.sharedMoveDetails.removeMove(sm, this.sharedKeys[i]);
  }

  openActionSheet(m: Move, i) {
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
            let modal = this.modalCtrl.create('NewMovePage', m);
            modal.onWillDismiss(data => {
              this.edited = data.edited;
              this.index = i;
              if (this.edited) {
                this.move[i].date = this.editDate(this.move[i].date);
              }
            });
            modal.present();
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

  openSharedActionSheet(sm: SharedMove, i) {
    var isAdmin: boolean = sm.admin == btoa(this.authService.getEmail());
    if (isAdmin) {
      this.actionSheetCtrl.create({
        title: 'Menu',
        buttons: [
          {
            text: 'Open',
            handler: () => {
              this.openSharedMovePage(sm, i);
            }
          }
          , {
            text: 'Edit',
            handler: () => {
              let modal = this.modalCtrl.create('NewSharedMovePage', { sharedMove: sm, isAdmin: isAdmin, sharedKey: this.sharedKeys[i] });
              modal.onWillDismiss(data => {
                this.edited = data.edited;
                this.index = i;
                if (this.edited) {
                  this.sharedMove[i].date = this.editDate(this.sharedMove[i].date)
                }
              })
              modal.present();
            }
          }
          , {
            text: 'Delete',
            role: 'destructive',
            handler: () => {
              this.removeSharedItem(sm, i);
            }
          }
          , {
            text: 'Cancel',
            role: 'cancel',
          }]
      }).present();
    }
    else {
      this.actionSheetCtrl.create({
        title: 'Menu',
        buttons: [
          {
            text: 'Open',
            handler: () => {
              this.openSharedMovePage(sm, i);
            }
          }
          , {
            text: 'Edit',
            handler: () => {
              let modal = this.modalCtrl.create('NewSharedMovePage', { sharedMove: sm, isAdmin: isAdmin, sharedKey: this.sharedKeys[i] });
              modal.onWillDismiss(data => {
                this.edited = data.edited;
                this.index = i;
                if (this.edited) {
                  this.sharedMove[i].date = this.editDate(this.sharedMove[i].date)
                }
              })
              modal.present();
            }
          }
          , {
            text: 'Cancel',
            role: 'cancel',
          }]
      }).present();
    }
  }

}
