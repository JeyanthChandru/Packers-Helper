import { Component, OnInit } from '@angular/core';
import { Box } from 'src/app/models/box-model/box.model';
import { Move } from 'src/app/models/move/move.model';
import { NavController, NavParams, ModalController, ActionSheetController } from '@ionic/angular';
import { Printer, PrintOptions } from '@ionic-native/printer/ngx';
import { BoxDetailsService } from 'src/app/service/box-details.service';
import { AuthService } from 'src/app/service/auth.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { NewBoxPage } from '../new-box/new-box.page';

@Component({
  selector: 'app-open-move',
  templateUrl: './open-move.page.html',
  styleUrls: ['./open-move.page.scss'],
})
export class OpenMovePage implements OnInit {

  private box: Box[]
  private move: Move
  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private boxDetails: BoxDetailsService,
    private modalCtrl: ModalController,
    private printer: Printer,
    private actionSheetCtrl: ActionSheetController,
    private authService: AuthService) {
      this.route.queryParams.subscribe(() => {
        if(this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state.data) {
          this.move = this.router.getCurrentNavigation().extras.state.data;
        }
      });
  }

  async ngOnInit() {
    if (this, this.authService.getUID() == null) {
      this.router.navigate(['login']);
    }
    else {
      this.boxDetails.getBoxDetails((await this.authService.getUID()).uid, this.move.$key).subscribe(data => {
        this.box = data;
      });
    }
  }

  async addNewBox() {
    let modal = await this.modalCtrl.create({
      component: NewBoxPage
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
    this.router.navigate(['open-box'], this.boxDetails.populateBox(b));
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
            this.router.navigate(['new-box'], this.boxDetails.populateBox(b))
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
