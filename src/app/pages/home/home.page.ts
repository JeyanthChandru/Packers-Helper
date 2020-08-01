import { Component, OnInit } from '@angular/core';
import { SharedMove } from 'src/app/models/new-shared-move/new-shared-move.model';
import { Move } from 'src/app/models/new-move/new-move.model';
import { NavController, ModalController, ActionSheetController, AlertController } from '@ionic/angular';
import { map, concatAll, mergeMap } from 'rxjs/operators';
import { MoveService } from 'src/app/service/move.service';
import { AuthService } from 'src/app/service/auth.service';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { SharedMoveService } from 'src/app/service/shared-move.service';
import { NewMovePage } from '../new-move/new-move.page';
import { NewSharedMovePage } from '../new-shared-move/new-shared-move.page';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

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
    private modalCtrl: ModalController,
    private moveDetails: MoveService,
    private barcodeScanner: BarcodeScanner,
    private actionSheetCtrl: ActionSheetController,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private sharedMoveDetails: SharedMoveService,
    private router: Router) {
  }

  async addNewMove() {
    let alert = await this.alertCtrl.create({
      header: 'Add a New Move',
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
        handler: async (data) => {
          if (data == 'individual_move') {
            let modal = await this.modalCtrl.create({ component: NewMovePage });
            modal.present();
          }
          else {
            let modal = await this.modalCtrl.create({ component: NewSharedMovePage });
            modal.present();
          }
        }
      }]
    });
    alert.present();
  }

  async ngOnInit() {
    if (this.authService.getUID() == null) {
      this.router.navigate(['login'])
    }
    else {
      this.moveDetails.getMoveDetails((await this.authService.getUID()).uid).pipe(
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

      (await this.sharedMoveDetails.getAllSharedKeys()).pipe(
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
    this.router.navigate(['login']);
  }

  scanCode() {
    var options: BarcodeScannerOptions = {
      showFlipCameraButton: true,
      showTorchButton: true,
    }
    this.barcodeScanner.scan(options).then(barcodeData => {
      if (barcodeData.text.indexOf('PackersHelper') >= 0) {
        let json = JSON.parse(barcodeData.text);
        let navigationExtras: NavigationExtras = {
          state: {
            name: json.name
          }
        }
        this.router.navigate(['open-box'], navigationExtras);
      }
      else {
        this.scannedCode = barcodeData.text;
      }
    }, (err) => {
      console.log('Error: ', err);
    });
  }

  openMovePage(m: Move) {
    this.router.navigate(['open-move'], this.moveDetails.populateMove(m));
  }

  openSharedMovePage(sm: SharedMove, i) {
    this.router.navigate(['open-shared-move'], this.sharedMoveDetails.populateSharedMove(sm, this.sharedKeys[i]));
  }

  removeItem(key) {
    this.moveDetails.removeMove(key);
  }

  removeSharedItem(sm: SharedMove, i: number) {
    this.sharedMove = this.sharedMove.filter(shared => shared.$key != sm.$key);
    this.sharedMoveDetails.removeMove(sm, this.sharedKeys[i]);
  }

  async openActionSheet(m: Move, i) {
    (await this.actionSheetCtrl.create({
      header: 'Menu',
      buttons: [
        {
          text: 'Open',
          handler: () => {
            this.openMovePage(m);
          }
        },
        {
          text: 'Edit',
          handler: async () => {
            let modal = await this.modalCtrl.create({ component: NewMovePage, componentProps: { move: m } });
            const { data } = await modal.onWillDismiss();

            this.edited = data.edited;
            this.index = i;
            if (this.edited) {
              this.move[i].date = this.editDate(this.move[i].date);
            }

            modal.present();
          }
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.removeItem(m.$key);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
        }
      ]
    })).present();
  }

  async openSharedActionSheet(sm: SharedMove, i) {
    var isAdmin: boolean = sm.admin == btoa(await this.authService.getEmail());
    if (isAdmin) {
      (await this.actionSheetCtrl.create({
        header: 'Menu',
        buttons: [
          {
            text: 'Open',
            handler: () => {
              this.openSharedMovePage(sm, i);
            }
          },
          {
            text: 'Edit',
            handler: async () => {
              let modal = await this.modalCtrl.create({ component: NewSharedMovePage, componentProps: { sharedMove: sm, isAdmin: isAdmin, sharedKey: this.sharedKeys[i] } });
              const { data } = await modal.onWillDismiss();
              this.edited = data.edited;
              this.index = i;
              if (this.edited) {
                this.sharedMove[i].date = this.editDate(this.sharedMove[i].date);
              }

              modal.present();
            }
          },
          {
            text: 'Delete',
            role: 'destructive',
            handler: () => {
              this.removeSharedItem(sm, i);
            }
          },
          {
            text: 'Cancel',
            role: 'cancel',
          }
        ]
      })).present();
    }
    else {
      (await this.actionSheetCtrl.create({
        header: 'Menu',
        buttons: [
          {
            text: 'Open',
            handler: () => {
              this.openSharedMovePage(sm, i);
            }
          },
          {
            text: 'Edit',
            handler: async () => {
              let modal = await this.modalCtrl.create({ component: NewSharedMovePage, componentProps: { sharedMove: sm, isAdmin: isAdmin, sharedKey: this.sharedKeys[i] } });
              const { data } = await modal.onWillDismiss();
              this.edited = data.edited;
              this.index = i;
              if (this.edited) {
                this.sharedMove[i].date = this.editDate(this.sharedMove[i].date);
              }

              modal.present();
            }
          },
          {
            text: 'Cancel',
            role: 'cancel',
          }
        ]
      })).present();
    }
  }

}
