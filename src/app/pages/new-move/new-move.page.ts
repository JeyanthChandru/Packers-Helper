import { Component, OnInit, Input } from '@angular/core';
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

  @Input() uid: string;
  @Input() move: Move;

  public form: FormGroup
  minDate: String = new Date().toISOString();
  maxDate: any = new Date(new Date().setDate(new Date().getFullYear() + 10)).toISOString();

  constructor(
    private modalController: ModalController,
    private moveDetails: MoveService,
    private _FB: FormBuilder) {
    this.form = this._FB.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      date: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {
    if (this.uid == undefined) {
      this.closeModal();
    }

    if (this.move != undefined) {
      this.form.setValue({ name: this.move.name, date: this.move.date })
    }
  }

  addNew(move: Move) {
    if (this.move != undefined) {
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
