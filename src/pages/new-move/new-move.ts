import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-new-move',
  templateUrl: 'new-move.html',
})
export class NewMovePage {
  private moveDate: string = new Date().toISOString();
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private view: ViewController) {
  }

  addNew(){
    this.closeModal();
  }

  closeModal(){
    this.view.dismiss();
  }

}
