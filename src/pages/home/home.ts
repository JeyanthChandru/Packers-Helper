import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { MoveDetailsProvider } from '../../providers/move-details/move-details';
import { Move } from '../../models/new-move/new-move.model';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  move: Move[];
  private openMovePage: string = 'OpenMovePage';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private moveDetails: MoveDetailsProvider) {
  }

  addNewMove(){
    let modal = this.modalCtrl.create('NewMovePage');
    modal.present();
  }

  ngOnInit(){
    this.move = this.moveDetails.getMove();
  }

}
