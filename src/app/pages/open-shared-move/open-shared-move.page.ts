import { Component, OnInit } from '@angular/core';
import { Box } from 'src/app/models/box-model/box.model';
import { SharedMove } from 'src/app/models/shared-move/shared-move.model';
import { NavController, NavParams, ModalController, ActionSheetController } from '@ionic/angular';
import { Printer, PrintOptions } from '@ionic-native/printer/ngx';
import { BoxDetailsService } from 'src/app/service/box-details.service';
import { AuthService } from 'src/app/service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NewBoxPage } from '../new-box/new-box.page';

@Component({
  selector: 'app-open-shared-move',
  templateUrl: './open-shared-move.page.html',
  styleUrls: ['./open-shared-move.page.scss'],
})
export class OpenSharedMovePage implements OnInit {

  private box: Box[] = [];
  private sharedMove: SharedMove;
  private sharedKey: string;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private boxDetails: BoxDetailsService,
    private modalCtrl: ModalController,
    private printer: Printer,
    private actionSheetCtrl: ActionSheetController,
    private authService: AuthService) {
      this.route.queryParams.subscribe(() => {
        if(this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state.sharedMove) {
          this.sharedMove = this.router.getCurrentNavigation().extras.state.sharedMove;
          this.sharedKey = this.router.getCurrentNavigation().extras.state.sharedKey;
        }
      });
  }

  ngOnInit() {
    if (this, this.authService.getUID() == null) {
      this.router.navigate(['login']);
    }
    else {
      this.boxDetails.getSharedBoxDetails(this.sharedKey, this.sharedMove.$key).subscribe(data => {
        this.box = data;
      });
    }
  }

  async addNewBox() {
    let modal = await this.modalCtrl.create({
      component: NewBoxPage,
      componentProps: {
        isSharedBox: true
      }
    });
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

  openBoxPage(b: Box) {
    this.router.navigate(['open-box'], this.boxDetails.populateBox(b))
  }

  async openActionSheet(b: Box) {
    (await this.actionSheetCtrl.create({
      header: 'Menu',
      buttons: [
        {
          text: 'Open',
          handler: () => {
            this.openBoxPage(b);
          }
        },
        {
          text: 'Edit',
          handler: () => {
            this.router.navigate(['new-box'], this.boxDetails.populateSharedBox(b));
          }
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.boxDetails.removeBox(b.$key);
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
