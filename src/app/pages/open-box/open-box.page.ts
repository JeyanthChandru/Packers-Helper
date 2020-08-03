import { Component, OnInit } from '@angular/core';
import { Box } from 'src/app/models/box-model/box.model';
import { NavParams, ModalController } from '@ionic/angular';
import { Printer, PrintOptions } from '@ionic-native/printer/ngx';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BoxService } from 'src/app/service/box.service';
import { NewBoxPage } from '../new-box/new-box.page';
import { Move } from 'src/app/models/new-move/new-move.model';

@Component({
  selector: 'app-open-box',
  templateUrl: './open-box.page.html',
  styleUrls: ['./open-box.page.scss'],
})
export class OpenBoxPage implements OnInit {

  private box: Box;
  private move: Move;
  private subscriptions: Subscription[] = [];
  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private modalController: ModalController,
    private printer: Printer,
    private boxService: BoxService) {
  }
  ngOnInit() {
    this.subscriptions.push(this.route.queryParams.subscribe(() => {
      console.log(this.router.getCurrentNavigation().extras.state);
      if (this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state.box != undefined) {
        this.box = this.router.getCurrentNavigation().extras.state.box;
        this.move = this.router.getCurrentNavigation().extras.state.move;
      } else {
        this.router.navigate(['login']);
      }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  async editBox(box: Box) {
    let modal = await this.modalController.create({
      component: NewBoxPage, componentProps: {
        box: box
      }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data.isEdited) {
      this.box = data.box;
      // console.log(data.box);
    }
    // this.router.navigate(['/new-box'], this.boxService.populateBox(box));
  }

  printQR() {
    var page = document.getElementById('oneBox');
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
}
