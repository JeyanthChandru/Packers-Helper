import { Component, OnInit } from '@angular/core';
import { Move } from 'src/app/models/move/move.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavParams, ModalController } from '@ionic/angular';
import { MoveDetailsService } from 'src/app/service/move-details.service';

@Component({
  selector: 'app-new-move',
  templateUrl: './new-move.page.html',
  styleUrls: ['./new-move.page.scss'],
})
export class NewMovePage implements OnInit {
  propMove;
  move = {} as Move;
  public form: FormGroup
  constructor(
    public navParams: NavParams,
    private modalController: ModalController,
    private moveDetails: MoveDetailsService,
    private _FB: FormBuilder) {
    this.form = this._FB.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      date: ['', Validators.compose([Validators.required])],
    });

    if (this.navParams.get('date') != undefined) {
      this.move = this.propMove;
      this.move.date = new Date(this.navParams.get('date')).toISOString().substring(0, 10);
    }
  }
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }

  addNew(move: Move) {
    if (this.navParams.get('date') != undefined) {
      this.moveDetails.updateMove(this.move.$key, move);
      this.modalController.dismiss({ edited: true });
    }
    else {
      this.moveDetails.addMove(move);
      this.closeModal();
    }
  }

  closeModal() {
    this.modalController.dismiss({ edited: false });
  }


}
