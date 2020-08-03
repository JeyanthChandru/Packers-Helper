import { Component, OnInit } from '@angular/core';
import { Box } from 'src/app/models/box-model/box.model';
import { Move } from 'src/app/models/new-move/new-move.model';
import { NavParams, ModalController, ActionSheetController } from '@ionic/angular';
import { BoxService } from 'src/app/service/box.service';
import { AuthService } from 'src/app/service/auth.service';
import { Printer, PrintOptions } from '@ionic-native/printer/ngx';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NewBoxPage } from '../new-box/new-box.page';

@Component({
  selector: 'app-open-move',
  templateUrl: './open-move.page.html',
  styleUrls: ['./open-move.page.scss'],
})
export class OpenMovePage implements OnInit {

  private boxes: Box[];
  private move: Move;
  private uid;
  private email;
  private subscriptions: Subscription[] = [];
  constructor(
    private router: Router,
    private boxDetails: BoxService,
    private modalCtrl: ModalController,
    private printer: Printer,
    private actionSheetCtrl: ActionSheetController,
    private authService: AuthService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscriptions.push(this.route.queryParams.subscribe(async () => {
      if (this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state.uid != undefined) {
        this.uid = this.router.getCurrentNavigation().extras.state.uid;
        this.email = this.router.getCurrentNavigation().extras.state.email;
        this.move = this.router.getCurrentNavigation().extras.state.move;
      }
      if (this.uid == undefined) {
        this.router.navigate(['/login'])
      }
      else {
        this.subscriptions.push(this.boxDetails.getBoxDetails(this.uid, this.move.$key).subscribe(data => {
          this.boxes = data;
        }));
      }
    }));
  }

  async addNewBox() {
    let modal = await this.modalCtrl.create({ component: NewBoxPage });
    modal.present();
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

  openBoxPage(box: Box) {
    this.router.navigate(['open-box'], this.boxDetails.populateBox(box, this.move));
  }

  async openActionSheet(box: Box, i: number) {
    (await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Open',
          handler: () => {
            this.openBoxPage(box);
          }
        },
        {
          text: 'Edit',
          handler: async () => {
            let modal = await this.modalCtrl.create({ component: NewBoxPage, componentProps: { box: box } });
            modal.present();
            const { data } = await modal.onWillDismiss();
            if (data.isEdited) {
              this.boxes[i] = data.box;
            }
            // this.router.navigate(['new-box'], this.boxDetails.populateBox(b));
          }
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.boxDetails.removeBox(box.$key);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
        }
      ]
    })).present();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
