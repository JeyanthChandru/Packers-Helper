import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { BoxDetailsProvider } from '../../providers/box-details/box-details';
import { Box } from '../../models/box-model/box.model';

@IonicPage()
@Component({
  selector: 'page-open-move',
  templateUrl: 'open-move.html',
})
export class OpenMovePage {
  private box: Box[]
  private moveName: string;
  private moveDate: string;
  private openBoxPage: string = 'OpenBoxPage';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private boxDetails: BoxDetailsProvider,
    private modalCtrl: ModalController) {
    this.moveName = navParams.get('name');
    this.moveDate = navParams.get('date');
  }

  ngOnInit() {
    this.box = this.boxDetails.getBoxDetails();
  }

  addNewBox() {
    let modal = this.modalCtrl.create('NewBoxPage');
    modal.present();
  }

}
