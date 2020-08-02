import { Component, OnInit } from '@angular/core';
import { Move } from 'src/app/models/new-move/new-move.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavParams, ModalController } from '@ionic/angular';
import { MoveService } from 'src/app/service/move.service';

@Component({
  selector: 'app-new-move',
  templateUrl: './new-move.page.html',
  styleUrls: ['./new-move.page.scss'],
})
export class NewMovePage implements OnInit {

  move = {} as Move;
  uid = undefined;
  public form: FormGroup
  minDate: String = new Date().toISOString();
  maxDate: any = new Date(new Date().setDate(new Date().getFullYear() + 10)).toISOString();

  constructor(
    public navParams: NavParams,
    private modalController: ModalController,
    private moveDetails: MoveService,
    private _FB: FormBuilder) {
    this.form = this._FB.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      date: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {

    if (this.navParams.get('uid') != undefined) {
      this.uid = this.navParams.get('uid');
    }

    if (this.navParams.data.move != undefined) {
      this.move = this.navParams.data.move;
      this.form.setValue({ name: this.move.name, date: this.move.date })
      // this.move.date = new Date(this.move.date).toISOString().substring(0, 10);
    }
  }

  addNew() {
    let move = this.form.value;
    if (this.navParams.data.move != undefined) {
      this.moveDetails.updateMove(this.move.$key, move);
      this.modalController.dismiss({ edited: true });
    }
    else {
      this.moveDetails.addMove(move, this.uid);
      this.closeModal();
    }
  }

  closeModal() {
    this.modalController.dismiss({ edited: false });
  }

}
