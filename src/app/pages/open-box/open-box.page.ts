import { Component, OnInit } from '@angular/core';
import { Box } from 'src/app/models/box-model/box.model';
import { NavController, NavParams } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { Printer, PrintOptions } from '@ionic-native/printer/ngx';

@Component({
  selector: 'app-open-box',
  templateUrl: './open-box.page.html',
  styleUrls: ['./open-box.page.scss'],
})
export class OpenBoxPage implements OnInit {

  private box: Box;
  constructor(
    public navParams: NavParams, 
    private printer: Printer,
    private router: Router) {
    this.box = this.navParams.data;
  }

  editBox(box: Box) {
    let navigationExtras: NavigationExtras = {
      state: {
        box: this.box
      }
    }
    this.router.navigate(['NewBoxPage'], navigationExtras);
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

  ngOnInit() {
  }

}
