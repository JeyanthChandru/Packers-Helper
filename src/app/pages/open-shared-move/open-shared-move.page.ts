import { Component, OnInit } from '@angular/core';
import { Box } from 'src/app/models/box-model/box.model';
import { SharedMove } from 'src/app/models/new-shared-move/new-shared-move.model';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { Printer, PrintOptions } from '@ionic-native/printer/ngx';
import { Router, ActivatedRoute } from '@angular/router';
import { BoxService } from 'src/app/service/box.service';
import { Subscription } from 'rxjs';
import { NewBoxPage } from '../new-box/new-box.page';

@Component({
  selector: 'app-open-shared-move',
  templateUrl: './open-shared-move.page.html',
  styleUrls: ['./open-shared-move.page.scss'],
})
export class OpenSharedMovePage implements OnInit {

  private boxes: Box[] = [];
  private sharedMove: SharedMove;
  private sharedKey: string;
  private uid: string = undefined;
  private email: string = undefined;
  private subscriptions: Subscription[] = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private boxDetails: BoxService,
    private modalCtrl: ModalController,
    private printer: Printer,
    private actionSheetCtrl: ActionSheetController) { }

  ngOnInit() {
    this.subscriptions.push(this.route.queryParams.subscribe(async () => {
      if (this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state.uid != undefined) {
        this.uid = this.router.getCurrentNavigation().extras.state.uid;
        this.email = this.router.getCurrentNavigation().extras.state.email;
        this.sharedMove = this.router.getCurrentNavigation().extras.state.sharedMove;
        this.sharedKey = this.router.getCurrentNavigation().extras.state.sharedKey;
      }
      if (this.uid == undefined) {
        this.router.navigate(['/login'])
      }
      else {
        this.subscriptions.push(this.boxDetails.getSharedBoxDetails(this.sharedKey, this.sharedMove.$key).subscribe(data => {
          this.boxes = data;
        }));
      }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }

  async addNewBox() {
    let modal = await this.modalCtrl.create({ component: NewBoxPage, componentProps: { isSharedBox: true } });
    await modal.present();
  }

  printContent() {
    var page = document.getElementById('allBox');
    this.printer.isAvailable().then(() => {
      let options: PrintOptions = {
        name: 'MyDocument',
        duplex: true,
        orientation: 'landscape',
        monochrome: true
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
    this.router.navigate(['/open-box'], this.boxDetails.populateSharedBox(b, this.sharedMove));
  }

  async openActionSheet(b: Box) {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Open',
          handler: () => {
            this.openBoxPage(b);
          }
        }
        , {
          text: 'Edit',
          handler: async () => {
            let modal = await this.modalCtrl.create({ component: NewBoxPage, componentProps: { sharedBox: b, isSharedBox: true } });
            await modal.present();
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
    });

    await actionSheet.present();

  }
}
