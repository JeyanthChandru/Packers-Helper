import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { MoveDetailsProvider } from '../../providers/move-details/move-details';
import { Move } from '../../models/new-move/new-move.model';
import { FormGroup, FormBuilder, Validators } from '../../../node_modules/@angular/forms';

@IonicPage()
@Component({
  selector: 'page-new-move',
  templateUrl: 'new-move.html',
})
export class NewMovePage {
  move = {} as Move;
  public form: FormGroup
  constructor(
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private moveDetails: MoveDetailsProvider,
    private _FB: FormBuilder) {
    this.form = this._FB.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      date: ['', Validators.compose([Validators.required])],
    });

    if (this.navParams.get('date') != undefined) {
      this.move = this.navParams.data;
      this.move.date = new Date(this.navParams.get('date')).toISOString().substring(0, 10);
    }
  }

  addNew(move: Move) {
    if (this.navParams.get('date') != undefined) {
      this.moveDetails.updateMove(this.move.$key, move);
      this.viewCtrl.dismiss({ edited: true });
    }
    else {
      this.moveDetails.addMove(move);
      this.closeModal();
    }
  }

  closeModal() {
    this.viewCtrl.dismiss({ edited: false });
  }


}
